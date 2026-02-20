import { Router } from "express";
import {
  initiateGoogleAuth,
  handleGoogleCallback,
  getFitnessData,
} from "../controllers/fitness.controller.js";

const router = Router();

// Google OAuth routes
router.get("/auth/google", initiateGoogleAuth);
router.get("/auth/google/callback", handleGoogleCallback);

// Fitness data route
router.get("/fitness-data", getFitnessData);

export default router;
