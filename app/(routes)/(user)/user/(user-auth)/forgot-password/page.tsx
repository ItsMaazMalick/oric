import UserVerifyEmail from "@/components/auth/forgotPassword/UserVerifyEmail";

export default function ForgotPassword() {
  return (
    <div className="w-full lg:w-[400px] bg-primary-foreground rounded-lg shadow-lg p-6  mx-auto">
      <div className="lg:px-10">
        <UserVerifyEmail />
      </div>
    </div>
  );
}
