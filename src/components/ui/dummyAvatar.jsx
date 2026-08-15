import { cn } from "@/lib/utils";

export const DummyAvatar = ({ name, className, spanClassName }) => {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";
  return (
    <div
      className={cn(
        "size-10 rounded-full bg-gray-600 flex items-center justify-center",
        className
      )}
    >
      <span
        className={cn(
          "text-primary-foreground text-sm font-semibold",
          spanClassName
        )}
      >
        {initials}
      </span>
    </div>
  );
};
