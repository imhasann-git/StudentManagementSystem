import { db } from "../db.js";
import { students } from "../../models/schema.js";
import { eq } from "drizzle-orm";

// List all students
export async function getAllStudents() {
  return (await db.select().from(students)) || null;
}

// Add a student
export async function addStudent({ name, email, age }) {
  const [student] = await db
    .insert(students)
    .values({ name, email, age })
    .returning();
  return student || null;
}

// Get info about a single student
export async function getStudentById(id) {
  const [student] = await db.select().from(students).where(eq(students.id, id));
  return student || null;
}

// Update info about a single student
export async function updateStudent(id, { name, email, age }) {
  const [student] = await db
    .update(students)
    .set({ name, email, age })
    .where(eq(students.id, id))
    .returning();

  return !!student; // true if updated, false if not found
}

// Delete info about a single student
export async function deleteStudent(id) {
  const [student] = await db
    .delete(students)
    .where(eq(students.id, id))
    .returning();

  return !!student; // true if deleted, false if not found
}
