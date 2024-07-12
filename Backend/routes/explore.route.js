import express from "express";
const router = express.Router();
import { explorePopularRepos } from "../controllers/explore.controller.js";

router.get('/repos/:language',explorePopularRepos);

export default router;