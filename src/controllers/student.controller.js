import {
  getAllStudents,
  addStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../db/queries/student.queries.js";

// Controller to get all students
export async function allStudents(req, res) {
  try {
    const students = await getAllStudents();
    res.status(200).json({
      success: true,
      data: students,
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch students",
      error: error.message,
    });
  }
}

// Controller to create a new student
export async function createStudent(req, res) {
  const data = req.body;
  try {
    const student = await addStudent({
      name: data.name,
      email: data.email,
      age: data.age,
    });

    if (student) {
      res.status(201).json({
        success: true,
        message: "Student created",
        data: student,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed to create student",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}

// Controller to get a single student by ID
export async function studentInfo(req, res) {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid student ID" });
    }

    const student = await getStudentById(id);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    return res.json(student);
  } catch (err) {
    console.error("Error fetching student:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Controller to update a student
export async function updateStudentInfo(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

    const success = await updateStudent(id, req.body);

    if (!success) return res.status(404).json({ error: "Student not found" });

    return res.json({ message: "Student updated successfully" });
  } catch (err) {
    console.error("Error updating student:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Controller to delete a student
export async function deleteStudentInfo(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

    const success = await deleteStudent(id);

    if (!success) return res.status(404).json({ error: "Student not found" });

    return res.json({ message: "Student deleted successfully" });
  } catch (err) {
    console.error("Error deleting student:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
