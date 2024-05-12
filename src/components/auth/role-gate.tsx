"use client";

import { useCurrentRole } from "@/hooks/currentRole";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: string;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();
  const router = useRouter();

  useEffect(() => {
    if (role !== allowedRole) {
      router.push("/");
    }
  }, [role, allowedRole, router]);

  if (role !== allowedRole) {
    return;
  }

  return <>{children}</>;
};
