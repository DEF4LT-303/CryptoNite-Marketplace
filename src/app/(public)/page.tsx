import { auth } from "@/auth";
import HeroSection from "@/components/hero";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";

const perks = [
  {
    name: "Instant Delivery",
    Icon: ArrowDownToLine,
    description:
      "Get your assets delivered to your email in seconds and download them right away",
  },
  {
    name: "Guaranteed Quality",
    Icon: CheckCircle,
    description:
      "Every Assets in our platform is verified by our team to ensure our highest quality standards.",
  },
  {
    name: "For the planet",
    Icon: Leaf,
    description:
      "1% of the sales contributes to the preservation and restoration of the natural habitat.-",
  },
];

export default async function Home() {
  const session = await auth();
  const user = session ? true : false;

  return (
    <>
      <HeroSection user={user} />

      <section className="border-t border-gray-200 bg-background dark:bg-background">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                    {<perk.Icon className="w-1/3 h-1/3" />}
                  </div>
                </div>
                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-muted-foreground">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
