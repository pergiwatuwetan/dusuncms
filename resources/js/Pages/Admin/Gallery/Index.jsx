import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import EmptyState from '@/Components/Common/EmptyState';

export default function Index({ galleries }) {
    const destroy = (gallery) => {
        if (!confirm(`Hapus album "${gallery.title}"?`)) {
            return;
        }

        router.delete(route('gallery.destroy', gallery.id));
    };

    return (
        <AdminLayout>
            <Head title="Galeri" />

            <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Galeri
                        </h1>

                        <p className="mt-1 text-sm text-gray-600">
                            Kelola album dokumentasi dusun.
                        </p>
                    </div>

                    <Link href={route('gallery.create')}>
                        <PrimaryButton>
                            Tambah Album
                        </PrimaryButton>
                    </Link>
                </div>

                <div className="overflow-x-auto rounded-lg bg-white shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Judul Album
                                </th>

                                <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Jumlah Foto
                                </th>

                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Dibuat
                                </th>

                                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Aksi
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200 bg-white">
                            {galleries.data.length === 0 ? (
                                <tr>
                                    <td colSpan={4}>
                                        <EmptyState
                                            icon="🖼️"
                                            title="Belum ada album"
                                            description="Tambahkan album pertama untuk mulai mengelola dokumentasi dusun."
                                        />
                                    </td>
                                </tr>
                            ) : (
                                galleries.data.map((gallery) => (
                                    <tr key={gallery.id}>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">
                                                {gallery.title}
                                            </div>

                                            {gallery.description && (
                                                <div className="mt-1 line-clamp-2 text-sm text-gray-500">
                                                    {gallery.description}
                                                </div>
                                            )}
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                                                {gallery.images_count} Foto
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(
                                                gallery.created_at
                                            ).toLocaleDateString('id-ID')}
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={route(
                                                        'gallery.edit',
                                                        gallery.id
                                                    )}
                                                >
                                                    <SecondaryButton>
                                                        Edit
                                                    </SecondaryButton>
                                                </Link>

                                                <DangerButton
                                                    onClick={() =>
                                                        destroy(gallery)
                                                    }
                                                >
                                                    Hapus
                                                </DangerButton>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {galleries.links.length > 3 && (
                    <div className="flex flex-wrap gap-2">
                        {galleries.links.map((link, index) => (
                            <button
                                key={index}
                                disabled={!link.url}
                                onClick={() =>
                                    link.url && router.visit(link.url)
                                }
                                className={`rounded-md px-4 py-2 text-sm ${
                                    link.active
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-white border text-gray-700 hover:bg-gray-100'
                                } disabled:cursor-not-allowed disabled:opacity-50`}
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}