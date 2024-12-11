"use server";

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function subscribeNewsletter(email) {
  try {
    await sql`INSERT INTO newsletter_subscribers (email) VALUES (${email})`;
    return { success: true };
  } catch (error) {
    console.error("Error subscribing email:", error);
    return { success: false, message: error.message };
  }
}
