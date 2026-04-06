export interface FormData {
  businessName: string;
  ownerName: string;
  email: string;
  address: string;
}

export interface PaymentData {
  amount: number;
  currency: string;
  method: 'card' | 'bank' | null;
  confirmed: boolean;
}

export interface FieldErrors {
  businessName: string;
  ownerName: string;
  email: string;
  address: string;
}

export interface SubmissionResult {
  success: boolean;
  error?: string;
}

export interface OnboardingState {
  currentStep: number;
  formData: FormData;
  paymentData: PaymentData;
  isRejected: boolean;
  isSubmitting: boolean;
  submissionResult?: SubmissionResult;
}

export interface BusinessInfoProps {
  formData: FormData;
  isRejected: boolean;
  paymentConfirmed: boolean;
  onFormDataChange: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onRejectionAcknowledged: () => void;
}

export interface PaymentStepProps {
  paymentData: PaymentData;
  onPaymentDataChange: (updates: Partial<PaymentData>) => void;
  onBack?: () => void;
  onNext: () => void;
}

export interface ReviewStepProps {
  formData: FormData;
  paymentData: PaymentData;
  isSubmitting: boolean;
  onBack?: () => void;
  onSubmit: () => Promise<void>;
}

export interface CompleteStepProps {
  businessName: string;
  submissionResult?: SubmissionResult;
}
