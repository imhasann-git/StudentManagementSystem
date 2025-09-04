import { db } from "../db.js";
import { courses, enrollments, students } from "../../models/schema.js";
import { eq } from "drizzle-orm";

export async function coursesForStudent(studentId) {
  return await db
    .select({
      id: courses.id,
      title: courses.title,
      description: courses.description,
      enrolledAt: enrollments.enrolledAt,
    })
    .from(enrollments)
    .innerJoin(courses, eq(enrollments.courseId, courses.id))
    .where(eq(enrollments.studentId, studentId));
}

export async function studentsForCourse(courseId) {
  return await db
    .select({
      id: students.id,
      name: students.name,
      email: students.email,
      enrolledAt: enrollments.enrolledAt,
    })
    .from(enrollments)
    .innerJoin(students, eq(enrollments.studentId, students.id))
    .where(eq(enrollments.courseId, courseId));
}
