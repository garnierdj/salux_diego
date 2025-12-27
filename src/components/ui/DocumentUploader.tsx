"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

export function DocumentUploader() {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setProgress(0);

        try {
            // Step 1: Get presigned URL from your API
            const response = await fetch("/api/records/upload-url", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fileName: file.name,
                    fileType: file.type,
                    fileSize: file.size,
                    recordType: "Medical Record", // You can make this selectable
                    description: "", // Optional
                }),
            });

            if (!response.ok) throw new Error("Failed to get upload URL");

            const { uploadUrl, recordId, s3Key } = await response.json();

            // Step 2: Upload directly to S3 using presigned URL
            const uploadResponse = await fetch(uploadUrl, {
                method: "PUT",
                body: file,
                headers: {
                    "Content-Type": file.type,
                },
            });

            if (!uploadResponse.ok) throw new Error("Upload failed");

            // Step 3: Confirm upload (optional - to mark as complete)
            await fetch("/api/records/confirm", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ recordId }),
            });

            alert("File uploaded successfully!");
            setProgress(100);

            // Refresh records list if needed
            window.location.reload();
        } catch (error) {
            console.error("Upload error:", error);
            alert("Upload failed: " + (error as Error).message);
        } finally {
            setUploading(false);
            setProgress(0);
        }
    };

    return (
        <div className="p-6 rounded-xl border bg-white shadow-sm">
            <h3 className="text-lg font-medium mb-3 text-slate-800">
                Upload Medical Record
            </h3>

            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PDF, DOCX, JPG, PNG (MAX. 10MB)</p>
                </div>
                <input
                    type="file"
                    className="hidden"
                    onChange={handleFileSelect}
                    disabled={uploading}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.tiff"
                />
            </label>

            {uploading && (
                <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-blue-600 h-2.5 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Uploading... {progress}%</p>
                </div>
            )}
        </div>
    );
}