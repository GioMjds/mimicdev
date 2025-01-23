import express from "express";
import {
    githubLogin,
    githubCallback,
    googleLogin,
    googleCallback,
    login,
    logout,
    register,
    profile,
} from "../controller/authController";

const router = express.Router();

router.get("/github", githubLogin);
router.get("/github/callback", githubCallback);
router.get("/google", googleLogin);
router.get("/google/callback", googleCallback);
router.get("/login", login);
router.get("/register", register);
router.get("/logout", logout);
router.get("/profile", profile);

export default router;