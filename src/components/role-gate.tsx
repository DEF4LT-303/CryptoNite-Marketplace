"use client";

import { useCurrentRole } from "@/hooks/currentRole";
import { useRouter } from "next/navigation";
import { FormError } from "./form-message";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: string;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();
  const router = useRouter();

  if (role !== allowedRole) {
    return <FormError message="You are not authorized to view this page" />;
  }

  return <>{children}</>;
};
