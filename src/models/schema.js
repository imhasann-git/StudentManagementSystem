import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";

// --------------------
// Students Table
// --------------------
export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 150 }).notNull().unique(),
  age: integer("age"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// --------------------
// Courses Table
// --------------------
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 150 }).notNull(),
  description: varchar("description", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// --------------------
// Enrollments Table (Many-to-Many)
// --------------------
export const enrollments = pgTable(
  "enrollments",
  {
    studentId: integer("student_id")
      .notNull()
      .references(() => students.id, { onDelete: "cascade" }),
    courseId: integer("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    enrolledAt: timestamp("enrolled_at").defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.studentId, table.courseId] }),
  })
);
