import express from "express";
const router = express.Router();
import { signin, signup } from "../controllers/auth.js";

//create a user
router.post("/signup", signup);
//sign in
router.post("/signin", signin);
//google auth
router.post("/google");
export default router;
