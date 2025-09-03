import {
  getAllEnrollments,
  addEnrollment,
  updateEnrollment,
  deleteEnrollment,
} from "../db/queries/enrollment.queries.js";

// Get all enrollments
export async function allEnrollments(req, res) {
  try {
    const list = await getAllEnrollments();
    res.status(200).json({ success: true, data: list });
  } catch (err) {
    console.error("Error fetching enrollments:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}

// Create a new enrollment
export async function createEnrollment(req, res) {
  try {
    const { studentId, courseId } = req.body;
    const result = await addEnrollment({ studentId, courseId });

    if (!result) {
      return res.status(400).json({ success: false, message: "Failed to enroll" });
    }

    res.status(201).json({
      success: true,
      message: "Enrollment created",
      data: result,
    });
  } catch (err) {
    console.error("Error creating enrollment:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}

// Update an enrollment
export async function updateEnrollmentInfo(req, res) {
  try {
    const { studentId, courseId } = req.params;
    const result = await updateEnrollment(
      parseInt(studentId, 10),
      parseInt(courseId, 10),
      req.body
    );

    if (!result) {
      return res.status(404).json({ success: false, message: "Enrollment not found" });
    }

    res.json({ success: true, message: "Enrollment updated", data: result });
  } catch (err) {
    console.error("Error updating enrollment:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}

// Delete an enrollment
export async function deleteEnrollmentInfo(req, res) {
  try {
    const { studentId, courseId } = req.params;
    const result = await deleteEnrollment(
      parseInt(studentId, 10),
      parseInt(courseId, 10)
    );

    if (!result) {
      return res.status(404).json({ success: false, message: "Enrollment not found" });
    }

    res.json({ success: true, message: "Enrollment deleted", data: result });
  } catch (err) {
    console.error("Error deleting enrollment:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}
