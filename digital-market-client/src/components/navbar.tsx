"use client";

import Link from "next/link";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ShoppingCart, User } from "lucide-react";
import { useState } from "react";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "",
    description:
      "For sighted users to preview content available behind a link.",
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = false;

  return (
    <>
      <div className="bg-background dark:bg-background">
        <nav className="relative bg-background dark:bg-background">
          <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
            <div className="flex items-center justify-between">
              <Link href="#">
                <img
                  className="w-auto h-6 sm:h-7"
                  src="https://merakiui.com/images/full-logo.svg"
                  alt=""
                />
              </Link>

              <div className="flex md:hidden">
                <div className="flex flex-col md:flex-row md:mx-6 md:hidden">
                  <Sheet>
                    <SheetTrigger>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 8h16M4 16h16"
                        />
                      </svg>
                    </SheetTrigger>
                    <SheetContent side={"left"}>
                      <SheetHeader>
                        <SheetTitle>
                          <span className="text-blue-500 ">Digital Assets</span>{" "}
                          Store
                        </SheetTitle>
                      </SheetHeader>

                      <div className="flex flex-col md:flex-row md:mx-6">
                        <Link
                          className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                          href="/"
                        >
                          Home
                        </Link>
                        <Link
                          className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                          href="#"
                        >
                          Shop
                        </Link>
                        <Link
                          className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                          href="#"
                        >
                          Contact
                        </Link>
                        <Link
                          className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                          href="#"
                        >
                          About
                        </Link>
                        {user ? (
                          <>
                            <Link
                              className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                              href=""
                            >
                              Login
                            </Link>
                            <Link
                              className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                              href="/register"
                            >
                              Sign Up
                            </Link>
                          </>
                        ) : (
                          <div></div>
                        )}
                      </div>

                      <div className="flex justify-center md:block my-10">
                        <Link
                          className="relative text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300"
                          href="/cart"
                        >
                          <ShoppingCart />
                        </Link>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </div>

            <div
              className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-900 ${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "opacity-0 -translate-x-full"
              } md:bg-transparent md:dark:bg-transparent md:mt-0 md:p-0 md:top-0 md:relative md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center`}
            >
              <div className="flex-row md:flex-row md:mx-6 hidden md:block">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          Home
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
                      <NavigationMenuContent className="">
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {components.map((component) => (
                            <ListItem
                              key={component.title}
                              title={component.title}
                              href={component.href}
                            >
                              {component.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          Contact
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>

                    {!user ? (
                      <>
                        <span
                          className="h-6 w-px bg-gray-200"
                          aria-hidden="true"
                        />
                        <NavigationMenuItem>
                          <Link href="/login" legacyBehavior passHref>
                            <NavigationMenuLink
                              className={navigationMenuTriggerStyle()}
                            >
                              Login
                            </NavigationMenuLink>
                          </Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                          <Link href="/register" legacyBehavior passHref>
                            <NavigationMenuLink
                              className={navigationMenuTriggerStyle()}
                            >
                              Sign Up
                            </NavigationMenuLink>
                          </Link>
                        </NavigationMenuItem>

                        <span
                          className="h-6 w-px bg-gray-200"
                          aria-hidden="true"
                        />
                      </>
                    ) : (
                      <>
                        <span
                          className="h-6 w-px bg-gray-200"
                          aria-hidden="true"
                        />
                        <NavigationMenuItem>
                          <Link href="/profile" legacyBehavior passHref>
                            <NavigationMenuLink
                              className={navigationMenuTriggerStyle()}
                            >
                              <User />
                            </NavigationMenuLink>
                          </Link>
                        </NavigationMenuItem>
                      </>
                    )}

                    <NavigationMenuItem>
                      <Link href="/cart" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          <ShoppingCart />
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
