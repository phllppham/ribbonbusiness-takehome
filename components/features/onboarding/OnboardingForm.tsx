"use client";

import { useOnboarding } from "../../../contexts/OnboardingContext";
import BusinessInfo from "./BusinessInfo";
import PaymentStep from "./PaymentStep";
import ReviewStep from "./ReviewStep";
import CompleteStep from "./CompleteStep";
import ProgressIndicator from "../../shared/ProgressIndicator";
import mockData from "../../../mock-data.json";

const TOTAL_STEPS = 4;

export default function OnboardingForm() {
  const { state, actions } = useOnboarding();

  const getNextStep = (fromStep: number): number => {
    if (fromStep === 1 && state.paymentData.confirmed) {
      // Skip payment step if already confirmed
      return 3;
    }
    return fromStep + 1;
  };

  const handleAdvanceToStep = (fromStep: number) => {
    const nextStep = getNextStep(fromStep);
    actions.setStep(nextStep);
  };

  const handleBack = () => {
    actions.goToPreviousStep();
  };

  const handleSubmit = async (): Promise<void> => {
    actions.setSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const businessName = state.formData.businessName.trim().toLowerCase();
      const isConflict = mockData.conflictingNames.map((n: string) => n.toLowerCase()).includes(businessName);

      if (isConflict) {
        // Registration rejected - business name conflict
        actions.setRejected(true);
        actions.setStep(1);
        actions.setSubmissionResult({
          success: false,
          error: 'Business name already exists. Please choose a different name.',
        });
      } else {
        // Registration successful
        actions.setRejected(false);
        actions.setStep(4);
        actions.setSubmissionResult({
          success: true,
        });
      }
    } catch (error) {
      actions.setSubmissionResult({
        success: false,
        error: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      actions.setSubmitting(false);
    }
  };

  const handleRejectionAcknowledged = () => {
    actions.setRejected(false);
  };

  return (
    <div className="h-screen overflow-hidden bg-[#f7f8fa] flex flex-col items-stretch font-sans m-0 p-0">
      <nav className="w-full bg-[#1b2a6b] px-6 m-0 h-14 flex items-center shrink-0">
        <span className="text-[17px] font-semibold text-white tracking-tight">Ribbon Business</span>
      </nav>
      <div className="w-full max-w-[480px] mx-auto px-4 py-12 pb-16">
        <ProgressIndicator
          currentStep={state.currentStep}
          totalSteps={TOTAL_STEPS}
        />
        <h1 className="mb-5 text-[22px] font-bold text-[#1b2a6b] tracking-tight">Start a Sole Proprietorship</h1>

        {state.currentStep === 1 && (
          <BusinessInfo
            formData={state.formData}
            isRejected={state.isRejected}
            paymentConfirmed={state.paymentData.confirmed}
            onFormDataChange={actions.updateFormData}
            onNext={() => handleAdvanceToStep(1)}
            onRejectionAcknowledged={handleRejectionAcknowledged}
          />
        )}

        {state.currentStep === 2 && (
          <PaymentStep
            paymentData={state.paymentData}
            onPaymentDataChange={actions.updatePaymentData}
            onBack={handleBack}
            onNext={() => handleAdvanceToStep(2)}
          />
        )}

        {state.currentStep === 3 && (
          <ReviewStep
            formData={state.formData}
            paymentData={state.paymentData}
            isSubmitting={state.isSubmitting}
            onBack={handleBack}
            onSubmit={handleSubmit}
          />
        )}

        {state.currentStep === 4 && (
          <CompleteStep
            businessName={state.formData.businessName}
            submissionResult={state.submissionResult}
          />
        )}
      </div>
    </div>
  );
}
