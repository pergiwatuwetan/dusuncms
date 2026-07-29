import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Button from "@/Components/UI/Button";
import EmptyState from "@/Components/Common/EmptyState";

export default function Index({ news }) {
    const destroy = (id) => {
        if (!confirm("Yakin ingin menghapus berita ini?")) {
            return;
        }

        router.delete(route("news.destroy", id));
    };

    return (
        <AdminLayout>
            <Head title="Manajemen Berita" />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        Manajemen Berita
                    </h1>

                    <p className="mt-1 text-slate-500">
                        Kelola seluruh berita DusunCMS.
                    </p>
                </div>

                <Button href={route("news.create")}>
                    + Tambah Berita
                </Button>
            </div>

            <div className="overflow-x-auto rounded-xl bg-white shadow">
                <table className="min-w-full">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                Judul
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                Status
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                Tanggal
                            </th>

                            <th className="px-6 py-4 text-center text-sm font-semibold">
                                Aksi
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {news.data.length === 0 ? (
                            <tr>
                                <td colSpan="4">
                                    <EmptyState
                                        icon="📰"
                                        title="Belum ada berita"
                                        description="Tambahkan berita pertama untuk ditampilkan di website."
                                    />
                                </td>
                            </tr>
                        ) : (
                            news.data.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-t"
                                >
                                    <td className="px-6 py-4">
                                        <div className="font-medium">
                                            {item.title}
                                        </div>

                                        {item.excerpt && (
                                            <div className="mt-1 text-sm text-slate-500 line-clamp-2">
                                                {item.excerpt}
                                            </div>
                                        )}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                item.status === "published"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {item.published_at
                                            ? new Date(
                                                  item.published_at
                                              ).toLocaleDateString("id-ID")
                                            : "-"}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-2">
                                            <Button
                                                variant="outline"
                                                href={route(
                                                    "news.edit",
                                                    item.id
                                                )}
                                            >
                                                Edit
                                            </Button>

                                            <Button
                                                variant="danger"
                                                onClick={() =>
                                                    destroy(item.id)
                                                }
                                            >
                                                Hapus
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {news.links.length > 3 && (
                <div className="mt-6 flex flex-wrap gap-2">
                    {news.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url ?? "#"}
                            preserveScroll
                            className={`rounded-lg px-4 py-2 text-sm ${
                                link.active
                                    ? "bg-emerald-600 text-white"
                                    : "bg-white border border-slate-300 text-slate-700"
                            } ${
                                !link.url
                                    ? "pointer-events-none opacity-50"
                                    : ""
                            }`}
                            dangerouslySetInnerHTML={{
                                __html: link.label,
                            }}
                        />
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}