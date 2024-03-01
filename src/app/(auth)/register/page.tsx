import RegisterCard from "@/components/register-card";

const RegistrationPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        style={{
          backgroundImage: "url(/assets/abstract-bg.jpg)",
        }}
        className="absolute inset-0 z-[-1] bg-center bg-cover bg-no-repeat filter blur-[10px]"
      ></div>
      <RegisterCard />
    </div>
  );
};

export default RegistrationPage;
