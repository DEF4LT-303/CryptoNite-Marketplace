"use client";

import { currentUser } from "@/hooks/currentUser";

const Profile = () => {
  const user = currentUser();
  console.log(user);
  return <div>User: {user?.email}</div>;
};

export default Profile;
