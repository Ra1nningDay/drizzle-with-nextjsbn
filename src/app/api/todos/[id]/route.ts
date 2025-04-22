import { db } from "../../../../lib/db";
import { todoTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, context: { params: { id: string } }) {
    try {
        const id = parseInt(context.params.id);
        const { completed } = await req.json();
        const todo = await db
            .update(todoTable)
            .set({ completed: completed })
            .where(eq(todoTable.id, id))
            .returning();
        return NextResponse.json(todo, { status: 200 });
    } catch (error: unknown) {
        const message =
            error instanceof Error
                ? error.message
                : "An unknown error occurred";
        console.error("Error fetching todos:", error);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    context: { params: { id: string } }
) {
    try {
        const id = parseInt(context.params.id);
        const todo = await db
            .delete(todoTable)
            .where(eq(todoTable.id, id))
            .returning();
        return NextResponse.json(todo, { status: 200 });
    } catch (error: unknown) {
        const message =
            error instanceof Error
                ? error.message
                : "An unknown error occurred";
        console.error("Error fetching todos:", error);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
