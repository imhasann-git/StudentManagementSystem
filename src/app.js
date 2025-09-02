import express from "express";
import studentRoutes from "./routes/student.route.js";

const app = express();

// Middleware
app.use(express.json()); // parse JSON request bodies

// Mount routes
app.use("/student", studentRoutes);

export default app;
