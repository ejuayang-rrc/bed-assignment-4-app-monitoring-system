import express, { Router } from "express";
import * as loanController from "../controllers/loanController";

const router: Router = express.Router();

// Routes for "/api/v1/branch"
router.post("/", loanController.createLoan);
router.put("/:id", loanController.reviewLoan);
router.get("/:id", loanController.getLoan);
router.put("/:id", loanController.approveLoan);

export default router;