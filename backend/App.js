import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie", "Authorization"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

// Session middleware for Google OAuth
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fit_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// ─── Routes ───────────────────────────────────────────────────────────────────
import userRouter from "./routes/user.route.js";
import doctorRouter from "./routes/doctor.route.js";
import appointmentRouter from "./routes/appointment.route.js";
import fitnessRouter from "./routes/fitness.route.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/doctors", doctorRouter);
app.use("/api/v1/appointments", appointmentRouter);
app.use("/", fitnessRouter);

app.get("/test", (req, res) => {
  res.send("PulseIQ API is working");
});

// ─── Error Handler ────────────────────────────────────────────────────────────
import { errorHandler } from "./middlewares/errorHandler.js";
app.use(errorHandler);

export default app;
