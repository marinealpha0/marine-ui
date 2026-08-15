import {
  CircleCheck,
  Info,
  OctagonX,
  TriangleAlert,
} from "@/assets/icons"
import { Toaster as Sonner } from "sonner"

const Toaster = ({
  ...props
}) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg data-[type=success]:!bg-success data-[type=success]:!text-primary-foreground data-[type=success]:!border-none data-[type=error]:!bg-destructive data-[type=error]:!text-primary-foreground data-[type=error]:!border-none data-[type=warning]:!bg-warning data-[type=warning]:!text-black data-[type=warning]:!border-none data-[type=info]:!bg-primary data-[type=info]:!text-primary-foreground data-[type=info]:!border-none",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      icons={{
        success: <CircleCheck className="w-5 h-5" />,
        error: <OctagonX className="w-5 h-5" />,
        warning: <TriangleAlert className="w-5 h-5" />,
        info: <Info className="w-5 h-5" />,
      }}
      {...props} />
  );
}

export { Toaster }
