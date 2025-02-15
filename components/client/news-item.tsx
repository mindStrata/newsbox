import { newsData } from "@/data";
import { EllipsisVertical } from "lucide-react";

export default function NewsItem() {
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
                <span className="p-2 bg-none rounded-xl hover:bg-white dark:hover:bg-black cursor-pointer transition-all duration-300">
                  <EllipsisVertical size={19} />
                </span>
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
    </section>
  );
}
