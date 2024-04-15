"use client";

import { ProfileForm } from "@/components/forms/profile-form";
import { Separator } from "@/components/ui/separator";
import { useCurrentUser } from "@/hooks/currentUser";

const Profile = () => {
  const user = useCurrentUser();

  console.log("Client:", user);

  return (
    <div className="space-y-6 lg:max-w-2xl">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">Customize your profile.</p>
      </div>
      <Separator />
      <ProfileForm user={user} />
    </div>
  );
};

export default Profile;
