"use client";

import Link from "next/link";

import NavItems from "@/components/navigation/navItems";
import UserButton from "@/components/user-button";
import Image from "next/image";
import Cart from "../cart/cart";
import MaxWidthWrapper from "../max-width-wrapper";
import { ToggleTheme } from "../settings/ToggleTheme";
import { buttonVariants } from "../ui/button";
import MobileNav from "./mobile-nav";

const Navbar = ({ user }: any) => {
  return (
    <div className="bg-background sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-background">
        <MaxWidthWrapper>
          <div className="border-b border-gray-500">
            <div className="flex h-16 items-center">
              <MobileNav />
              <div className="ml-4 lg:ml-0">
                <Link href="/" className="flex justify-start items-center">
                  <Image
                    src="/svgs/logo.svg"
                    alt="Crypto Nite Logo"
                    width={55}
                    height={55}
                  />
                  <h2 className="text-blue-500 text-2xl font-semibold">
                    Crypto
                    <span className="text-emerald-500 dark:text-emerald-300">
                      Nite
                    </span>
                  </h2>
                </Link>
              </div>

              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>

              <div className="ml-auto flex items-center gap-5">
                <>
                  <div className="hidden sm:block">
                    <ToggleTheme />
                  </div>
                  <span
                    className="h-6 w-px bg-gray-500 hidden sm:block"
                    aria-hidden="true"
                  />
                </>
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? null : (
                    <Link
                      href="/auth/login"
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Sign in
                    </Link>
                  )}
                  {user ? null : (
                    <span className="h-6 w-px bg-gray-500" aria-hidden="true" />
                  )}
                  {user ? (
                    <div>
                      <Link href="/profile" legacyBehavior passHref>
                        <UserButton />
                      </Link>
                    </div>
                  ) : (
                    <Link
                      href="/auth/register"
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Create Account
                    </Link>
                  )}
                  {user ? (
                    <span className="h-6 w-px bg-gray-500" aria-hidden="true" />
                  ) : null}
                  {user ? null : (
                    <div className="flex lg:ml-6">
                      <span
                        className="h-6 w-px bg-gray-500"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                  <div className="ml-4 flow-root lg:ml-6">
                    <Cart />
                  </div>
                </div>
                <div className="lg:hidden">
                  <div className="flex gap-5 mr-2">
                    {user && (
                      <>
                        <div>
                          <UserButton />
                        </div>
                        <span
                          className="h-6 w-px bg-gray-500"
                          aria-hidden="true"
                        />
                      </>
                    )}
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
