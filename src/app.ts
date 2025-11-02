import express, { Express } from "express";
import morgan from "morgan";

import loanRoutes from "./api/v1/routes/loanRoutes";

// Initialize Express application
const app: Express = express();

// Morgan for HTTP request logging
app.use(morgan("combined"));

// Ensures incoming body is correctly parsed to JSON
app.use(express.json());

/**
 * Health check route that returns server status details
 * @returns server health metrics in a json response
 */
app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

// Import loan route
app.use("/api/v1/loans", loanRoutes);

export default app;
