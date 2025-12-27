import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPresignedDownloadUrl } from "@/lib/s3";
import { prisma } from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const record = await prisma.medicalRecord.findFirst({
            where: {
                id: params.id,
                userId: session.user.id,
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