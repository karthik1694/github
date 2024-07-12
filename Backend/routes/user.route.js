import express from "express";
import { getUserProfileAndRepos } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/profile/:username", getUserProfileAndRepos);
//todo likes
//post like a p

export default router;