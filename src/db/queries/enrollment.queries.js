import { db } from "../db.js";
import { enrollments } from "../../models/schema.js";
import { and, eq } from "drizzle-orm";

// List all enrollments
export async function getAllEnrollments() {
	return await db.select().from(enrollments);
}

// Add an enrollment
export async function addEnrollment({ studentId, courseId }) {
	const [result] = await db
		.insert(enrollments)
		.values({ studentId, courseId })
		.returning();
	return result || null;
}

// Update an enrollment (refresh enrolledAt or add future fields)
export async function updateEnrollment(studentId, courseId, updates = {}) {
	const toSet = { enrolledAt: new Date(), ...updates };

	const [result] = await db
		.update(enrollments)
		.set(toSet)
		.where(
			and(eq(enrollments.studentId, studentId), eq(enrollments.courseId, courseId))
		)
		.returning();

	return result || null;
}

// Delete an enrollment
export async function deleteEnrollment(studentId, courseId) {
	const [result] = await db
		.delete(enrollments)
		.where(
			and(eq(enrollments.studentId, studentId), eq(enrollments.courseId, courseId))
		)
		.returning();

	return result || null;
}
