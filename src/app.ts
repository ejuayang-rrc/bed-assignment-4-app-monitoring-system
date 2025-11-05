import express, { Express } from "express";

import loanRoutes from "./api/v1/routes/loanRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes";
import userRoutes from "./api/v1/routes/userRoutes";
import errorHandler from "./api/v1/middleware/errorHandler";
import { 
    accessLogger,
    errorLogger,
    consoleLogger,
} from "./api/v1/middleware/logger";

// Initialize Express application
const app: Express = express();

// Logging middleware
app.use(accessLogger);
app.use(errorLogger);
app.use(consoleLogger);

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

// Route imports
app.use("/api/v1/loans", loanRoutes);
app.use("/api/v1/admin", adminRoutes)
app.use("/api/v1/users", userRoutes)

// Global error handling middleware
app.use(errorHandler)

export default app;
