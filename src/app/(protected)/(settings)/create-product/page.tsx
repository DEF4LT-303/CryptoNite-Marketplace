import { RoleGate } from "@/components/auth/role-gate";
import { CreateProductForm } from "@/components/forms/create-product-form";
import { UserRole } from "@prisma/client";

const CreateProductPage = () => {
  return (
    <RoleGate allowedRole={UserRole.ADMIN}>
      <CreateProductForm />
    </RoleGate>
  );
};

export default CreateProductPage;
