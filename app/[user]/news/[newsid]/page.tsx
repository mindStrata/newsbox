import { Textarea } from "@/components/ui/textarea";
import { newsData } from "@/data";

export default async function UserPage({
  params,
}: {
  params: Promise<{ newsid: string }>;
}) {
  const newsid = (await params).newsid;
  console.log(newsid);

  const data = newsData.find((item) => {
    return Number(newsid) === item.id;
  });
  console.log(data);
  return (
    <div className="px-2 lg:px-10">
      hello
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Textarea className="text-[40px]"   style={{ fontFamily: "Georgia, serif", fontSize: "18px" }} />
    </div>
  );
}
