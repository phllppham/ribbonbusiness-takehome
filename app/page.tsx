import OnboardingForm from "../components/features/onboarding/OnboardingForm";
import { OnboardingProvider } from "../contexts/OnboardingContext";

export default function Home() {
  return (
    <OnboardingProvider>
      <OnboardingForm />
    </OnboardingProvider>
  );
}
