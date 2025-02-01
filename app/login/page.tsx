import { GalleryVerticalEnd } from "lucide-react";

import { LoginForm } from "@/components/login-form";

import type { Metadata } from "next";

// Set metadata
export const metadata: Metadata = {
  title: "Login | newsbox",
  //   description: "...",
  openGraph: {
    title: "Login | newsbox",
    description: "Login to your newsbox account to use our services",
    images: "", //add a image url to show the image
  },
};

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-auto w-24 items-center justify-center rounded-md bg-primary text-primary-foreground">
              {/* <GalleryVerticalEnd className="size-4" /> */}
              <img
                src="https://newsbox-omega.vercel.app/static/logo/Logo.svg"
                alt="logo"
              />
            </div>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="https://images.unsplash.com/photo-1498644035638-2c3357894b10?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
