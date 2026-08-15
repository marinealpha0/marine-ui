import React from "react";
import RichTextEditor from "@/components/editors/RichTextEditor";
import { FieldLabel } from "./FieldLabel";

export const RichTextField = ({ field, value, onChange, error }) => {
    return (
        <div className="space-y-2 col-span-full">
            <FieldLabel field={field} />
            <RichTextEditor
                value={value}
                onChange={(content) => onChange(field.name, content)}
                minHeight={field.minHeight || "150px"}
                maxHeight={field.maxHeight || "250px"}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
};
