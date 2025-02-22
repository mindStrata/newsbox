import SubHeading from "@/components/Header/sub-heading";
import UserHeader from "@/components/Header/UserHeader";
import React from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <UserHeader
        name="Mind Strata"
        email="hello@mindstrata.com"
        username="mindstrata"
      />
      <SubHeading />
      <div>{children}</div>
    </section>
  );
}
