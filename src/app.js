import express from "express";
import studentRoutes from "./routes/student.route.js";
import courseRoutes from "./routes/course.route.js";
import enrollmentRoutes from "./routes/enrollement.route.js";

const app = express();

// Middleware
app.use(express.json()); // parse JSON request bodies

// Mount routes
app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);
app.use("/enrollments", enrollmentRoutes);


export default app;
