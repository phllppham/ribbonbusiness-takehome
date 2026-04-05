"use client";

import { ReviewStepProps } from "../../../types";

export default function ReviewStep({
  formData,
  paymentData,
  isSubmitting,
  onBack,
  onSubmit
}: ReviewStepProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8">
      <button
        className="inline-block mb-4 p-0 bg-none border-none text-sm text-gray-700 cursor-pointer font-[inherit] hover:text-gray-900"
        onClick={onBack}
      >
        ← Back
      </button>
      <h2 className="mb-1.5 text-xl font-semibold text-gray-900">Review & Submit</h2>
      <p className="mb-6 text-sm text-gray-500">
        Please confirm your details before submitting.
      </p>

      <div className="bg-gray-50 border border-gray-200 rounded-md p-5 mb-6">
        <div className="pb-1">
          <h3 className="mb-3.5 text-[13px] font-semibold uppercase tracking-wide text-gray-500">Business Details</h3>
          <div className="flex justify-between items-start gap-4 mb-2.5">
            <span className="text-sm text-gray-500 shrink-0 min-w-[100px]">Business Name</span>
            <span className="text-sm text-gray-900 text-right">{formData.businessName}</span>
          </div>
          <div className="flex justify-between items-start gap-4 mb-2.5">
            <span className="text-sm text-gray-500 shrink-0 min-w-[100px]">Owner Name</span>
            <span className="text-sm text-gray-900 text-right">{formData.ownerName}</span>
          </div>
          <div className="flex justify-between items-start gap-4 mb-2.5">
            <span className="text-sm text-gray-500 shrink-0 min-w-[100px]">Email</span>
            <span className="text-sm text-gray-900 text-right">{formData.email}</span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-sm text-gray-500 shrink-0 min-w-[100px]">Address</span>
            <span className="text-sm text-gray-900 text-right">{formData.address}</span>
          </div>
        </div>

        <div className="h-px bg-gray-200 my-4" />

        <div className="pb-1">
          <h3 className="mb-3.5 text-[13px] font-semibold uppercase tracking-wide text-gray-500">Payment</h3>
          <div className="flex justify-between items-start gap-4 mb-2.5">
            <span className="text-sm text-gray-500 shrink-0 min-w-[100px]">Amount</span>
            <span className="text-sm text-gray-900 text-right">${paymentData.amount}.00 {paymentData.currency}</span>
          </div>
          <div className="flex justify-between items-start gap-4 mb-2.5">
            <span className="text-sm text-gray-500 shrink-0 min-w-[100px]">Method</span>
            <span className="text-sm text-gray-900 text-right capitalize">{paymentData.method || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-sm text-gray-500 shrink-0 min-w-[100px]">Status</span>
            <span className="flex items-center gap-1.5 text-sm font-medium text-green-700">
              <span className="text-sm">✓</span> Payment confirmed
            </span>
          </div>
        </div>
      </div>

      <button
        className="w-full h-[42px] bg-[#1b2a6b] text-white border-none rounded-md text-[15px] font-medium font-[inherit] enabled:cursor-pointer hover:enabled:bg-[#15235a] disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={onSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting…" : "Submit Registration"}
      </button>
    </div>
  );
}
