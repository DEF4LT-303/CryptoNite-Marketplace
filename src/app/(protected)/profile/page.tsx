"use client";

import { useCurrentUser } from "@/hooks/currentUser";

const Profile = () => {
  const user = useCurrentUser();
  console.log(user);
  return <div>User: {user?.email}</div>;
};

export default Profile;
