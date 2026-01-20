import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getPresignedDownloadUrl } from "@/lib/s3";
import { prisma } from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Await the params Promise
        const { id } = await params;

        const record = await prisma.medicalRecord.findFirst({
            where: {
                id: id,
                userId,
            },
        });

        if (!record) {
            return NextResponse.json({ error: "Record not found" }, { status: 404 });
        }

        // Generate presigned download URL (valid for 1 hour)
        const downloadUrl = await getPresignedDownloadUrl(record.s3Key, 3600);

        return NextResponse.json({
            downloadUrl,
            fileName: record.fileName,
        });
    } catch (error) {
        console.error("Download URL error:", error);
        return NextResponse.json(
            { error: "Failed to generate download URL" },
            { status: 500 }
        );
    }
}
