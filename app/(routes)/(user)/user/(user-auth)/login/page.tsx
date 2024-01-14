import UserLoginForm from "@/components/auth/UserLoginForm";

const LoginPage = ({
  searchParams,
}: {
  searchParams: { register: string };
}) => {
  return (
    <div className="w-full lg:w-[400px] bg-primary-foreground rounded-lg shadow-lg p-6 mx-auto">
      <div className="lg:px-10">
        <UserLoginForm register={searchParams?.register} />
      </div>
    </div>
  );
};

export default LoginPage;
