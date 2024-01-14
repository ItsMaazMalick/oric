import { getUser } from "@/app/actions/user/auth";
import EditUserProfileForm from "@/components/auth/EditUserProfileForm";
import BackButton from "@/components/button/BackButton";
import { cookies } from "next/headers";

const EditProfile = async () => {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("auth-token")?.value || "";
  const user = await getUser(userCookie);
  return (
    <div className="w-full text-primary mb-4">
      {/* <EditUserProfile /> */}
      {/* TOP HEADER */}
      <div className="mt-4 ml-4">
        <BackButton />
      </div>
      {/* DATA */}
      <EditUserProfileForm user={user} />
    </div>
  );
};

export default EditProfile;
