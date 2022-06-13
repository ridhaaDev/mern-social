import express from "express";
import { register_user } from "../controllers/auth_controller.js";

const router  = express.Router()

router.post('/register', register_user)

export default router