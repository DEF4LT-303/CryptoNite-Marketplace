import { auth } from "@/auth";
import Footer from "@/components/footer";
import Navbar from "@/components/navigation/navbar";

export default async function GeneralLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <section className="relative flex flex-col min-h-screen">
      <Navbar user={session} />
      <div className="flex-grow flex-1">{children}</div>
      <Footer />
    </section>
  );
}
