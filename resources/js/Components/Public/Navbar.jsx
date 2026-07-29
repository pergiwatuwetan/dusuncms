import { Link, usePage } from "@inertiajs/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import Button from "@/Components/UI/Button";
import { navigation } from "@/data/navigation";

export default function Navbar() {
    const { props, url } = usePage();
    const { setting } = props;

    const [mobileOpen, setMobileOpen] = useState(false);

    const villageName = setting?.village_name || "DusunCMS";

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    {setting?.logo_url ? (
                        <img
                            src={setting.logo_url}
                            alt={villageName}
                            className="h-10 w-10 rounded-xl object-cover"
                        />
                    ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 font-bold text-white">
                            {villageName.charAt(0).toUpperCase()}
                        </div>
                    )}

                    <div>
                        <h1 className="font-bold text-slate-900">
                            {villageName}
                        </h1>

                        <p className="text-xs text-slate-500">
                            Website Resmi Dusun
                        </p>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden items-center gap-8 md:flex">
                    {navigation
                        .filter((item) => item?.href)
                        .map((item) => {
                            const href = item.href;
                            const isAnchor = href.startsWith("/#");

                            const active =
                                !isAnchor &&
                                (url === href ||
                                    (href !== "/" &&
                                        url.startsWith(href + "/")));

                            const className = `transition ${
                                active
                                    ? "font-semibold text-emerald-600"
                                    : "text-slate-700 hover:text-emerald-600"
                            }`;

                            return isAnchor ? (
                                <a
                                    key={item.name}
                                    href={href}
                                    className={className}
                                >
                                    {item.name}
                                </a>
                            ) : (
                                <Link
                                    key={item.name}
                                    href={href}
                                    className={className}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                </nav>

                {/* Right */}
                <div className="flex items-center gap-3">
                    <Button
                        href="/login"
                        className="hidden md:inline-flex"
                    >
                        Login Admin
                    </Button>

                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="rounded-xl p-2 hover:bg-slate-100 md:hidden"
                    >
                        {mobileOpen ? (
                            <X size={22} />
                        ) : (
                            <Menu size={22} />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="border-t bg-white md:hidden">
                    <nav className="flex flex-col p-4">

                        {navigation
                            .filter((item) => item?.href)
                            .map((item) => {
                                const href = item.href;
                                const isAnchor = href.startsWith("/#");

                                return isAnchor ? (
                                    <a
                                        key={item.name}
                                        href={href}
                                        onClick={() => setMobileOpen(false)}
                                        className="rounded-lg px-4 py-3 hover:bg-slate-100"
                                    >
                                        {item.name}
                                    </a>
                                ) : (
                                    <Link
                                        key={item.name}
                                        href={href}
                                        onClick={() => setMobileOpen(false)}
                                        className="rounded-lg px-4 py-3 hover:bg-slate-100"
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}

                        <Link
                            href="/login"
                            className="mt-4 rounded-lg bg-emerald-600 px-4 py-3 text-center font-medium text-white"
                        >
                            Login Admin
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}