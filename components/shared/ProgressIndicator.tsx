"use client";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const STEP_LABELS = ["Business Info", "Payment", "Review", "Complete"];

export default function ProgressIndicator({
  currentStep,
  totalSteps,
}: ProgressIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-0">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isFinalStepComplete =
            stepNumber === totalSteps && stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep || isFinalStepComplete;
          const isCurrent = stepNumber === currentStep && !isFinalStepComplete;

          return (
            <div key={stepNumber} className="flex items-center flex-1 last:flex-none">
              <div
                className={[
                  "w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 border-2",
                  isCompleted
                    ? "bg-[#1b2a6b] border-[#1b2a6b] text-white"
                    : isCurrent
                    ? "bg-white border-[#1b2a6b] text-[#1b2a6b]"
                    : "bg-gray-200 border-gray-200 text-gray-400",
                ].join(" ")}
              >
                {isCompleted ? (
                  <span className="text-sm leading-none">✓</span>
                ) : (
                  <span>{stepNumber}</span>
                )}
              </div>
              <span className="sr-only">{STEP_LABELS[index]}</span>
              {stepNumber < totalSteps && (
                <div
                  className={[
                    "flex-1 h-0.5 mx-1",
                    isCompleted ? "bg-[#1b2a6b]" : "bg-gray-200",
                  ].join(" ")}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
