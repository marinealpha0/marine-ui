import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "@/assets/icons";
import { FieldLabel } from "./FieldLabel";
import { getMinimalCourses } from "@/api";

export const DependentCoursesField = ({
    field,
    value = [],
    onChange,
    error,
    viewMode,
}) => {
    const [coursesByCat, setCoursesByCat] = React.useState({});
    const [loadingCats, setLoadingCats] = React.useState({});

    const coursesByCatRef = React.useRef(coursesByCat);
    const loadingCatsRef = React.useRef(loadingCats);

    React.useEffect(() => {
        coursesByCatRef.current = coursesByCat;
    }, [coursesByCat]);

    React.useEffect(() => {
        loadingCatsRef.current = loadingCats;
    }, [loadingCats]);

    const fetchCoursesForCategory = React.useCallback(async (catId) => {
        if (!catId || coursesByCatRef.current[catId] || loadingCatsRef.current[catId]) return;

        setLoadingCats((prev) => ({ ...prev, [catId]: true }));
        try {
            const response = await getMinimalCourses(catId);
            if (response.status) {
                const options = response.data?.data?.map((c) => ({
                    label: c.courseName,
                    value: c._id,
                })) || [];
                setCoursesByCat((prev) => ({ ...prev, [catId]: options }));
            }
        } catch (error) {
            console.error("Failed to fetch courses for category", catId, error);
        } finally {
            setLoadingCats((prev) => ({ ...prev, [catId]: false }));
        }
    }, []);

    React.useEffect(() => {
        if (!viewMode && field.onOpenChange) {
            field.onOpenChange(true);
        }
    }, [field, viewMode]);

    const list = Array.isArray(value) ? value : [];

    React.useEffect(() => {
        list.forEach((row) => {
            if (row.categoryId) {
                fetchCoursesForCategory(row.categoryId);
            }
        });
    }, [list, fetchCoursesForCategory]);

    const handleAddRow = () => {
        const updated = [...list, { categoryId: "", courses: [] }];
        onChange(field.name, updated);
    };

    const handleRemoveRow = (index) => {
        const updated = list.filter((_, idx) => idx !== index);
        onChange(field.name, updated);
    };

    const handleRowChange = (index, key, val) => {
        const updated = list.map((item, idx) => {
            if (idx === index) {
                const updatedItem = { ...item, [key]: val };
                // If categoryId changes, clear selected courses as they might not belong to the new category
                if (key === "categoryId") {
                    updatedItem.courses = [];
                    // Fetch courses for the new category immediately
                    fetchCoursesForCategory(val);
                }
                return updatedItem;
            }
            return item;
        });
        onChange(field.name, updated);
    };

    return (
        <div className="space-y-4 col-span-full">
            <FieldLabel field={field} />

            {/* List of dependency mappings */}
            <div className="space-y-3">
                {list.map((row, idx) => {
                    // Find category label
                    const selectedCatOption = field.categoryOptions?.find(
                        (opt) => opt.value === row.categoryId
                    );
                    const categoryLabel = selectedCatOption?.label || "Unknown Category";

                    const filteredCourseOptions = coursesByCat[row.categoryId] || [];

                    if (viewMode) {
                        const coursesArray = Array.isArray(row.courses) ? row.courses : [];
                        if (!row.categoryId || !coursesArray.length) return null;

                        return (
                            <div
                                key={idx}
                                className="flex flex-col gap-2 p-3 border border-gray-150 rounded-xl bg-gray-50/50"
                            >
                                <span className="text-xs uppercase tracking-wider font-bold text-gray-400">
                                    {categoryLabel}
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                    {coursesArray.map((courseId) => {
                                        const cOpt = filteredCourseOptions.find(
                                            (opt) => opt.value === courseId
                                        );
                                        return (
                                            <Badge
                                                key={courseId}
                                                variant="secondary"
                                                className="bg-primary/5 text-primary border-primary/10 hover:bg-primary/5 cursor-default"
                                            >
                                                {cOpt?.label || courseId}
                                            </Badge>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div
                            key={idx}
                            className="flex flex-col md:flex-row items-stretch md:items-end gap-3 p-4 border border-gray-200 rounded-xl bg-gray-50/30 hover:bg-white hover:shadow-sm transition-all duration-200"
                        >
                            {/* Category Dropdown */}
                            <div className="flex-1 space-y-1.5">
                                <span className="text-xs font-semibold text-gray-700">Category</span>
                                <Select
                                    value={row.categoryId}
                                    onValueChange={(val) => handleRowChange(idx, "categoryId", val)}
                                    disabled={field.disabled || field.loading}
                                    onOpenChange={(open) => {
                                        if (open && field.onOpenChange) {
                                            field.onOpenChange(true);
                                        }
                                    }}
                                >
                                    <SelectTrigger className="bg-white">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {field.categoryOptions?.map((opt) => (
                                            <SelectItem key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Courses MultiSelect */}
                            <div className="flex-[2] space-y-1.5">
                                <span className="text-xs font-semibold text-gray-700">Courses</span>
                                <MultiSelect
                                    options={filteredCourseOptions}
                                    value={row.courses}
                                    onChange={(val) => handleRowChange(idx, "courses", val)}
                                    placeholder={
                                        row.categoryId
                                            ? "Select dependent courses..."
                                            : "Please select category first"
                                    }
                                    disabled={!row.categoryId || field.disabled || field.loading || loadingCats[row.categoryId]}
                                    loading={loadingCats[row.categoryId]}
                                    className="bg-white"
                                    onOpenChange={(open) => {
                                        if (open) {
                                            fetchCoursesForCategory(row.categoryId);
                                        }
                                    }}
                                />
                            </div>

                            {/* Remove Button */}
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 text-gray-400 hover:text-red-500 hover:bg-red-50 border border-gray-200 bg-white"
                                onClick={() => handleRemoveRow(idx)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    );
                })}

                {/* Empty State */}
                {list.length === 0 && (
                    <div className="text-center py-6 border-2 border-dashed rounded-xl bg-gray-50/50 text-muted-foreground">
                        <p className="text-sm">No dependent courses configured.</p>
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
