export default function EmptyState({
    title,
    description,
    icon = "📄",
}) {
    return (
        <div className="flex flex-col items-center justify-center py-16">
            <div className="text-6xl">
                {icon}
            </div>

            <h2 className="mt-5 text-xl font-semibold text-slate-700">
                {title}
            </h2>

            <p className="mt-2 max-w-md text-center text-slate-500">
                {description}
            </p>
        </div>
    );
}