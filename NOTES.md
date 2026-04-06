# Component Structures

The app follows six components, each with their own responsibility. 'OnboardingForm' is the main working component, as it uses state and providers to keep track of succession and what is rejected. All other components are just UI, mainly for receiving data and calling callbacks.

The Six Structures, in order of the onboarding, are as follows:

- 'BusinessInfo': used as the first step, with its own local validation, such as valid emails, and handling special characters, since no other component needs to know about them.
- 'PaymentStep' and 'ReviewStep': Stateless, only using 'isSubmitting' in 'ReviewStep' to adjust the UI button to indicate submission progress
- 'CompleteStep': Mainly UI, will return a success or failure screen based on submissionResult
- ‘ProgressIndicator’: UI only, located in components/shared, which receives currentStep and totalSteps, which marks the final step as complete via ‘isFinalStepComplete’.
- 'OnboardingForm': Used as the main working component, as mentioned earlier

Strutured it so it follows the assignment instructions, in the order of onboarding:
- ‘BusinessInfo’ fills business information
- ‘PaymentStep’ takes simulated payment
- ‘ReviewStep’ to adjust UI and review all information provided
- ‘ProgressIndicator’ to show users what step they are on
- ‘CompleteStep’ shows succession
- ‘OnboardingForm’ main working component

# Form Flow, State & Providers

I want to highlight ‘OnboardingProvider’ in page.tsx. This wraps ‘OnboardingForm’ and makes the context available to everything inside it.

‘OnboardingContext’ contains 
- ‘currentStep’: Step in onboarding that is being shown, controls what component is happening in ‘OnboardingForm’
- ‘formData’: Holds the 4 required input fields from ‘BusinessInfo’ (Business name, owner, email, and address)
- ‘paymentData’: Hold payment details with ‘confirmed’, ‘method’, ‘amount’, and ‘currency’. ‘confirmed’ is what controls whether Continue buttonin ‘PaymentStep’ is disabled
- ‘isSubmitting’: used by ‘ReviewStep’ to disable submit button and indiciate visual loading
- ‘isRejected’: Tracks whether the last submission was rejected due to business name conflict. When true, ‘BusinessInfo’ shows the error and blocks the user from advancing
- ‘submissionResult’: Holds outcome of last submission, with a ‘success’ boolean or ‘error’ message. ‘CompleteStep’ uses this to decide determine what to show next

These are all the states that exist inside the context.

# Rejection flow

Conflicting business names are sourced from ‘mock-data.json’ via ‘mockData.conflictingNames’, making it easy to add multiple names that can trigger the rejection flow. “ABC Consulting”, and “Test” are included by default to demonstrate.

When a business submits a conflicting name, ‘isRejected’ is set to true, and ‘submissionResult’ is set with ‘success:false’, which prompts an error message. The user is sent back to ‘BusinessInfo’, step 1, while ‘formData’ and ‘paymentData’ states are preserved in ‘OnboardingContext’.

‘isRejected’ is passed to ‘BusinessInfo’, where it blocks users from advancing. While ‘isRejected’ is true, ‘businessNameError’ is derived, rather than local validation. ‘onRejectionAcknowledged’ is called as the user types a new business name, and sets ‘SET_REJECTED’ to false in order to clear it. In a real setting, conflicting names would come from API response, not locally.

# What is shown to user vs validate vs track internally and why

**Shown to the user:**
- Business Name
- Owner Name
- Owner Email
- Business Address
- All collected in ‘BusinessInfo’ and reviewed in ‘ReviewStep’
	- ‘ReviewStep’ displays payment amount, method, and confirmation as it is simulated
- On rejection, ‘BusinessInfo’ shows a UI indicating payment is already confirmed, since ‘paymentData’ is preserved

These are shown since user needs to input and verify what they entered. Everything is displayed again in ‘ReviewStep’, so the user can catch mistakes before finally registering.

**Not Shown:**
- ‘isRejected’, ‘currentStep’, ‘isSubmitting’ and ‘submissionResult’ never surfaced or shown

Internal mechanics, control how app works and not information user needs to see or act on.

**Validated:**
- All fields are required, such as
    - Email requiring standard format
    - Business name, owner name, and address reject special characters that wouldn't appear on legitimate Canadian business registrations
- Errors appear if user tries to continue without fulfilling all requirements

Minimum requirements for Canadian business registration. Blocking special characters and enforcing email format prevents any poor data from being submitted. Errors also show what needs to be validated before continuing.

**Tracked Internally:**
- 'isRejected' and 'currentStep' control navigation and error state without being shown to the user
- ‘isSubmitting’ disables submit button and updates UI
- ‘submissionResult’ drives success or failure UI in ‘CompleteStep’

Since each one drives the overall flow. ‘currentStep’ controls which component is rendered, ‘isRejected’ controls error state in ‘BusinessInfo’, ‘isSubmitting’ prevents double submissions, and ‘submissionResult’ determines what ‘CompleteStep’ shows. All of these are purely internal and does not need to be shown to user.

# What you'd improve on next time

- Connect rejections to real API that checks for name conflicts in government registry
- Loading state to show visual feedback on submissions or confirmations
- Expand address field into separate inputs (Address, city, province, postal code), more similar to registration forms and further validation

