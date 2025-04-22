import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { todoTable } from "@/db/schema";
import { z } from "zod";

const createTodoDTO = z.object({
    name: z.string().min(1),
    completed: z.boolean(),
});

export async function GET() {
    try {
        const todos = await db.select().from(todoTable);
        return NextResponse.json(todos, { status: 200 });
    } catch (error: unknown) {
        const message =
            error instanceof Error
                ? error.message
                : "An unknown error occurred";
        console.error("Error fetching todos:", error);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, completed } = createTodoDTO.parse(body);
        const todo = await db
            .insert(todoTable)
            .values({ name, completed })
            .returning();
        return NextResponse.json(todo, { status: 201 });
    } catch (error: unknown) {
        const message =
            error instanceof Error
                ? error.message
                : "An unknown error occurred";
        console.error("Error fetching todos:", error);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
