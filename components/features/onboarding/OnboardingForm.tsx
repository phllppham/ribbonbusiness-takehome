"use client";

import { useState } from "react";
import ProgressIndicator from "../../shared/ProgressIndicator";
import BusinessInfo from "./BusinessInfo";
import PaymentStep from "./PaymentStep";
import ReviewStep from "./ReviewStep";
import CompleteStep from "./CompleteStep";

export interface FormData {
  businessName: string;
  ownerName: string;
  email: string;
  address: string;
}

interface OnboardingState {
  currentStep: number;
  formData: FormData;
  paymentConfirmed: boolean;
}

const TOTAL_STEPS = 4;

const initialFormData: FormData = {
  businessName: "",
  ownerName: "",
  email: "",
  address: "",
};

export default function OnboardingForm() {
  const [state, setState] = useState<OnboardingState>({
    currentStep: 1,
    formData: initialFormData,
    paymentConfirmed: false,
  });

  function handleFormDataChange(updates: Partial<FormData>) {
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, ...updates },
    }));
  }

  function handleAdvanceToStep(step: number) {
    setState((prev) => ({ ...prev, currentStep: step }));
  }

  const handleBack = () =>
    setState((prev) => ({ ...prev, currentStep: prev.currentStep - 1 }));

  function handlePaymentConfirmed() {
    setState((prev) => ({ ...prev, paymentConfirmed: true }));
  }

  async function handleSubmit(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        setState((prev) => ({ ...prev, currentStep: 4 }));
        resolve();
      }, 1500);
    });
  }

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
            onFormDataChange={handleFormDataChange}
            onNext={() => handleAdvanceToStep(2)}
          />
        )}
        {state.currentStep === 2 && (
          <PaymentStep
            paymentConfirmed={state.paymentConfirmed}
            onPaymentConfirmed={handlePaymentConfirmed}
            onBack={handleBack}
            onNext={() => handleAdvanceToStep(3)}
          />
        )}
        {state.currentStep === 3 && (
          <ReviewStep
            formData={state.formData}
            onBack={handleBack}
            onSubmit={handleSubmit}
          />
        )}
        {state.currentStep === 4 && (
          <CompleteStep businessName={state.formData.businessName} />
        )}
      </div>
    </div>
  );
}
