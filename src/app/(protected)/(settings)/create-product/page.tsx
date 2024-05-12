import { RoleGate } from "@/components/auth/role-gate";
import { UserRole } from "@prisma/client";

const CreateProductPage = () => {
  return <RoleGate allowedRole={UserRole.ADMIN}>Create</RoleGate>;
};

export default CreateProductPage;
