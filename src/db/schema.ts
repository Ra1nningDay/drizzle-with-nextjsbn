import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
export const todoTable = pgTable("todos", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});
