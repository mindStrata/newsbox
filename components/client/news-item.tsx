"use client";

import { newsData } from "@/data";
import {
  ClipboardCheck,
  EllipsisVertical,
  Pen,
  Share,
  Trash2,
} from "lucide-react";
import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function NewsItem() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
  const [newsID, setNewsID] = React.useState<
    string | number | null | undefined
  >();

  return (
    <section className="container mx-auto flex flex-wrap gap-3">
      {newsData.map((item) => {
        return (
          <div key={item.id} className="min-w-60 max-w-60">
            <div className="relative">
              <img
                className="object-cover object-center"
                src={item.image}
                alt={item.title}
              />
              <div className="absolute inset-0 top-0 bg-black bg-opacity-15 py-2 pr-3 flex items-start justify-between">
                <span className="py-[5px] px-4 bg-black text-white rounded-r-full border-gray-100 dark:bg-white dark:text-black dark:border-gray-700">
                  {item.source}
                </span>
                {/* <DrawerDemo newsItemID={item.id}> */}
                <span
                  className="p-2 bg-none rounded-xl hover:bg-white dark:hover:bg-black cursor-pointer transition-all duration-300"
                  onClick={() => {
                    setIsDrawerOpen(true);
                    setNewsID(item.id);
                  }}
                >
                  <EllipsisVertical size={19} />
                </span>
                {/* </DrawerDemo> */}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-bold text-lg hover:underline hover:underline-offset-4 cursor-pointer hover:decoration-[2.5px]">
                {item.title}
              </h2>
              <p className="text-sm font-normal">{item.description}</p>
            </div>
          </div>
        );
      })}
      <DrawerDemo
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        newsItemID={newsID!}
      />
    </section>
  );
}

export function DrawerDemo({
  children,
  newsItemID,
  isDrawerOpen,
  setIsDrawerOpen,
}: {
  children?: React.ReactNode;
  newsItemID?: string | number;
  isDrawerOpen?: boolean;
  setIsDrawerOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // Use state
  const [copied, setCopied] = React.useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = React.useState<boolean | undefined>();

  const [showDeleteDialog, setShowDeleteDialog] =
    React.useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const username = searchParams.get("user");
  // const newsData.find(())
  const singleData = newsData.find((item) => {
    return newsItemID === item.id;
  });

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      {/* <DrawerTrigger asChild>{children}</DrawerTrigger> */}
      <DrawerContent>
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
                router.push(`/${"mindstrata"}/news/${newsItemID}`);
              }}
            >
              Add note <Pen size={19} />
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

            {/* <DeleteNewsArticle> */}
            <span
              className="flex justify-between items-center bg-zinc-100 dark:bg-zinc-900 px-3 py-3 rounded-xl cursor-pointer text-red-700"
              /*  onClick={() => {
                setOpenDrawer(false);
              }} */

              onClick={() => {
                setIsDrawerOpen?.(false);
                setShowDeleteDialog(true);
              }}
            >
              Delete <Trash2 size={19} />
            </span>
            {/* </DeleteNewsArticle> */}

            <DeleteNewsArticle
              showDeleteDialog={showDeleteDialog}
              setShowDeleteDialog={setShowDeleteDialog}
              newsItemID={newsItemID}
            />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function DeleteNewsArticle({
  children,
  newsItemID,
  isDrawerOpen,
  setIsDrawerOpen,
  showDeleteDialog,
  setShowDeleteDialog,
}: // setOpenDrawer,
{
  children?: React.ReactNode;
  // setOpenDrawer?: React.Dispatch<React.SetStateAction<boolean>>;
  newsItemID?: string | number;
  isDrawerOpen?: boolean;
  setIsDrawerOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  showDeleteDialog?: boolean;
  setShowDeleteDialog?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // find out the news data based on the provided id

  const news = newsData.find((i) => {
    return Number(newsItemID) === i.id;
  });

  return (
    <>
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        {/*    <DialogTrigger
          asChild
            onClick={() => {
            setOpenDrawer(false);
          }}
        >
          {children}
        </DialogTrigger> */}
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
