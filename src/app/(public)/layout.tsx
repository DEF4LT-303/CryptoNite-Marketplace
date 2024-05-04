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
    <section>
      <Navbar user={session} />
      {children}
      <Footer />
    </section>
  );
}
