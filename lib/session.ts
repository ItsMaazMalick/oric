import { cookies } from "next/headers";

export const getUserSession = async () => {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("auth-token")?.value || "";
  // Make a fetch request to your API route
  try {
    const res = await fetch(`${process.env.PUBLIC_URL}/api/user/middleware`, {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userCookie}`,
      },
    });
    const data = await res.json();
    if (!data.success) {
      return null;
    }
    return data;
  } catch (error) {
    return null;
  }
};
