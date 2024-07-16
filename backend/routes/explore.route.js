import express from "express";
const router = express.Router();
import { explorePopularRepos } from "../controllers/explore.controller.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";

router.get('/repos/:language',ensureAuthenticated,explorePopularRepos);

export default router;