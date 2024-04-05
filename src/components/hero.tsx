"use client";

import Link from "next/link";

import { useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "./ui/button";

interface HeroSectionProps {
  user: boolean;
}

const HeroSection = ({ user }: HeroSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MaxWidthWrapper>
      <div className="bg-background dark:bg-background">
        <div className="container px-6 py-16 mx-auto">
          <div className="items-center lg:flex">
            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-lg flex flex-col items-start justify-start">
                <h1 className="text-2xl font-bold tracking-tight text-grey-900 sm:text-5xl">
                  Best place for <br /> high-quality{" "}
                  <span className="text-blue-500 ">Digital Assets</span>
                </h1>

                <p className="mt-6 text-lg max-w-prose text-muted-foreground">
                  Welcome to virtual$ets. Every asset on our platform is
                  verified by our team to ensure our highest quality standards.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Link href="/products" className={buttonVariants()}>
                    Browse Trending
                  </Link>
                  <Button variant="ghost">Our Quality Promise &rarr;</Button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
              <img
                className="w-full h-full lg:max-w-3xl"
                src="https://merakiui.com/images/components/Catalogue-pana.svg"
                alt="Catalogue-pana.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default HeroSection;
