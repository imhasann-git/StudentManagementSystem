import { Router } from "express";
import {
  allStudents,
  createStudent,
  studentInfo,
  updateStudentInfo,
  deleteStudentInfo,
} from "../controllers/student.controller.js";

const router = Router();

// GET all students
router.get("/", allStudents);

// CREATE a new student
router.post("/", createStudent);

// GET a single student by ID
router.get("/:id", studentInfo);

// UPDATE a student by ID
router.put("/:id", updateStudentInfo); // full update

// DELETE a student by ID
router.delete("/:id", deleteStudentInfo);

export default router;
