import express from "express";
import studentRoutes from "./routes/student.route.js";
import courseRoutes from "./routes/course.route.js";

const app = express();

// Middleware
app.use(express.json()); // parse JSON request bodies

// Mount routes
app.use("/student", studentRoutes);
app.use("/courses", courseRoutes);

export default app;
