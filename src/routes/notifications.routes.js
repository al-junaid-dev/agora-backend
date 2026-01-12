import express from "express";
import { getRetailerNotifications } from "../controllers/notifications.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();


router.get(
  "/retailer",
  authenticateUser,
  authorizeRoles("retailer"),
  getRetailerNotifications
);

export default router;
