import { Router } from "express";
import {
  allCourses,
  createCourse,
  courseInfo,
  updateCourseInfo,
  deleteCourseInfo,
} from "../controllers/course.controller.js";

import { getStudentsForCourse } from "../controllers/relation.controllers.js";
const router = Router();

// GET all courses
router.get("/", allCourses);

// CREATE a new course
router.post("/", createCourse);

// GET a single course by ID
router.get("/:id", courseInfo);

// UPDATE a course by ID
router.put("/:id", updateCourseInfo); // full update

// DELETE a course by ID
router.delete("/:id", deleteCourseInfo);

// GET /courses/:id/students → list students for a course
router.get("/:id/students", getStudentsForCourse);

export default router;
