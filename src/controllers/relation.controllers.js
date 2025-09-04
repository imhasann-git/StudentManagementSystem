import {
  coursesForStudent,
  studentsForCourse,
} from "../db/queries/relation.queries.js";

// Controller: Get all courses for a given student
export async function getCoursesForStudent(req, res) {
  try {
    const studentId = parseInt(req.params.id, 10);

    if (isNaN(studentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID",
      });
    }

    const courses = await coursesForStudent(studentId);

    if (!courses || courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No courses found for this student",
      });
    }

    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error("Error fetching courses for student:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch courses for student",
      error: error.message,
    });
  }
}

// Controller: Get all students for a given course
export async function getStudentsForCourse(req, res) {
  try {
    const courseId = parseInt(req.params.id, 10);

    if (isNaN(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID",
      });
    }

    const students = await studentsForCourse(courseId);

    if (!students || students.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No students found for this course",
      });
    }

    res.status(200).json({
      success: true,
      data: students,
    });
  } catch (error) {
    console.error("Error fetching students for course:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch students for course",
      error: error.message,
    });
  }
}
