"use client";

import { useState } from "react";
import { FormData, FieldErrors, BusinessInfoProps } from "../../../types";

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateFields(formData: FormData): FieldErrors {
  const businessNameValue = formData.businessName.trim();
  const ownerNameValue = formData.ownerName.trim();
  const addressValue = formData.address.trim();

  let businessName = "";
  if (!businessNameValue) {
    businessName = "Business name is required";
  } else if (!/^[a-zA-Z0-9 '.\-]+$/.test(businessNameValue)) {
    businessName = "Business name cannot contain special characters";
  }

  let ownerName = "";
  if (!ownerNameValue) {
    ownerName = "Owner full name is required";
  } else if (!/^[a-zA-Z '-]+$/.test(ownerNameValue)) {
    ownerName = "Owner name cannot contain special characters";
  }

  let address = "";
  if (!addressValue) {
    address = "Business address is required";
  } else if (!/^[a-zA-Z0-9 ,.\-#]+$/.test(addressValue)) {
    address = "Address cannot contain special characters";
  }

  const email = !formData.email.trim()
    ? "Email is required"
    : !validateEmail(formData.email)
    ? "Enter a valid email address"
    : "";

  return { businessName, ownerName, email, address };
}

const emptyErrors: FieldErrors = {
  businessName: "",
  ownerName: "",
  email: "",
  address: "",
};

export default function BusinessInfo({
  formData,
  isRejected,
  paymentConfirmed,
  onFormDataChange,
  onNext,
  onRejectionAcknowledged,
}: BusinessInfoProps) {
  const [errors, setErrors] = useState<FieldErrors>(emptyErrors);

  const businessNameError = isRejected
    ? "This name is already taken. Please choose a different business name"
    : errors.businessName;

  function handleAdvance() {
    const validationErrors = validateFields(formData);
    if (isRejected) {
      validationErrors.businessName =
        "This name is already taken. Please choose a different business name";
    }
    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== ""
    );
    if (!hasErrors) {
      onNext();
    }
  }

  function handleBusinessNameChange(value: string) {
    onFormDataChange({ businessName: value });
    if (isRejected) {
      onRejectionAcknowledged();
      setErrors((prev) => ({ ...prev, businessName: "" }));
    }
  }

  const inputBase = "h-10 px-3 border rounded-md text-sm text-gray-900 bg-white outline-none transition-colors duration-150 font-[inherit] w-full focus:border-[#1b2a6b] focus:shadow-[0_0_0_3px_rgba(27,42,107,0.1)]";
  const inputError = "border-red-600 focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)]";
  const inputNormal = "border-gray-300";

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8">
      <h2 className="mb-1.5 text-xl font-semibold text-gray-900">Business Information</h2>
      <p className="mb-7 text-sm text-gray-500">
        Let&apos;s get started by telling us about your business.
      </p>

      {paymentConfirmed && (
        <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-center gap-2">
            <span className="text-sm">✓</span>
            <span className="text-sm font-medium text-green-800">Payment already confirmed</span>
          </div>
          <p className="text-xs text-green-700 mt-1">
            You&apos;ll skip the payment step and proceed directly to review.
          </p>
        </div>
      )}

      <div className="flex flex-col mb-5">
        <label htmlFor="businessName" className="text-sm font-medium text-gray-700 mb-1.5">
          Business Name
        </label>
        <input
          id="businessName"
          type="text"
          value={formData.businessName}
          onChange={(e) => handleBusinessNameChange(e.target.value)}
          className={`${inputBase} ${businessNameError ? inputError : inputNormal}`}
          placeholder="e.g. Tree Services Inc."
        />
        {businessNameError && (
          <span className="mt-1 text-[13px] text-red-600">{businessNameError}</span>
        )}
      </div>

      <div className="flex flex-col mb-5">
        <label htmlFor="ownerName" className="text-sm font-medium text-gray-700 mb-1.5">
          Owner Full Name
        </label>
        <input
          id="ownerName"
          type="text"
          value={formData.ownerName}
          onChange={(e) => onFormDataChange({ ownerName: e.target.value })}
          className={`${inputBase} ${errors.ownerName ? inputError : inputNormal}`}
          placeholder="e.g. First Last"
        />
        {errors.ownerName && (
          <span className="mt-1 text-[13px] text-red-600">{errors.ownerName}</span>
        )}
      </div>

      <div className="flex flex-col mb-5">
        <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1.5">
          Owner Email
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => onFormDataChange({ email: e.target.value })}
          className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
          placeholder="e.g. yourname@example.com"
        />
        {errors.email && (
          <span className="mt-1 text-[13px] text-red-600">{errors.email}</span>
        )}
      </div>

      <div className="flex flex-col mb-5">
        <label htmlFor="address" className="text-sm font-medium text-gray-700 mb-1.5">
          Business Address
        </label>
        <input
          id="address"
          type="text"
          value={formData.address}
          onChange={(e) => onFormDataChange({ address: e.target.value })}
          className={`${inputBase} ${errors.address ? inputError : inputNormal}`}
          placeholder="e.g. 100 King St W, Toronto, ON M5K 2A1"
        />
        {errors.address && (
          <span className="mt-1 text-[13px] text-red-600">{errors.address}</span>
        )}
      </div>

      <button
        className="mt-2 w-full h-[42px] bg-[#1b2a6b] text-white border-none rounded-md text-[15px] font-medium cursor-pointer font-[inherit] hover:bg-[#15235a]"
        onClick={handleAdvance}
      >
        Continue
      </button>
    </div>
  );
}
