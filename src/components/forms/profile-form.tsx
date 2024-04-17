"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/currentUser";
import { ProfileSchema } from "@/schemas";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "../ui/use-toast";

export function ProfileForm() {
  const [isPending, startTransition] = useTransition();
  const [pending, setPending] = useState<boolean>(false);

  const user = useCurrentUser();
  const { update } = useSession();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
    },
  });

  useEffect(() => {
    // Update the form default values whenever user data changes
    form.setValue("name", user?.name || "");
    form.setValue("email", user?.email || "");
  }, [user]);

  const toastFunction = (
    title: string,
    variant?: "default" | "success" | "destructive"
  ) => {
    toast({
      title,
      variant,
      duration: 3000,
    });
  };

  const onSubmit = (data: z.infer<typeof ProfileSchema>) => {
    startTransition(() => {
      setPending(true);

      axios
        .put("/api/user", data)
        .then(({ data }) => {
          if (data.success) {
            update();

            toastFunction(data.success, "success");
          } else {
            toastFunction(
              data.error || "An unknown error has occurred!",
              "destructive"
            );
          }
          setPending(false);
        })
        .catch((error) => {
          toastFunction("An unknown error has occurred!", "destructive");
          setPending(false);
        });

      form.reset();
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Set a name"
                  {...field}
                  disabled={pending || isPending}
                />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="johndoe@example.com"
                  {...field}
                  disabled={user?.isOAuth || pending || isPending}
                />
              </FormControl>
              <FormDescription>
                Change email after verification.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {!user?.isOAuth && (
          <>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="******"
                      {...field}
                      disabled={pending || isPending}
                    />
                  </FormControl>
                  <FormDescription>Your old password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="******"
                      {...field}
                      disabled={pending || isPending}
                    />
                  </FormControl>
                  <FormDescription>Your new password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <Button type="submit" disabled={isPending || pending}>
          {isPending ||
            (pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />)}
          Update profile
        </Button>
      </form>
    </Form>
  );
}
