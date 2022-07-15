import express from "express";
const router = express.Router();
import { test } from "../controllers/user.js";

router.get("/test", test);
//udate user
//delete user
//get a user
//subscribe a user
//like a video
//dislike a video

export default router;
