import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function GET() {
  const users = await db.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
  return NextResponse.json(users);
}
