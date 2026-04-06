"use client";

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { OnboardingState, FormData, PaymentData, SubmissionResult } from '../types';

type OnboardingAction =
  | { type: 'UPDATE_FORM_DATA'; payload: Partial<FormData> }
  | { type: 'UPDATE_PAYMENT_DATA'; payload: Partial<PaymentData> }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_REJECTED'; payload: boolean }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'SET_SUBMISSION_RESULT'; payload: SubmissionResult };

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

    default:
      return state;
  }
}

interface OnboardingContextType {
  state: OnboardingState;
  actions: {
    updateFormData: (updates: Partial<FormData>) => void;
    updatePaymentData: (updates: Partial<PaymentData>) => void;
    setStep: (step: number) => void;
    goToPreviousStep: () => void;
    setRejected: (rejected: boolean) => void;
    setSubmitting: (submitting: boolean) => void;
    setSubmissionResult: (result: SubmissionResult) => void;
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

  };

  return (
    <OnboardingContext.Provider value={{ state, actions }}>
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