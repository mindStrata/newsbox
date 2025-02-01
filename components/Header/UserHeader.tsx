import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { ReactElement } from "react";

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
        <div>
          <Image
            src={"https://newsbox-omega.vercel.app/static/logo/Logo.svg"}
            width={100}
            height={10}
            alt="logo"
          />
        </div>
        <div className="flex justify-center items-center text-primary gap-2 md:gap-4 lg:gap-8">
          {/*  <div className="flex justify-center items-center gap-1 bg-primary py-1 px-2 lg:px-6 lg:py-2 text-white rounded-full cursor-pointer">
            <span>
              <Plus size={18} />
            </span>
            <span className="hidden lg:flex">Create</span>
          </div> */}
          <div>
            <Button className="rounded-full">
              <span>
                <Plus size={20} strokeWidth={4} />
              </span>
              <span className="hidden lg:flex">Create</span>
            </Button>
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
