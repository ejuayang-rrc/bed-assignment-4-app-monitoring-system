import express, { Express } from "express";
import morgan from "morgan";

// Initialize Express application
const app: Express = express();

// Morgan for HTTP request logging
app.use(morgan("combined"));

// Define a route
app.use();

export default app;