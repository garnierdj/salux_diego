"use client";

import React, { ReactNode, useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import {
    LayoutDashboard,
    Loader2,
    Stethoscope,
    SlidersHorizontal,
    RotateCcw,
    Plus,
    FileText,
    Download,
    Calendar,
    File,
} from "lucide-react";

// shadcn/ui primitives
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { DocumentUploader } from "@/components/ui/DocumentUploader";

/* -----------------------------------------------------------
 * Utility Components
 * --------------------------------------------------------- */

interface PillProps {
    children: ReactNode;
    className?: string;
}

export function Pill({ children, className = "" }: PillProps) {
    return (
        <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${className}`}
        >
            {children}
        </span>
    );
}

/* -----------------------------------------------------------
 * Types
 * --------------------------------------------------------- */

type User = {
    id: string;
    name: string;
    email: string;
    image?: string | null;
};

type MedicalRecord = {
    id: string;
    fileName: string;
    fileType: string;
    fileSize: number;
    recordType: string | null;
    description: string | null;
    uploadedAt: string;
    createdAt: string;
};

/* -----------------------------------------------------------
 * Add Doctor Type Dialog
 * --------------------------------------------------------- */

function AddTDDialog({ onCreate }: { onCreate: (label: string) => void }) {
    const [label, setLabel] = useState("");
    const [open, setOpen] = useState(false);

    const handleCreate = () => {
        if (!label.trim()) return;
        onCreate(label);
        setLabel("");
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="rounded-2xl">
                    <Plus className="h-4 w-4 mr-2" /> Add Record Type
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>New Record Type</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="grid grid-cols-4 items-center gap-3">
                        <label className="col-span-1 text-sm text-muted-foreground">Label</label>
                        <Input
                            className="col-span-3"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            placeholder="e.g., Lab Result, X-Ray"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleCreate();
                            }}
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <Button variant="outline" className="rounded-2xl" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button className="rounded-2xl" onClick={handleCreate}>
                            Create
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

/* -----------------------------------------------------------
 * Main Dashboard Component
 * --------------------------------------------------------- */

export default function DashboardClient({ user }: { user: User }) {
    const [records, setRecords] = useState<MedicalRecord[]>([]);
    const [selected, setSelected] = useState<MedicalRecord | null>(null);
    const [openDetail, setOpenDetail] = useState(false);
    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState<string | null>(null);
    const [connecting, setConnecting] = useState(false);
    const [q, setQ] = useState("");
    const [autoReq, setAutoReq] = useState(true);
    const [lastRun, setLastRun] = useState("");

    // Load records for the logged-in user
    useEffect(() => {
        async function loadRecords() {
            try {
                setLoading(true);
                const res = await fetch("/api/records");
                if (res.ok) {
                    const data = await res.json();
                    // Fix: Extract records array from response
                    setRecords(data.records || []);
                } else {
                    console.error("Failed to load records");
                }
            } catch (error) {
                console.error("Error loading records:", error);
            } finally {
                setLoading(false);
            }
        }
        loadRecords();
    }, []);

    // Filter records based on search query
    const filtered = useMemo(
        () =>
            records.filter((r) => {
                const searchable = [
                    r.fileName,
                    r.recordType,
                    r.description,
                    r.fileType,
                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();
                return searchable.includes(q.toLowerCase());
            }),
        [records, q]
    );

    const openRecord = (record?: MedicalRecord) => {
        if (!record) return;
        setSelected(record);
        setOpenDetail(true);
    };

    const handleDownload = async (record: MedicalRecord) => {
        try {
            setDownloading(record.id);
            const res = await fetch(`/api/records/${record.id}/download`);
            if (res.ok) {
                const data = await res.json();
                // Open download URL in new tab
                window.open(data.downloadUrl, "_blank");
            } else {
                alert("Failed to generate download link");
            }
        } catch (error) {
            console.error("Download error:", error);
            alert("Failed to download file");
        } finally {
            setDownloading(null);
        }
    };

    const requestNow = () => {
        setConnecting(true);
        setTimeout(() => {
            setConnecting(false);
            setLastRun(new Date().toLocaleString());
        }, 1200);
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const getFileIcon = (fileType: string) => {
        if (fileType.includes("pdf")) return "📄";
        if (fileType.includes("image")) return "🖼️";
        if (fileType.includes("word") || fileType.includes("document")) return "📝";
        return "📎";
    };

    /* -----------------------------------------------------------
     * UI
     * --------------------------------------------------------- */
    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-background to-muted/20 text-foreground">
            {connecting && (
                <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2">
                    <div className="rounded-full bg-background/95 border px-3 py-1.5 shadow flex items-center gap-2 text-sm">
                        <Loader2 className="h-4 w-4 animate-spin" /> Connecting…
                    </div>
                </div>
            )}

            {/* Top bar */}
            <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
                <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center font-bold">
                            {user.name?.[0]?.toUpperCase() || "U"}
                        </div>
                        <div className="font-semibold tracking-tight">Medical Records Dashboard</div>
                        <Badge variant="outline" className="ml-2">
                            {user.email || "User"}
                        </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <OrganizationSwitcher
                            appearance={{ elements: { trigger: "rounded-xl" } }}
                        />
                        <Button asChild size="sm" variant="outline" className="rounded-2xl">
                            <Link href="/billing">Billing</Link>
                        </Button>
                        <Button asChild size="sm" variant="outline" className="rounded-2xl">
                            <Link href="/profile">Profile</Link>
                        </Button>
                        <UserButton
                            appearance={{ elements: { avatarBox: "h-9 w-9" } }}
                            afterSignOutUrl="/"
                        />
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 pb-12">
                <div className="space-y-6 mt-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
                            <LayoutDashboard className="h-5 w-5" /> Medical Records
                        </h1>
                        <div className="flex gap-2">
                            <AddTDDialog onCreate={(label) => console.log("Create:", label)} />
                        </div>
                    </div>

                    {/* Upload Section */}
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <FileText className="h-4 w-4" /> Upload Medical Record
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <DocumentUploader />
                        </CardContent>
                    </Card>

                    {/* Search */}
                    <div className="relative w-72 max-w-full">
                        <Input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search records by name, type, or description…"
                            className="pl-3"
                        />
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        </div>
                    )}

                    {/* Records Grid */}
                    {!loading && (
                        <>
                            {filtered.length === 0 ? (
                                <Card className="shadow-sm">
                                    <CardContent className="py-12 text-center">
                                        <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                        <p className="text-muted-foreground">
                                            {q ? "No records match your search." : "No medical records yet. Upload your first record above."}
                                        </p>
                                    </CardContent>
                                </Card>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {filtered.map((record) => (
                                        <Card key={record.id} className="shadow-sm hover:shadow transition">
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-base flex items-center gap-2">
                                                    <span className="text-lg">{getFileIcon(record.fileType)}</span>
                                                    {record.recordType || "Medical Record"}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-3">
                                                    <div>
                                                        <div className="text-sm font-medium truncate">
                                                            {record.fileName}
                                                        </div>
                                                        {record.description && (
                                                            <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                                                {record.description}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="h-3 w-3" />
                                                            {formatDate(record.uploadedAt)}
                                                        </div>
                                                        <div>{formatFileSize(record.fileSize)}</div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="flex-1 rounded-2xl"
                                                            onClick={() => openRecord(record)}
                                                        >
                                                            View
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            className="flex-1 rounded-2xl"
                                                            onClick={() => handleDownload(record)}
                                                            disabled={downloading === record.id}
                                                        >
                                                            {downloading === record.id ? (
                                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                            ) : (
                                                                <>
                                                                    <Download className="h-4 w-4 mr-1" />
                                                                    Download
                                                                </>
                                                            )}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {/* Automated Records Request */}
                    <Card className="shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base flex items-center gap-2">
                                <SlidersHorizontal className="h-4 w-4" /> Records Requests
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium">Auto-request records from providers</div>
                                    <div className="text-xs text-muted-foreground">
                                        Checks for updates daily and requests missing documents.
                                    </div>
                                </div>
                                <Switch checked={autoReq} onCheckedChange={setAutoReq} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="text-muted-foreground text-xs">
                                    Last requested: {lastRun || "—"}
                                </div>
                                <Button size="sm" className="rounded-2xl" onClick={requestNow}>
                                    <RotateCcw className="h-4 w-4 mr-1" /> Request Now
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            {/* Detail Sheet */}
            {openDetail && selected && (
                <Sheet open={openDetail} onOpenChange={setOpenDetail}>
                    <SheetContent className="w-[460px] sm:w-[560px]">
                        <SheetHeader>
                            <SheetTitle className="flex items-center gap-2">
                                <File className="h-5 w-5" /> {selected.recordType || "Medical Record"}
                            </SheetTitle>
                        </SheetHeader>
                        <div className="mt-6 space-y-4 text-sm">
                            <div className="space-y-4">
                                <div>
                                    <div className="text-muted-foreground mb-1">File Name</div>
                                    <div className="font-medium">{selected.fileName}</div>
                                </div>
                                {selected.description && (
                                    <div>
                                        <div className="text-muted-foreground mb-1">Description</div>
                                        <div className="font-medium">{selected.description}</div>
                                    </div>
                                )}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-muted-foreground mb-1">File Type</div>
                                        <Pill className="bg-primary/10 text-primary">{selected.fileType}</Pill>
                                    </div>
                                    <div>
                                        <div className="text-muted-foreground mb-1">File Size</div>
                                        <div className="font-medium">{formatFileSize(selected.fileSize)}</div>
                                    </div>
                                    <div>
                                        <div className="text-muted-foreground mb-1">Uploaded</div>
                                        <div className="font-medium">{formatDate(selected.uploadedAt)}</div>
                                    </div>
                                    <div>
                                        <div className="text-muted-foreground mb-1">Created</div>
                                        <div className="font-medium">{formatDate(selected.createdAt)}</div>
                                    </div>
                                </div>
                                <div className="pt-4 border-t">
                                    <Button
                                        className="w-full rounded-2xl"
                                        onClick={() => handleDownload(selected)}
                                        disabled={downloading === selected.id}
                                    >
                                        {downloading === selected.id ? (
                                            <>
                                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                Generating...
                                            </>
                                        ) : (
                                            <>
                                                <Download className="h-4 w-4 mr-2" />
                                                Download File
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            )}
        </div>
    );
}
