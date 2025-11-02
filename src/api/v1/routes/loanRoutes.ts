import express, { Router } from "express";
import * as loanController from "../controllers/loanController";

const router: Router = express.Router();

// Routes for "/api/v1/loans"
router.post("/", loanController.createLoan);
router.put("/:id/review", loanController.reviewLoan);
router.get("/", loanController.getLoan);
router.put("/:id/approve", loanController.approveLoan);

export default router;