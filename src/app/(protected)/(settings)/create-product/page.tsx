import { RoleGate } from "@/components/auth/role-gate";
import { CreateProductForm } from "@/components/forms/create-product-form";
import { Separator } from "@/components/ui/separator";
import { UserRole } from "@prisma/client";

const CreateProductPage = () => {
  return (
    <RoleGate allowedRole={UserRole.ADMIN}>
      <div className="space-y-6 lg:max-w-2xl">
        <div>
          <h3 className="text-lg font-medium">Product Creation</h3>
          <p className="text-sm text-muted-foreground">
            Fill the form to create a product.
          </p>
        </div>
        <Separator />
        <CreateProductForm />
      </div>
    </RoleGate>
  );
};

export default CreateProductPage;
