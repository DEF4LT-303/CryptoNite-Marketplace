"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormError, FormSuccess } from "../forms/form-message";
import Social from "../social";

const RegisterCard = () => {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [pending, setPending] = useState<boolean>(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      setPending(true);
      setError("");
      setSuccess("");
      axios
        .post("/api/register", data)
        .then(({ data }) => {
          if (data.success) {
            form.reset();
            setSuccess(data.success);
          } else {
            form.reset();
            setError(data.error);
          }
          setPending(false);
        })
        .catch((error) => {
          setError("An unknown error occured!");
          setPending(false);
        });
    });
  };

  return (
    <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
      <div
        className="hidden bg-cover lg:block lg:w-1/2"
        style={{
          backgroundImage: `url('/images/abstract-bg.jpg')`,
        }}
      ></div>

      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <div className="flex justify-center mx-auto">
          <img
            className="w-auto h-7 sm:h-8"
            src="https://merakiui.com/images/logo.svg"
            alt=""
          />
        </div>

        <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
          Create an account!
        </p>

        <Social />

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

          <a
            href="#"
            className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
          >
            or create an account
          </a>

          <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
        </div>

        {/* Form field */}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndoe"
                      {...field}
                      className="bg-inherit border-gray-700"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndoe@example.com"
                      {...field}
                      className="bg-inherit border-gray-700"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="xl:grid grid-cols-2 2xl:grid-cols-1 gap-4 xl:space-y-0 space-y-5">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                        className="bg-inherit border-gray-700"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                        className="bg-inherit border-gray-700"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormSuccess message={success} />
            <FormError message={error} />

            <Button
              type="submit"
              className="w-full"
              disabled={isPending || pending}
              // variant="secondary"
            >
              {isPending ||
                (pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />)}
              Register
            </Button>
          </form>
        </Form>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

          <a
            href="/auth/login"
            className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
          >
            or log in
          </a>

          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;
