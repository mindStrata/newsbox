export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex md:w-[100px]">
        <div className="bg-red-200 w-[30%]">common settings content</div>
        <div className="bg-yellow-200 w-[70%]">{children}</div>
      </div>
    </>
  );
}
