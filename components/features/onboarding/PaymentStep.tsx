interface PaymentStepProps {
    paymentConfirmed: boolean;
    onPaymentConfirmed: () => void;
    onBack?: () => void;
    onNext: () => void;
  }
  
  export default function PaymentStep({
    paymentConfirmed,
    onPaymentConfirmed,
    onBack,
    onNext,
  }: PaymentStepProps) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <button
          className="inline-block mb-4 p-0 bg-none border-none text-sm text-gray-700 cursor-pointer font-[inherit] hover:text-gray-900"
          onClick={onBack}
        >
          ← Back
        </button>
        <h2 className="mb-1.5 text-xl font-semibold text-gray-900">Payment</h2>
        <p className="mb-6 text-sm text-gray-500">
          A one-time registration fee is required to complete your registration.
        </p>
  
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">Business Registration</span>
            <span className="text-sm text-gray-700">$50.00</span>
          </div>
          <div className="h-px bg-gray-200 my-3" />
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-900">Total</span>
            <span className="text-[15px] font-semibold text-gray-900">$50.00</span>
          </div>
        </div>
  
        {paymentConfirmed ? (
          <div className="flex items-center gap-2 h-[42px] px-3.5 bg-green-50 border border-green-200 rounded-md text-sm font-medium text-green-700 mb-3">
            <span className="text-[15px]">✓</span>
            Payment confirmed
          </div>
        ) : (
          <button
            className="w-full h-[42px] bg-[#1b2a6b] text-white border-none rounded-md text-[15px] font-medium cursor-pointer font-[inherit] mb-3 hover:bg-[#15235a]"
            onClick={onPaymentConfirmed}
          >
            Confirm Payment ($50)
          </button>
        )}
  
        <button
          className="w-full h-[42px] bg-[#1b2a6b] text-white border-none rounded-md text-[15px] font-medium font-[inherit] enabled:cursor-pointer hover:enabled:bg-[#15235a] disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={onNext}
          disabled={!paymentConfirmed}
        >
          Continue
        </button>
      </div>
    );
  }
  