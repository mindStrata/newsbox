import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Children, ReactElement } from "react";

interface PropType {
  name?: string;
  image?: string;
  username?: string;
  email?: string;
}

export default function UserHeader({ name, image }: PropType): ReactElement {
  return (
    <>
      <div className="flex text-primary justify-between items-center h-12 px-6 py-8 lg:px-8 lg:py-10 border-b-2 border-secondary z-20 bg-white dark:bg-black">
        {/*    <div>
          <Image
            src={"https://newsbox-omega.vercel.app/static/logo/Logo.svg"}
            width={100}
            height={10}
            alt="logo"
          />
        </div> */}

        <div
          className={
            "block mr-2 font-serif px-2 py-1 text-white bg-black dark:text-black dark:bg-white font-bold"
          }
        >
          NewsBox
        </div>
        <div className="flex justify-center items-center text-primary gap-2 md:gap-4 lg:gap-8">
          {/*  <div className="flex justify-center items-center gap-1 bg-primary py-1 px-2 lg:px-6 lg:py-2 text-white rounded-full cursor-pointer">
            <span>
              <Plus size={18} />
            </span>
            <span className="hidden lg:flex">Create</span>
          </div> */}
          <div>
            <DialogDemo>
              <Button className="rounded-full text-black">
                <span>
                  <Plus size={20} strokeWidth={4} />
                </span>
                <span className="hidden lg:flex text-black">Create</span>
              </Button>
            </DialogDemo>
          </div>
          <div>
            <Avatar className="cursor-pointer">
              <AvatarImage src={image} />
              <AvatarFallback>{"MS"}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </>
  );
}

// import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DialogDemo({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" >
        <DialogHeader>
          <DialogTitle>Bookmark News Article</DialogTitle>
          {/*  <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className="flex flex-col gap-y-3 w-full py-9">
          <div className="w-full">
            <Input id="name" placeholder="Enter link" className="w-full" />
          </div>
          <div className="w-full">
            <Button type="submit" className="w-full">
              Add link
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
