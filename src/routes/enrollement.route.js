import { Router } from "express";
import {
  allEnrollments,
  createEnrollment,
  updateEnrollmentInfo,
  deleteEnrollmentInfo,
} from "../controllers/enrollement.controller.js";

const router = Router();

// GET all enrollments
router.get("/", allEnrollments);

// CREATE a new enrollment
router.post("/", createEnrollment);

// UPDATE an enrollment (by studentId + courseId)
router.put("/:studentId/:courseId", updateEnrollmentInfo);

// DELETE an enrollment (by studentId + courseId)
router.delete("/:studentId/:courseId", deleteEnrollmentInfo);

export default router;
