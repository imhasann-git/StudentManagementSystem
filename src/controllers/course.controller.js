import {
  getAllCourses,
  addCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../db/queries/course.queries.js";

// Controller to get all courses
export async function allCourses(req, res) {
  try {
    const list = await getAllCourses();
    res.status(200).json({
      success: true,
      data: list,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
}

// Controller to create a new course
export async function createCourse(req, res) {
  const data = req.body;
  try {
    const course = await addCourse({
      title: data.title,
      description: data.description,
    });

    if (course) {
      res.status(201).json({
        success: true,
        message: "Course created",
        data: course,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed to create course",
      });
    }
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}

// Controller to get a single course by ID
export async function courseInfo(req, res) {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid course ID" });
    }

    const course = await getCourseById(id);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    return res.json(course);
  } catch (err) {
    console.error("Error fetching course:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Controller to update a course
export async function updateCourseInfo(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

    const { title, description } = req.body;

    const success = await updateCourse(id, { title, description });

    if (!success) return res.status(404).json({ error: "Course not found" });

    return res.json({ message: "Course updated successfully" });
  } catch (err) {
    console.error("Error updating course:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Controller to delete a course
export async function deleteCourseInfo(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

    const success = await deleteCourse(id);

    if (!success) return res.status(404).json({ error: "Course not found" });

    return res.json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error("Error deleting course:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
