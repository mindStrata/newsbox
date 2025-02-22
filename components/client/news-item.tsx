"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { newsData } from "@/data";
import {
  Bookmark,
  ClipboardCheck,
  EllipsisVertical,
  Pen,
  Share,
  Trash2,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

export default function NewsItem() {
  return (
    <section className="container mx-auto flex flex-wrap justify-center gap-y-4 md:gap-3">
      {newsData.map((item) => {
        return (
          <div
            key={item.id}
            className="w-full h-auto md:min-w-60 md:max-w-60 lg:min-w-64 lg:max-w-64 pb-2 border-b-2 border-zinc-400 dark:border-zinc-800"
          >
            <div className="relative">
              <img
                className="object-cover object-center w-full h-52 md:h-40"
                src={item.image}
                alt={item.title}
              />
              <div className="absolute inset-0 top-0 bg-black bg-opacity-15 py-2 pr-3 flex items-start justify-between">
                <span className="py-[5px] px-4 bg-black text-white rounded-r-full  dark:bg-white dark:text-black border border-zinc-400 dark:border-zinc-800">
                  {item.source}
                </span>
                <DrawerDemo newsItemID={item.id}>
                  <span className="p-2 bg-none rounded-xl hover:bg-[#f2f2f2] dark:hover:bg-black cursor-pointer transition-all duration-300">
                    <EllipsisVertical size={19} />
                  </span>
                </DrawerDemo>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-bold text-xl hover:underline hover:underline-offset-4 cursor-pointer hover:decoration-[2.5px]">
                {item.title}
              </h2>
              <p className="text-[15px] font-light">{item.description}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export function DrawerDemo({
  children,
  newsItemID,
}: {
  children?: React.ReactNode;
  newsItemID?: string | number;
}) {
  // Use state
  const [copied, setCopied] = React.useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const username = searchParams.get("user");
  // const newsData.find(())
  const singleData = newsData.find((item) => {
    return newsItemID === item.id;
  });

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="pb-8">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Action</DrawerTitle>
            <DrawerDescription>{singleData?.title}</DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-1 px-4">
            {/* <pre>{JSON.stringify(singleData, null, 2)}</pre> */}
            <span
              className="flex justify-between items-center bg-zinc-100 dark:bg-zinc-900 px-3 py-3 rounded-xl cursor-pointer"
              onClick={() => {
                router.push(`/news/${newsItemID}`);
              }}
            >
              Add note <Pen size={19} />
            </span>
            <span
              className="flex justify-between items-center bg-zinc-100 dark:bg-zinc-900 px-3 py-3 rounded-xl cursor-pointer"
              /* onClick={() => {
                  router.push(`/${"mindstrata"}/news/${newsItemID}`);
                }} */
            >
              Bookmark <Bookmark size={19} />
            </span>
            <span
              className="flex justify-between items-center bg-zinc-100 dark:bg-zinc-900 px-3 py-3 rounded-xl cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(singleData?.title! || "");
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            >
              Share
              <span className="relative w-5 h-5 flex items-center justify-center">
                {copied ? (
                  <ClipboardCheck
                    size={19}
                    className="text-green-700 animate-[zoomIn_0.3s_ease-out] opacity-100"
                  />
                ) : (
                  <Share
                    size={19}
                    className="animate-[wiggle_0.5s_ease-in-out] opacity-100"
                  />
                )}
              </span>
            </span>

            <DeleteNewsArticle newsItemID={newsItemID}>
              <span className="flex justify-between items-center bg-zinc-100 dark:bg-zinc-900 px-3 py-3 rounded-xl cursor-pointer text-red-700">
                Delete <Trash2 size={19} />
              </span>
            </DeleteNewsArticle>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function DeleteNewsArticle({
  children,
  newsItemID,
}: {
  children?: React.ReactNode;
  newsItemID?: string | number;
}) {
  const news = newsData.find((i) => {
    return Number(newsItemID) === i.id;
  });

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
            <div>
              <p>{news?.description}</p>
            </div>
            <div className="flex flex-col w-full gap-3">
              <Button variant={"destructive"}>Delete</Button>
              <Button variant={"secondary"}>Cancel</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
