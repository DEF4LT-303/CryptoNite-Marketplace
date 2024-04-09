"use client";

import { ProfileForm } from "@/components/profile-form";
import { Separator } from "@/components/ui/separator";
import { useCurrentUser } from "@/hooks/currentUser";

const Profile = () => {
  const user = useCurrentUser();
  console.log(user);
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">Customize your profile.</p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
};

export default Profile;
