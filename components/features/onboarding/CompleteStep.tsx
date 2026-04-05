"use client";

import { CompleteStepProps } from "../../../types";

export default function CompleteStep({ businessName, submissionResult }: CompleteStepProps) {
  const isSuccess = submissionResult?.success;

  return (
    <div className="bg-white border border-gray-200 rounded-lg px-8 py-10 text-center">
      <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 ${
        isSuccess ? 'bg-[#1b2a6b]' : 'bg-red-600'
      }`}>
        <span className="text-[22px] text-white leading-none">
          {isSuccess ? '✓' : '✕'}
        </span>
      </div>

      <h2 className="mb-3 text-[22px] font-semibold text-gray-900">
        {isSuccess ? 'Registration Complete' : 'Registration Failed'}
      </h2>

      <p className="mb-6 text-[15px] text-gray-700 leading-relaxed">
        {isSuccess ? (
          <>
            <strong>{businessName}</strong> has been successfully registered in Canada!
            Thank you for registering your business, you will receive a confirmation email shortly.
          </>
        ) : (
          <>
            Unfortunately, we were unable to register <strong>{businessName}</strong>.
            {submissionResult?.error && (
              <span className="block mt-2 text-red-600 font-medium">
                {submissionResult.error}
              </span>
            )}
          </>
        )}
      </p>

      <div className="bg-gray-50 border border-gray-200 rounded-md px-5 py-4 text-left">
        {isSuccess ? (
          <p className="m-0 text-[13px] text-gray-500 leading-relaxed">
            Your business is now officially on record. You will receive a confirmation email shortly.
          </p>
        ) : (
          <p className="m-0 text-[13px] text-gray-500 leading-relaxed">
            Please try again with different information or contact support if the problem persists.
          </p>
        )}
      </div>
    </div>
  );
}
