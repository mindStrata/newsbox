import NewsSources, { NewsCardSection } from "@/components/client/client";
import NewsItem, { DrawerDemo } from "@/components/client/news-item";
import SubHeading from "@/components/Header/sub-heading";
import UserHeader from "@/components/Header/UserHeader";
import type { Metadata } from "next";
// import { useRouter } from "next/navigation";

export const metadata: Metadata = {
  title: "Mind Strata (@mindstrata) | newsbox",
  //   description: "...",
};

// Show the news article based on user

const newsSources: Array<string> = [
  "BBC",
  "ABC News",
  "BBC News",
  "Al Jazeera",
  "CNN",
  "CNN",
  "Times of India",
];

export default async function UserPage({
  params,
}: {
  params: Promise<{ user: string }>;
}) {
  const user = (await params).user;
  // const router = useRouter();



  return (
    <div className="px-2 lg:px-10">
      {/* <SubHeading /> */}

      <NewsItem />
      {/* <DrawerDemo/> */}
    </div>
  );
}
