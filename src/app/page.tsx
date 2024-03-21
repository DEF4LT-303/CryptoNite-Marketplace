import { auth, signOut } from "@/auth";
import HeroSection from "@/components/hero";
import Navbar from "@/components/navbar";
import Navbar2 from "@/components/navbar2";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth();
  const user = session ? true : false;

  return (
    <div>
      {/* <Navbar user={user} /> */}
      <HeroSection user={user} />
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <Button>Sign Out</Button>
      </form>
    </div>
  );
}
