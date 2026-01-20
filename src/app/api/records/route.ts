import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const records = await prisma.medicalRecord.findMany({
            where: {
                userId,
            },
            orderBy: {
                uploadedAt: "desc",
            },
            select: {
                id: true,
                fileName: true,
                fileType: true,
                fileSize: true,
                recordType: true,
                description: true,
                uploadedAt: true,
                createdAt: true,
            },
        });

        return NextResponse.json({ records });
    } catch (error) {
        console.error("List records error:", error);
        return NextResponse.json(
            { error: "Failed to fetch records" },
            { status: 500 }
        );
    }
}
