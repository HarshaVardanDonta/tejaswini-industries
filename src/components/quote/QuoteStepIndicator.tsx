import { Icon } from '../Icon'
import { quotePage } from '../../data/quote'

type QuoteStepIndicatorProps = {
  currentStep: number
}

export function QuoteStepIndicator({ currentStep }: QuoteStepIndicatorProps) {
  const progressPercent =
    currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%'

  return (
    <div className="w-full relative py-space-4 mb-space-8 pb-space-4 border-b border-gray-100">
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 rounded-full z-0 hidden sm:block" />
      <div
        className="absolute top-1/2 left-0 h-1 bg-secondary -translate-y-1/2 z-0 hidden sm:block transition-all duration-300 rounded-full"
        style={{ width: progressPercent }}
      />
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        {quotePage.steps.map((step) => {
          const isComplete = currentStep > step.number
          const isActive = currentStep === step.number
          const isPending = currentStep < step.number

          return (
            <div
              key={step.number}
              className="relative z-10 flex items-center gap-space-3 bg-surface-container-lowest px-space-2 py-space-1 rounded-DEFAULT"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-label text-label shrink-0 ${
                  isComplete
                    ? 'bg-primary text-on-primary shadow-sm'
                    : isActive
                      ? 'bg-secondary text-on-secondary border-2 border-secondary shadow-[0_0_0_3px_rgba(187,0,39,0.15)]'
                      : 'bg-surface-variant text-gray-500'
                }`}
              >
                {isComplete ? (
                  <Icon name="check" size={18} />
                ) : (
                  step.number
                )}
              </div>
              <div>
                <p
                  className={`font-label text-label uppercase ${
                    isActive
                      ? 'text-secondary'
                      : isComplete
                        ? 'text-primary'
                        : 'text-gray-500'
                  }`}
                >
                  Step {step.number}
                </p>
                <p
                  className={`font-h3 text-h3 hidden sm:block ${
                    isPending ? 'text-gray-500' : 'text-on-surface'
                  }`}
                >
                  {step.shortLabel}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
