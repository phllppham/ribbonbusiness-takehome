"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { OnboardingState, FormData, PaymentData, SubmissionResult } from '../types';

type OnboardingAction =
  | { type: 'UPDATE_FORM_DATA'; payload: Partial<FormData> }
  | { type: 'UPDATE_PAYMENT_DATA'; payload: Partial<PaymentData> }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_REJECTED'; payload: boolean }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'SET_SUBMISSION_RESULT'; payload: SubmissionResult }
  | { type: 'RESET_FORM' };

const initialPaymentData: PaymentData = {
  amount: 50,
  currency: 'USD',
  method: null,
  confirmed: false,
};

const initialFormData: FormData = {
  businessName: '',
  ownerName: '',
  email: '',
  address: '',
};

const initialState: OnboardingState = {
  currentStep: 1,
  formData: initialFormData,
  paymentData: initialPaymentData,
  isRejected: false,
  isSubmitting: false,
};

function onboardingReducer(state: OnboardingState, action: OnboardingAction): OnboardingState {
  switch (action.type) {
    case 'UPDATE_FORM_DATA':
      return {
        ...state,
        formData: { ...state.formData, ...action.payload },
      };

    case 'UPDATE_PAYMENT_DATA':
      return {
        ...state,
        paymentData: { ...state.paymentData, ...action.payload },
      };

    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.payload,
      };

    case 'SET_REJECTED':
      return {
        ...state,
        isRejected: action.payload,
      };

    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.payload,
      };

    case 'SET_SUBMISSION_RESULT':
      return {
        ...state,
        submissionResult: action.payload,
      };

    case 'RESET_FORM':
      return initialState;

    default:
      return state;
  }
}

interface OnboardingContextType {
  state: OnboardingState;
  dispatch: React.Dispatch<OnboardingAction>;
  actions: {
    updateFormData: (updates: Partial<FormData>) => void;
    updatePaymentData: (updates: Partial<PaymentData>) => void;
    setStep: (step: number) => void;
    goToNextStep: () => void;
    goToPreviousStep: () => void;
    setRejected: (rejected: boolean) => void;
    setSubmitting: (submitting: boolean) => void;
    setSubmissionResult: (result: SubmissionResult) => void;
    resetForm: () => void;
  };
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);

  const actions = {
    updateFormData: (updates: Partial<FormData>) => {
      dispatch({ type: 'UPDATE_FORM_DATA', payload: updates });
    },

    updatePaymentData: (updates: Partial<PaymentData>) => {
      dispatch({ type: 'UPDATE_PAYMENT_DATA', payload: updates });
    },

    setStep: (step: number) => {
      dispatch({ type: 'SET_STEP', payload: step });
    },

    goToNextStep: () => {
      dispatch({ type: 'SET_STEP', payload: state.currentStep + 1 });
    },

    goToPreviousStep: () => {
      dispatch({ type: 'SET_STEP', payload: state.currentStep - 1 });
    },

    setRejected: (rejected: boolean) => {
      dispatch({ type: 'SET_REJECTED', payload: rejected });
    },

    setSubmitting: (submitting: boolean) => {
      dispatch({ type: 'SET_SUBMITTING', payload: submitting });
    },

    setSubmissionResult: (result: SubmissionResult) => {
      dispatch({ type: 'SET_SUBMISSION_RESULT', payload: result });
    },

    resetForm: () => {
      dispatch({ type: 'RESET_FORM' });
    },
  };

  return (
    <OnboardingContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}