"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <section className="mx-10 px-20">
      <div className="min-h-screen mx-auto flex flex-col items-center justify-center md:justify-between md:flex-row gap-10">
        <div className="">
          <div className="flex-col items-center justify-center">
            <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
              404 ERROR
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
              Page not found
            </h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Sorry, the page you are looking for doesn't exist...
            </p>
          </div>

          <div className="flex items-center mt-6 gap-x-3">
            <button
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200  border rounded-lg gap-x-2 dark:hover:bg-gray-800  hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
              onClick={() => router.back()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span>Go back</span>
            </button>

            <button className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
              <Link href="/">Take me home</Link>
            </button>
          </div>
        </div>

        <div className="">
          <Image src="/svgs/404.svg" alt="Error 404" width={300} height={300} />
        </div>
      </div>
    </section>
  );
}
