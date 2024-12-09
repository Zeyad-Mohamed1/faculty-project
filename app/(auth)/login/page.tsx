/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { LoginForm } from "@/components/forms/login-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Login = () => {
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("user") as string) || {};

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      router.push("/");
    }
  }, [user, router]);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoginForm />
    </div>
  );
};

export default Login;
