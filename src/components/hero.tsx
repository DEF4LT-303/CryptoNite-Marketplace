import Link from "next/link";

import MaxWidthWrapper from "./max-width-wrapper";
import { Button, buttonVariants } from "./ui/button";

const HeroSection = () => {
  return (
    <div className="bg-background relative">
      <div className="w-full h-[500px] dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute bg-background pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <MaxWidthWrapper>
          <div className="relative px-6 py-16 mx-auto duration-1000 animate-in animate fade-in-5 slide-in-from-right-2.5 ">
            <div className="items-center lg:flex">
              <div className="w-full lg:w-1/2">
                <div className="lg:max-w-lg flex flex-col items-start justify-start">
                  <h1 className="text-2xl font-bold tracking-tight text-grey-900 sm:text-5xl">
                    Best place for <br /> high-quality{" "}
                    <span className="text-blue-500 ">Digital Assets</span>
                  </h1>

                  <p className="mt-6 text-lg max-w-prose text-muted-foreground">
                    Welcome to CryptoNite Virtual Assets. Every asset on our
                    platform is verified by our team to ensure our highest
                    quality standards.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <Link href="/products" className={buttonVariants()}>
                      Browse Trending
                    </Link>
                    <Button variant="ghost">Our Quality Promise &rarr;</Button>
                  </div>
                </div>
              </div>

              {/* <div className="">
              <GridGlobe />
            </div> */}
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </div>
  );
};

export default HeroSection;
