import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPresignedUploadUrl } from "@/lib/s3";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { fileName, fileType, fileSize, recordType, description } = await req.json();

        // Validate file type (only allow medical document types)
        const allowedTypes = [
            "application/pdf",
            "image/jpeg",
            "image/png",
            "image/tiff",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        if (!allowedTypes.includes(fileType)) {
            return NextResponse.json(
                { error: "File type not allowed" },
                { status: 400 }
            );
        }

        // Validate file size (e.g., max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (fileSize > maxSize) {
            return NextResponse.json(
                { error: "File too large. Maximum size is 10MB" },
                { status: 400 }
            );
        }

        // Generate unique S3 key (userId/timestamp-filename)
        const timestamp = Date.now();
        const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
        const s3Key = `${session.user.id}/${timestamp}-${sanitizedFileName}`;

        // Create database record first
        const record = await prisma.medicalRecord.create({
            data: {
                userId: session.user.id,
                fileName,
                fileType,
                fileSize,
                s3Key,
                s3Bucket: process.env.AWS_S3_BUCKET_NAME!,
                recordType: recordType || null,
                description: description || null,
            },
        });

        // Generate presigned URL
        const uploadUrl = await getPresignedUploadUrl(s3Key, fileType, 3600); // 1 hour expiry

        return NextResponse.json({
            uploadUrl,
            recordId: record.id,
            s3Key,
        });
    } catch (error) {
        console.error("Upload URL error:", error);
        return NextResponse.json(
            { error: "Failed to generate upload URL" },
            { status: 500 }
        );
    }
}