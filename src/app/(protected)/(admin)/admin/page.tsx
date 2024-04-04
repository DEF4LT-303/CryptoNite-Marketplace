import { RoleGate } from "@/components/role-gate";
import { UserRole } from "@prisma/client";

const AdminPage = () => {
  return (
    <div>
      <RoleGate allowedRole={UserRole.ADMIN}>AdminPage</RoleGate>
    </div>
  );
};

export default AdminPage;
