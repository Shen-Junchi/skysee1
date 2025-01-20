import 'server-only';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import {chat} from "./schema"

import { and, asc, desc, eq, gt, gte } from 'drizzle-orm';

const client = postgres(process.env.POSTGRES_URL!);
export const db = drizzle(client);


export async function getChatsByUserId({ id }: { id: string }) {
    try {
      return await db
        .select()
        .from(chat)
        .where(eq(chat.userId, id))
        .orderBy(desc(chat.createdAt));
    } catch (error) {
      console.error('Failed to get chats by user from database');
      throw error;
    }
  }