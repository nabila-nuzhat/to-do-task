import express from "express";

import validate from "../middleware/validate.js";

import {
  registerSchema,
  loginSchema,
} from "../schemas/authSchemas.js";

import {
  registerUser,
  loginUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post(
  "/register",
  validate(registerSchema),
  registerUser
);

router.post(
  "/login",
  validate(loginSchema),
  loginUser
);

export default router;