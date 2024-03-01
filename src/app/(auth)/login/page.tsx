import LoginCard from "@/components/login-card";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        style={{
          backgroundImage: "url(/assets/abstract-bg.jpg)",
        }}
        className="absolute inset-0 z-[-1] bg-center bg-cover bg-no-repeat filter blur-[10px]"
      ></div>
      <LoginCard />
    </div>
  );
};

export default LoginPage;
