import express from "express";
import {
  getPendingProducts,
  approveProduct,
} from "../controllers/admin.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

router.get(
  "/products/pending",
  authenticateUser,
  authorizeRoles("admin"),
  getPendingProducts
);

router.put(
  "/products/:id/approve",
  authenticateUser,
  authorizeRoles("admin"),
  approveProduct
);

export default router;
