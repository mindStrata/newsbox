"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface Navigation {
  route: string;
  link: string;
  id: string | number;
}

export default function SubHeading() {
  // const navigatons: Array<Navigation> = ["Home", "Folder", "Stats", "Settings"];

  const navigatons: Array<Navigation> = [
    {
      id: 1,
      route: "Home",
      link: "/",
    },
    {
      id: 2,
      route: "Folder",
      link: "/folder",
    },
    {
      id: 3,
      route: "Stats",
      link: "/stats",
    },
    {
      id: 4,
      route: "Settings",
      link: "/settings",
    },
  ];
  const [isSticky, setIsSticky] = React.useState(false);

  // const path = useRouter()
  const path = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      // Check if the scroll position is at the top
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-0 bg-white dark:bg-black z-50 mb-3">
      <div className="flex items-center py-[2px] border-b border-b-zinc-200 dark:border-b-zinc-800">
        <div
          className={
            isSticky
              ? "block mr-2 font-serif px-2 py-1 text-white bg-black dark:text-black dark:bg-white font-bold"
              : "hidden"
          }
        >
          NewsBox
        </div>

        {navigatons.map((i, index) => (
          <Link
            href={i.link}
            key={i.id}
            className="cursor-pointer px-3 py-2 bg-none rounded-lg hover:bg-zinc-200 hover:dark:bg-zinc-900"
          >
            {i.route}
          </Link>
        ))}
      </div>
    </div>
  );
}
