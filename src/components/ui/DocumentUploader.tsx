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
            // Create FormData to upload through your server
            const formData = new FormData();
            formData.append("file", file);
            formData.append("recordType", "Medical Record");
            formData.append("description", "");

            // Upload through your API route (which handles S3 internally)
            const response = await fetch("/api/records/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Upload failed");
            }

            const result = await response.json();

            alert("File uploaded successfully!");
            setProgress(100);

            // Refresh records list
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } catch (error) {
            console.error("Upload error:", error);
            alert("Upload failed: " + (error as Error).message);
        } finally {
            setUploading(false);
            setProgress(0);
            // Reset file input
            if (e.target) {
                e.target.value = "";
            }
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