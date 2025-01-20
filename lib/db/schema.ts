import {
    integer,
    pgEnum,
    pgTable,
    serial,
    text,
    timestamp,
    varchar,
    uuid
  } from "drizzle-orm/pg-core";
  import type { InferSelectModel } from 'drizzle-orm';
  
export const chat = pgTable("chats", {
    id:uuid('id').primaryKey().notNull().defaultRandom(),
    pdfName: text("pdf_name").notNull(),
    pdfUrl: text("pdf_url").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    userId: varchar("user_id", { length: 256 }).notNull(),
    fileKey: text("file_key").notNull(),
  });
  export type Chat = InferSelectModel<typeof chat>;