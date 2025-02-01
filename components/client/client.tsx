"use client";

import clsx from "clsx";
import { Bookmark } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function NewsSources({
  newsSources,
  user,
}: {
  newsSources: Array<string>;
  user: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const queryValues = useSearchParams();
  const currentQuery = queryValues.get("source");

  return (
    <>
      <div className="sticky top-0 z-10 py-1 bg-zinc-950 transition delay-100">
        <ul className="flex items-center gap-2 overflow-auto scrollbar-none py-1">
          <li className="px-3 py-1 bg-primary text-white rounded-full cursor-pointer hover:bg-zinc-700 whitespace-nowrap">
            All
          </li>
          {Array.from(new Set(newsSources)).map((source) => (
            <li
              key={source}
              className={clsx(
                "px-3 py-1 rounded-full cursor-pointer border whitespace-nowrap transition-colors",
                {
                  "bg-white text-black border-primary-foreground hover:bg-zinc-700":
                    currentQuery !== source,
                  "bg-primary text-secondary border-primary":
                    currentQuery === source,
                  "border-2": pathname === `/${user}`,
                }
              )}
              onClick={() => {
                router.push(`/${user}?source=${source}`);
              }}
            >
              {source}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

interface NewsItem {
  url: string; // Changed from 'link' to 'url'
  image: string;
  source?: string; // Removed 'siteName' since it's the same as 'source'
  title: string;
  description: string;
  userid?: string;
  username?: string;
}

export const NewsCardSection: React.FC = ({ user }: { user?: string }) => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  let source = searchParams.get("source");
  //   console.log(source);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://localhost:3002/news");
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
        const data: NewsItem[] = await response.json();

        const userData = data.filter((data) => {
          return "2025-10000000001" === data.userid;
        });

        if (source) {
          const filteredData = userData.filter((news) => {
            return source === news.source;
          });
          setNewsItems(filteredData);
        } else {
          setNewsItems(userData);
        }
      } catch (err: any) {
        setError(err.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-wrap gap-4 justify-center items-start w-full p-4 pb-24">
      {newsItems.length > 0 ? (
        newsItems.map((article, index) => (
          <a
            key={index}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline text-inherit"
          >
            <div className="bg-zinc-950 text-white overflow-hidden w-72 flex flex-col items-center border border-white/15 rounded-lg relative">
              <div className="relative w-full rounded-t-lg overflow-hidden">
                {/* News Image */}
                <img
                  src={article.image}
                  alt="News Image"
                  className="w-full h-44 object-cover rounded-t-lg"
                />
                {/* Source Badge */}
                {article.source && (
                  <div className="absolute top-2 left-0 bg-white text-black font-light px-4 py-2 text-sm rounded-tr-full rounded-br-full border border-white/15">
                    {article.source}
                  </div>
                )}
                {/* Love Icon */}
                <div
                  className="absolute top-2 right-2 p-2 rounded-full cursor-pointer hover:scale-110 transition-transform"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Bookmark
                    className="w-5 h-5"
                    fill="#1d9bf0"
                    color="#1d9bf0"
                  />
                </div>
              </div>
              {/* Card Content */}
              <div className="p-4 flex flex-col">
                <h3 className="text-lg font-semibold mb-2 underline decoration-2 decoration-transparent underline-offset-2 hover:decoration-white">
                  {article.title}
                </h3>
                <p className="text-sm font-light">
                  {article.description.length > 200
                    ? `${article.description.slice(0, 200)}...`
                    : article.description}
                </p>
              </div>
            </div>
          </a>
        ))
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold">No News Available</h2>
          <p className="font-light">Please check back later.</p>
        </div>
      )}
    </div>
  );
};
