import AdminLoginForm from "@/components/auth/AdminLoginForm";
import AdminRegisterForm from "@/components/auth/AdminRegisterForm";
import UserLoginForm from "@/components/auth/UserLoginForm";

export default function AdminSignup() {
  return (
    <div className="w-full lg:w-[400px] bg-primary-foreground rounded-lg shadow-lg p-6  mx-auto">
      <div className="lg:px-10">
        <AdminRegisterForm />
      </div>
    </div>
  );
}
