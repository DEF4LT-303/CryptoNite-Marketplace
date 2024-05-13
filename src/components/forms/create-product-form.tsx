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
import { ProductSchema } from "@/schemas";
import { Loader2 } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { toast } from "../ui/use-toast";
import ImageUploader from "./image-uploader";

export function CreateProductForm() {
  const [isPending, startTransition] = useTransition();
  const [pending, setPending] = useState<boolean>(false);
  const imageUploaderRef = useRef<any>(null);

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: undefined,
      description: undefined,
      price: undefined,
      stock: 1,
    },
  });

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

  const onSubmit = (data: z.infer<typeof ProductSchema>) => {
    startTransition(() => {
      // setPending(true);

      // Simulating an asynchronous request
      setTimeout(() => {
        const success = Math.random() < 0.9;

        if (success) {
          imageUploaderRef.current.uploadImage();
          toastFunction("Request successful!", "success");
        } else {
          toastFunction("Request failed! An error occurred.", "destructive");
        }

        setPending(false);
      }, 1000);
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
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Set a name"
                  {...field}
                  disabled={pending || isPending}
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>Set a product name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Set a description"
                  {...field}
                  disabled={pending || isPending}
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>Set a product description.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="Set a price"
                  {...field}
                  disabled={pending || isPending}
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>Set a price.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input
                  placeholder="Set a stock"
                  {...field}
                  disabled={pending || isPending}
                />
              </FormControl>
              <FormDescription>Set stock amount.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Upload Image</FormLabel>
          <FormControl>
            <ImageUploader ref={imageUploaderRef} form={form} />
          </FormControl>
          <FormDescription>
            A maximum of 4 images can be uploaded.
          </FormDescription>
        </FormItem>

        <Button type="submit" disabled={isPending || pending}>
          {isPending ||
            (pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />)}
          Create Product
        </Button>
      </form>
    </Form>
  );
}
