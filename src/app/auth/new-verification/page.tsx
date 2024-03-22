"use client";

import { FormError, FormSuccess } from "@/components/form-message";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";

const NewVerification = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  console.log(token);

  const onClick = () => {
    router.push("/auth/login");
  };

  const onSubmit = useCallback(() => {
    if (success || error) {
      return;
    }

    if (!token) {
      setError("Missing token!");
      return;
    }

    axios
      .post("/api/newVerification", { token })
      .then((response) => {
        const data = response.data;
        setSuccess(data?.success);
        setError(data?.error);
      })
      .catch(() => {
        setError("Something went wrong");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="bg-secondary">
      <div className="container h-screen flex justify-center items-center">
        <Card className="w-full flex flex-col items-center bg-primary-foreground">
          <CardHeader>
            <CardTitle>Verifying your email</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Thank you for signing up. Please wait a moment</p>
          </CardContent>
          <CardContent>
            {!success && !error && <MoonLoader color="#38bdf8" />}
            <FormSuccess message={success} />
            {!success && <FormError message={error} />}
          </CardContent>
          <CardFooter>
            <Button onClick={onClick} variant="ghost">
              Back to login
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default NewVerification;
