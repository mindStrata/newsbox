export default function SubHeading() {
    const navigatons = ["Home", "Folder", "Stats", "Settings"];
    return (
        <div className="sticky top-0 bg-white dark:bg-black z-50">
            <div className="flex top-0 gap-5 py-5">
                {navigatons.map((i) => (
                    <p key={i} className="cursor-pointer">{i}</p>
                ))}
            </div>
        </div>
    );
}
