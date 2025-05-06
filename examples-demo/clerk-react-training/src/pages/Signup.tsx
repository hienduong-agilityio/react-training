import { SignUp } from "@clerk/clerk-react";

export default function Signup() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <SignUp signInUrl="/login" forceRedirectUrl={"/dashboard"} />
    </div>
  );
}
