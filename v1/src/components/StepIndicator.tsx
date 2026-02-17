'use client';

import type { StepIndicatorProps } from '../types';

export function StepIndicator({ currentStep, totalSteps, labels }: StepIndicatorProps) {
  return (
    <nav aria-label="Progress" className="mb-6">
      <ol className="flex items-center justify-center gap-2">
        {labels.map((label, index) => {
          const isActive = index === currentStep;
          const isComplete = index < currentStep;

          return (
            <li key={label} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : isComplete
                      ? 'bg-success text-white'
                      : 'bg-gray-light text-gray-medium'
                }`}
                aria-current={isActive ? 'step' : undefined}
              >
                {isComplete ? '✓' : index + 1}
              </div>
              <span
                className={`hidden text-sm sm:inline ${
                  isActive ? 'font-semibold text-gray-dark' : 'text-gray-medium'
                }`}
              >
                {label}
              </span>
              {index < totalSteps - 1 && (
                <div
                  className={`mx-1 h-0.5 w-8 ${
                    isComplete ? 'bg-success' : 'bg-gray-light'
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
