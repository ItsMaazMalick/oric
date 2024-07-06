import AdminLoginForm from "@/components/auth/AdminLoginForm";
import UserLoginForm from "@/components/auth/UserLoginForm";

export default function AdminLogin() {
  return (
    <div className="w-full lg:w-[400px] bg-primary-foreground rounded-lg shadow-lg p-6  mx-auto">
      <div className="lg:px-10">
        <AdminLoginForm />
      </div>
    </div>
  );
}
