import { google } from "googleapis";
import Fitness from "../models/fitness.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// Google OAuth2 client configuration
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID?.trim(),
  process.env.GOOGLE_CLIENT_SECRET?.trim(),
  process.env.GOOGLE_REDIRECT_URI?.trim()
);

// Scopes required for Google Fit API
const SCOPES = [
  "https://www.googleapis.com/auth/fitness.activity.read",
  "https://www.googleapis.com/auth/fitness.heart_rate.read",
  "https://www.googleapis.com/auth/fitness.sleep.read",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

// ─── Initiate Google OAuth ───────────────────────────────────────────────────────
const initiateGoogleAuth = asyncHandler(async (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
  const redirectUri = process.env.GOOGLE_REDIRECT_URI?.trim();
  
  if (!clientId || !clientSecret || !redirectUri) {
    throw new ApiError(500, "Google OAuth configuration incomplete");
  }

  // Create a fresh OAuth2 client to ensure redirect_uri is set
  const oauth2ClientInstance = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
  );

  const authUrl = oauth2ClientInstance.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent", // Force consent to get refresh token
    redirect_uri: redirectUri, // Explicitly set redirect_uri
  });

  res.redirect(authUrl);
});

// ─── Handle Google OAuth Callback ───────────────────────────────────────────────
const handleGoogleCallback = asyncHandler(async (req, res) => {
  const { code } = req.query;

  if (!code) {
    throw new ApiError(400, "Authorization code not provided");
  }

  const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
  const redirectUri = process.env.GOOGLE_REDIRECT_URI?.trim();

  if (!clientId || !clientSecret || !redirectUri) {
    throw new ApiError(500, "Google OAuth configuration incomplete");
  }

  // Create a fresh OAuth2 client with the same config as initiateGoogleAuth
  const callbackClient = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
  );

  // Exchange code for tokens
  let tokens;
  try {
    const tokenResponse = await callbackClient.getToken(code);
    tokens = tokenResponse.tokens;
    callbackClient.setCredentials(tokens);
  } catch (error) {
    console.error("Google OAuth token exchange error:", error.message);
    throw new ApiError(400, `Failed to exchange authorization code: ${error.message || "invalid_request"}`);
  }

  // Get user info from Google
  const oauth2 = google.oauth2({ version: "v2", auth: callbackClient });
  const { data: userInfo } = await oauth2.userinfo.get();

  // Use Google ID as userId for session-based authentication
  // This allows fitness dashboard to work independently of main app login
  const sessionUserId = userInfo.id;

  // Calculate token expiry (usually expires_in is in seconds)
  const tokenExpiry = tokens.expiry_date
    ? new Date(tokens.expiry_date)
    : new Date(Date.now() + (tokens.expires_in || 3600) * 1000);

  const updateDoc = {
    userId: sessionUserId,
    googleId: userInfo.id,
    accessToken: tokens.access_token,
    tokenExpiry,
  };
  if (tokens.refresh_token) {
    updateDoc.refreshToken = tokens.refresh_token;
  }

  // Store or update fitness credentials
  await Fitness.findOneAndUpdate(
    { userId: sessionUserId },
    { $set: updateDoc },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  // Set session
  req.session.userId = sessionUserId;
  req.session.googleAuthenticated = true;

  // Redirect to frontend fitness dashboard
  res.redirect("http://localhost:5173/fitness-dashboard");
});

// ─── Get Fitness Data from Google Fit ───────────────────────────────────────────
const getFitnessData = asyncHandler(async (req, res) => {
  // Check if user has Google authentication via session
  const sessionUserId = req.session?.userId;

  if (!sessionUserId) {
    throw new ApiError(401, "Not authenticated with Google Fit");
  }

  // Get fitness credentials from database
  const fitnessCreds = await Fitness.findOne({ userId: sessionUserId });

  if (!fitnessCreds) {
    throw new ApiError(401, "Google Fit account not connected");
  }

  const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
  const redirectUri = process.env.GOOGLE_REDIRECT_URI?.trim();
  if (!clientId || !clientSecret || !redirectUri) {
    throw new ApiError(500, "Google OAuth configuration incomplete");
  }

  // Use a fresh client per request
  const authClient = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

  // Check if token needs refresh
  let accessToken = fitnessCreds.accessToken;
  const isExpired = fitnessCreds.tokenExpiry ? new Date() >= fitnessCreds.tokenExpiry : true;
  if (isExpired) {
    if (!fitnessCreds.refreshToken) {
      throw new ApiError(401, "Google Fit session expired. Please reconnect.");
    }
    const { credentials } = await authClient.refreshToken(fitnessCreds.refreshToken);
    accessToken = credentials.access_token;

    fitnessCreds.accessToken = credentials.access_token;
    if (credentials.refresh_token) {
      fitnessCreds.refreshToken = credentials.refresh_token;
    }
    fitnessCreds.tokenExpiry = credentials.expiry_date
      ? new Date(credentials.expiry_date)
      : new Date(Date.now() + 3600 * 1000);
    await fitnessCreds.save();
  }

  // Set up Google Fit API client
  authClient.setCredentials({
    access_token: accessToken,
    refresh_token: fitnessCreds.refreshToken || undefined,
  });
  const fitness = google.fitness({ version: "v1", auth: authClient });

  // Get current time and 24 hours ago
  const now = Date.now();
  const oneDayAgo = now - 24 * 60 * 60 * 1000;
  const nowNanos = now * 1000000;
  const oneDayAgoNanos = oneDayAgo * 1000000;

  // Fetch data sources
  const dataSourcesResponse = await fitness.users.dataSources.list({
    userId: "me",
  });

  const dataSources = dataSourcesResponse.data.dataSource || [];

  const stepsDataSource = dataSources.find(
    (ds) =>
      ds.dataType?.name === "com.google.step_count.delta" &&
      ds.type === "derived"
  );

  const caloriesDataSource = dataSources.find(
    (ds) =>
      ds.dataType?.name === "com.google.calories.expended" &&
      ds.type === "derived"
  );

  const heartRateDataSource = dataSources.find(
    (ds) =>
      ds.dataType?.name === "com.google.heart_rate.bpm" &&
      ds.type === "derived"
  );

  const sleepDataSource = dataSources.find(
    (ds) =>
      ds.dataType?.name === "com.google.sleep.segment" &&
      ds.type === "derived"
  );

  // Fetch aggregated data
  const [stepsData, caloriesData, heartRateData, sleepData] = await Promise.all([
    stepsDataSource
      ? fitness.users.dataset
          .aggregate({
            userId: "me",
            requestBody: {
              aggregateBy: [
                {
                  dataTypeName: "com.google.step_count.delta",
                },
              ],
              bucketByTime: { durationMillis: 86400000 }, // 24 hours
              startTimeMillis: oneDayAgo,
              endTimeMillis: now,
            },
          })
          .catch(() => ({ data: { bucket: [] } }))
      : Promise.resolve({ data: { bucket: [] } }),
    caloriesDataSource
      ? fitness.users.dataset
          .aggregate({
            userId: "me",
            requestBody: {
              aggregateBy: [
                {
                  dataTypeName: "com.google.calories.expended",
                },
              ],
              bucketByTime: { durationMillis: 86400000 },
              startTimeMillis: oneDayAgo,
              endTimeMillis: now,
            },
          })
          .catch(() => ({ data: { bucket: [] } }))
      : Promise.resolve({ data: { bucket: [] } }),
    heartRateDataSource
      ? fitness.users.dataset
          .aggregate({
            userId: "me",
            requestBody: {
              aggregateBy: [
                {
                  dataTypeName: "com.google.heart_rate.bpm",
                },
              ],
              bucketByTime: { durationMillis: 86400000 },
              startTimeMillis: oneDayAgo,
              endTimeMillis: now,
            },
          })
          .catch(() => ({ data: { bucket: [] } }))
      : Promise.resolve({ data: { bucket: [] } }),
    sleepDataSource
      ? fitness.users.dataset
          .aggregate({
            userId: "me",
            requestBody: {
              aggregateBy: [
                {
                  dataTypeName: "com.google.sleep.segment",
                },
              ],
              bucketByTime: { durationMillis: 86400000 },
              startTimeMillis: oneDayAgo,
              endTimeMillis: now,
            },
          })
          .catch(() => ({ data: { bucket: [] } }))
      : Promise.resolve({ data: { bucket: [] } }),
  ]);

  // Extract values from aggregated data
  let steps = 0;
  let calories = 0;
  let heartRate = null;
  let sleepHours = 0;

  // Process steps
  if (stepsData.data.bucket && stepsData.data.bucket.length > 0) {
    const bucket = stepsData.data.bucket[0];
    if (bucket.dataset && bucket.dataset[0]?.point) {
      steps = bucket.dataset[0].point.reduce((sum, point) => {
        return (
          sum +
          (point.value?.[0]?.intVal || point.value?.[0]?.fpVal || 0)
        );
      }, 0);
    }
  }

  // Process calories
  if (caloriesData.data.bucket && caloriesData.data.bucket.length > 0) {
    const bucket = caloriesData.data.bucket[0];
    if (bucket.dataset && bucket.dataset[0]?.point) {
      calories = bucket.dataset[0].point.reduce((sum, point) => {
        return (
          sum +
          (point.value?.[0]?.fpVal || point.value?.[0]?.intVal || 0)
        );
      }, 0);
      calories = Math.round(calories);
    }
  }

  // Process heart rate (average)
  if (heartRateData.data.bucket && heartRateData.data.bucket.length > 0) {
    const bucket = heartRateData.data.bucket[0];
    if (bucket.dataset && bucket.dataset[0]?.point) {
      const rates = bucket.dataset[0].point
        .map((point) => point.value?.[0]?.fpVal || point.value?.[0]?.intVal)
        .filter((val) => val != null);
      if (rates.length > 0) {
        heartRate = Math.round(
          rates.reduce((sum, val) => sum + val, 0) / rates.length
        );
      }
    }
  }

  // Process sleep (total hours)
  if (sleepData.data.bucket && sleepData.data.bucket.length > 0) {
    const bucket = sleepData.data.bucket[0];
    if (bucket.dataset && bucket.dataset[0]?.point) {
      sleepHours = bucket.dataset[0].point.reduce((sum, point) => {
        const startTime = point.startTimeNanos / 1000000;
        const endTime = point.endTimeNanos / 1000000;
        return sum + (endTime - startTime) / (1000 * 60 * 60); // Convert to hours
      }, 0);
      sleepHours = Math.round(sleepHours * 10) / 10; // Round to 1 decimal
    }
  }

  // Return fitness data
  res.json({
    steps: steps || 0,
    calories: calories || 0,
    heartRate: heartRate,
    sleepHours: sleepHours || 0,
  });
});

export { initiateGoogleAuth, handleGoogleCallback, getFitnessData };
