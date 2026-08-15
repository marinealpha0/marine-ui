import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "@/assets/icons";
import { FieldLabel } from "./FieldLabel";

const LANGUAGES = ["English", "Hindi", "Telugu"];

export const VideoListField = ({
    field,
    value = [],
    onChange,
    error,
    viewMode,
}) => {
    const list = Array.isArray(value) ? value : [];

    const handleAddRow = () => {
        const updated = [...list, { language: "English", videoUrl: "", duration: "" }];
        onChange(field.name, updated);
    };

    const handleRemoveRow = (index) => {
        const updated = list.filter((_, idx) => idx !== index);
        onChange(field.name, updated);
    };

    const handleRowChange = (index, key, val) => {
        const updated = list.map((item, idx) => {
            if (idx === index) {
                return { ...item, [key]: val };
            }
            return item;
        });
        onChange(field.name, updated);
    };

    return (
        <div className="space-y-4 col-span-full">
            <FieldLabel field={field} />

            {/* List of video objects */}
            <div className="space-y-3">
                {list.map((row, idx) => {
                    if (viewMode) {
                        if (!row.videoUrl) return null;
                        return (
                            <div
                                key={idx}
                                className="flex flex-col md:flex-row md:items-center gap-3 p-3 border border-gray-150 rounded-xl bg-gray-50/50"
                            >
                                <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                                    {row.language || "English"}
                                </span>
                                <a
                                    href={row.videoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-primary hover:underline truncate max-w-md"
                                >
                                    {row.videoUrl}
                                </a>
                                {row.duration && (
                                    <span className="text-xs text-muted-foreground ml-auto">
                                        Duration: {row.duration} mins
                                    </span>
                                )}
                            </div>
                        );
                    }

                    return (
                        <div
                            key={idx}
                            className="flex flex-col md:flex-row items-stretch md:items-end gap-3 p-4 border border-gray-200 rounded-xl bg-gray-50/30 hover:bg-white hover:shadow-sm transition-all duration-200"
                        >
                            {/* Language Dropdown */}
                            <div className="flex-1 space-y-1.5 min-w-[120px]">
                                <span className="text-xs font-semibold text-gray-700">Language</span>
                                <Select
                                    value={row.language || "English"}
                                    onValueChange={(val) => handleRowChange(idx, "language", val)}
                                    disabled={field.disabled || field.loading}
                                    onOpenChange={(open) => {
                                        if (open && field.onOpenChange) {
                                            field.onOpenChange(true);
                                        }
                                    }}
                                >
                                    <SelectTrigger className="bg-white">
                                        <SelectValue placeholder="Select Language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {LANGUAGES.map((lang) => (
                                            <SelectItem key={lang} value={lang}>
                                                {lang}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Video URL Input */}
                            <div className="flex-[3] space-y-1.5">
                                <span className="text-xs font-semibold text-gray-700">Video URL</span>
                                <Input
                                    type="text"
                                    value={row.videoUrl || ""}
                                    onChange={(e) => handleRowChange(idx, "videoUrl", e.target.value)}
                                    placeholder="e.g. https://youtube.com/..."
                                    disabled={field.disabled || field.loading}
                                    className="bg-white h-10"
                                />
                            </div>

                            {/* Duration Input */}
                            <div className="flex-1 space-y-1.5 min-w-[100px]">
                                <span className="text-xs font-semibold text-gray-700">Duration (mins)</span>
                                <Input
                                    type="number"
                                    value={row.duration || ""}
                                    onChange={(e) => handleRowChange(idx, "duration", e.target.value)}
                                    placeholder="e.g. 10"
                                    disabled={field.disabled || field.loading}
                                    className="bg-white h-10"
                                    min="0"
                                />
                            </div>

                            {/* Remove Button */}
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 text-gray-400 hover:text-red-500 hover:bg-red-50 border border-gray-200 bg-white"
                                onClick={() => handleRemoveRow(idx)}
                                disabled={field.disabled || field.loading}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    );
                })}

                {/* Empty State */}
                {list.length === 0 && (
                    <div className="text-center py-6 border-2 border-dashed rounded-xl bg-gray-50/50 text-muted-foreground">
                        <p className="text-sm">No videos configured.</p>
                    </div>
                )}
            </div>

            {/* Add More Button */}
            {!viewMode && (
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1.5"
                    onClick={handleAddRow}
                    disabled={field.disabled || field.loading}
                >
                    <Plus className="h-4 w-4" /> Add More
                </Button>
            )}

            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
};
