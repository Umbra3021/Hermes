import express from "express";
import { loginUser, registerUser, userProfile } from "./controller.js";
import { auth } from "./middleware.js";

const router = express.Router();


router.post("/user/register", registerUser);
router.post("/user/login", loginUser);

router.get("/user/profile", auth, userProfile);




export default router;