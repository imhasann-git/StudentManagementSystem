import { db } from "../db.js";
import { courses } from "../../models/schema.js";
import { eq } from "drizzle-orm";

// List all courses
export async function getAllCourses() {
  return await db.select().from(courses);
}

// Add a course
export async function addCourse({ title, description }) {
  const [course] = await db
    .insert(courses)
    .values({ title, description })
    .returning();
  return course || null;
}

// Get a single course by id
export async function getCourseById(id) {
  const [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.id, id));
  return course || null;
}

// Update a single course (partial update)
export async function updateCourse(
  id,
  { title, description }
) {
  const toSet = {};
  if (typeof title !== "undefined") toSet.title = title;
  if (typeof description !== "undefined") toSet.description = description;

  if (Object.keys(toSet).length === 0) return false;

  const [course] = await db
    .update(courses)
    .set(toSet)
    .where(eq(courses.id, id))
    .returning();

  return !!course; // true if updated, false if not found
}

// Delete a single course
export async function deleteCourse(id) {
  const [course] = await db
    .delete(courses)
    .where(eq(courses.id, id))
    .returning();

  return !!course; // true if deleted, false if not found
}
