import { toast } from "./ui/use-toast";

export const toastFunction = (
  title: string,
  variant?: "default" | "success" | "destructive",
  description?: string
) => {
  toast({
    title,
    variant,
    description,
    duration: 3000,
  });
};
