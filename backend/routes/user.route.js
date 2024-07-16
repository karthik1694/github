import express from "express";
import { getUserProfileAndRepos } from "../controllers/user.controller.js";
import {ensureAuthenticated} from "../middleware/ensureAuthenticated.js";
import { likeProfile } from "../controllers/user.controller.js";
import { getLikes } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/profile/:username", getUserProfileAndRepos);
//todo likes
router.get("/likes",ensureAuthenticated,getLikes);
router.post("/like/:username",ensureAuthenticated, likeProfile);

export default router;