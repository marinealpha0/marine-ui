import * as LucideIcons from "lucide-react";

export const getIcon = (iconName) => {
    // 1. Try to find the icon in the Lucide library by name (Case sensitive usually, but let's be robust)
    // We assume the user types "LayoutDashboard" or "Users"
    if (!iconName) return LucideIcons.Circle;

    // Handle various casing if needed, but standard Lucide is PascalCase
    const IconComponent = LucideIcons[iconName];

    if (IconComponent) {
        return IconComponent;
    }

    // Debug log if not found (optional)
    // console.warn(`Icon "${iconName}" not found in lucide-react`);

    // Default fallback
    return LucideIcons.Circle; // Or generic HelpCircle
};
