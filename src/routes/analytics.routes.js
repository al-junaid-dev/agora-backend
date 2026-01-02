import express from "express";
import { getRetailerAnalytics } from "../controllers/analytics.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

router.get(
  "/retailer",
  authenticateUser,
  authorizeRoles("retailer"),
  getRetailerAnalytics
);

export default router;
