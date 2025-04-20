import { NextResponse } from "next/server";

const todos = [
  { id: 1, name: "Learn Next.js", completed: false },
  { id: 2, name: "Build a Todo app", completed: true },
];

export async function GET() {
  return NextResponse.json(todos);
}
