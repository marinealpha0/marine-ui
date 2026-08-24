import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Reusable WorkflowStepper Component
 * 
 * @param {Object} props
 * @param {Array} props.steps - Array of step objects [{ num: 1, label: "Draft", state: "done" }] or strings
 * @param {number|string} [props.currentStep] - Active step index or name
 * @param {string} [props.title] - Section title ("Workflow")
 * @param {string} [props.description] - Subtitle ("Current stage highlighted")
 * @param {boolean} [props.showCheckmark=true] - Show checkmark on done steps
 * @param {string} [props.className] - Additional container classes
 */
export function WorkflowStepper({
  steps = [],
  currentStep,
  title = "Workflow",
  description = "Current stage highlighted",
  showCheckmark = true,
  className,
}) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className={cn("rounded-xl border border-border/80 bg-white p-5 shadow-xs space-y-3", className)}>
      {(title || description) && (
        <div>
          {title && <h3 className="text-base font-bold text-gray-900">{title}</h3>}
          {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 pt-1">
        {steps.map((step, idx) => {
          const isObj = typeof step === "object" && step !== null;
          const stepNum = isObj ? (step.num ?? step.id ?? idx + 1) : idx + 1;
          const stepLabel = isObj ? (step.label ?? step.name ?? step.title) : step;

          let state = "upcoming";
          if (isObj && step.state) {
            state = step.state;
          } else if (currentStep !== undefined) {
            if (typeof currentStep === "number") {
              if (stepNum < currentStep) state = "done";
              else if (stepNum === currentStep) state = "active";
              else state = "upcoming";
            } else if (typeof currentStep === "string") {
              if (stepLabel.toLowerCase() === currentStep.toLowerCase()) state = "active";
            }
          }

          const isDone = state === "done" || state === "completed";
          const isActive = state === "active" || state === "current" || state === "in-progress";

          const nextStep = steps[idx + 1];
          const nextIsObj = typeof nextStep === "object" && nextStep !== null;
          const nextState = nextIsObj ? nextStep.state : undefined;
          const isLineGreen = isDone && (nextState === "done" || nextState === "active" || (typeof currentStep === "number" && stepNum < currentStep));

          return (
            <React.Fragment key={stepNum + "-" + stepLabel}>
              {/* Step Item Pill */}
              <div
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors select-none",
                  isDone && "bg-emerald-50 text-emerald-700 border border-emerald-300 font-medium",
                  isActive && "bg-sky-50 text-sky-700 border border-sky-300 font-semibold shadow-xs",
                  !isDone && !isActive && "bg-gray-50 text-gray-400 border border-gray-200"
                )}
              >
                {isDone && showCheckmark ? (
                  <Check className="size-3.5 text-emerald-600 shrink-0 stroke-[2.5]" />
                ) : null}
                <span>{stepNum}</span>
                <span>{stepLabel}</span>
              </div>

              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 w-6 hidden sm:block transition-colors",
                    isLineGreen ? "bg-emerald-400" : "bg-gray-200"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
