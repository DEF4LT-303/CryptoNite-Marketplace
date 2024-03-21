"use client";

import Link from "next/link";

import { useState } from "react";
import { Button } from "./ui/button";

interface HeroSectionProps {
  user: boolean;
}

const HeroSection = ({ user }: HeroSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="bg-background dark:bg-background">
        <div className="container px-6 py-16 mx-auto">
          <div className="items-center lg:flex">
            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-lg flex flex-col items-start justify-start">
                <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
                  Best place to choose <br /> your{" "}
                  <span className="text-blue-500 ">Digital Assets</span>
                </h1>

                <p className="mt-3 text-gray-600 dark:text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Porro beatae error laborum ab amet sunt recusandae? Reiciendis
                  natus perspiciatis optio.
                </p>

                {!user && (
                  <div className="flex flex-row gap-4 my-5 justify-center">
                    <Button asChild>
                      <Link href="/auth/login">Login</Link>
                    </Button>
                    <Button variant="secondary" asChild>
                      <Link href="/auth/register">Register</Link>
                    </Button>
                  </div>
                )}
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
    </>
  );
};

export default HeroSection;
