import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { recordId } = await req.json();

        // Verify record belongs to user
        const record = await prisma.medicalRecord.findFirst({
            where: {
                id: recordId,
                userId: session.user.id,
            },
        });

        if (!record) {
            return NextResponse.json({ error: "Record not found" }, { status: 404 });
        }

        // You could add verification that file exists in S3 here
        // For now, just return success

        return NextResponse.json({
            success: true,
            record: {
                id: record.id,
                fileName: record.fileName,
                uploadedAt: record.uploadedAt,
            },
        });
    } catch (error) {
        console.error("Confirm upload error:", error);
        return NextResponse.json(
            { error: "Failed to confirm upload" },
            { status: 500 }
        );
    }
}