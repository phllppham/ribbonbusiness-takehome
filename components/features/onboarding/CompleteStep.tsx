interface CompleteStepProps {
  businessName: string;
}

export default function CompleteStep({ businessName }: CompleteStepProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-8 py-10 text-center">
      <div className="w-14 h-14 rounded-full bg-[#1b2a6b] flex items-center justify-center mx-auto mb-5">
        <span className="text-[22px] text-white leading-none">✓</span>
      </div>
      <h2 className="mb-3 text-[22px] font-semibold text-gray-900">Registration Complete</h2>
      <p className="mb-6 text-[15px] text-gray-700 leading-relaxed">
        <strong>{businessName}</strong> has been successfully registered in Canada!
        Thank you for registering your business, you will receive a confirmation email shortly.
      </p>
      <div className="bg-gray-50 border border-gray-200 rounded-md px-5 py-4 text-left">
        <p className="m-0 text-[13px] text-gray-500 leading-relaxed">
          Your business is now officially on record. You will receive your registration number via email shortly.
        </p>
      </div>
    </div>
  );
}
