import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    Plus,
    Pencil,
    Trash2,
    Eye,
    EyeOff,
} from "lucide-react";
import EmptyState from "@/Components/Common/EmptyState";

export default function Index({ officials }) {
    const destroy = (official) => {
        if (
            confirm(
                `Hapus perangkat dusun "${official.name}"?`
            )
        ) {
            router.delete(
                route("village-officials.destroy", official.id)
            );
        }
    };

    return (
        <AdminLayout>
            <Head title="Perangkat Dusun" />

            <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Perangkat Dusun
                        </h1>

                        <p className="text-sm text-gray-500">
                            Kelola data perangkat dusun.
                        </p>
                    </div>

                    <Link
                        href={route(
                            "village-officials.create"
                        )}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700 sm:w-auto"
                    >
                        <Plus size={18} />
                        Tambah
                    </Link>
                </div>

                <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
                    <table className="min-w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-3 text-left">
                                    Foto
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Nama
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Jabatan
                                </th>

                                <th className="px-4 py-3 text-center">
                                    Urutan
                                </th>

                                <th className="px-4 py-3 text-center">
                                    Status
                                </th>

                                <th className="px-4 py-3 text-center">
                                    Aksi
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {officials.data.length === 0 && (
                                <tr>
                                    <td colSpan={6}>
                                        <EmptyState
                                            icon="👨‍💼"
                                            title="Belum ada perangkat dusun"
                                            description="Tambahkan perangkat dusun pertama untuk ditampilkan di website."
                                        />
                                    </td>
                                </tr>
                            )}

                            {officials.data.length > 0 &&
                                officials.data.map((official) => (
                                    <tr
                                        key={official.id}
                                        className="border-t"
                                    >
                                        <td className="px-4 py-3">
                                            {official.photo_url ? (
                                                <img
                                                    src={official.photo_url}
                                                    alt={official.name}
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="h-14 w-14 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-200 text-xs">
                                                    -
                                                </div>
                                            )}
                                        </td>

                                        <td className="px-4 py-3 font-medium">
                                            {official.name}
                                        </td>

                                        <td className="px-4 py-3">
                                            {
                                                official.position
                                            }
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            {
                                                official.sort_order
                                            }
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            {official.is_active ? (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                                                    <Eye size={14} />
                                                    Aktif
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs text-red-700">
                                                    <EyeOff size={14} />
                                                    Nonaktif
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-4 py-3">
                                            <div className="flex justify-center gap-2">
                                                <Link
                                                    href={route(
                                                        "village-officials.edit",
                                                        official.id
                                                    )}
                                                    className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                                                >
                                                    <Pencil
                                                        size={
                                                            16
                                                        }
                                                    />
                                                </Link>

                                                <button
                                                    onClick={() =>
                                                        destroy(
                                                            official
                                                        )
                                                    }
                                                    className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
                                                >
                                                    <Trash2
                                                        size={
                                                            16
                                                        }
                                                    />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}