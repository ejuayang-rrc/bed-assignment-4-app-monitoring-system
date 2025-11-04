import express, { Router } from "express";
import { setCustomClaims, getUserDetails } from "../controllers/adminController";

const router: Router = express.Router();

/** 
 * Route to set custom claims for a user 
 * - requires authentication */
router.put("/profile", setCustomClaims);

/** 
 * Route to get user details from Firebase Authentication 
 * - requires authentication and admin role */
router.get("/:id", getUserDetails);

export default router;