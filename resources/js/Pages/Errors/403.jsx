import { Head, Link } from "@inertiajs/react";

export default function Forbidden() {
    return (
        <>
            <Head title="403 - Akses Ditolak" />

            <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
                <div className="max-w-md text-center">
                    <h1 className="text-7xl font-extrabold text-red-600">
                        403
                    </h1>

                    <h2 className="mt-4 text-2xl font-bold text-gray-800">
                        Akses Ditolak
                    </h2>

                    <p className="mt-3 text-gray-600">
                        Anda tidak memiliki izin untuk membuka halaman ini.
                    </p>

                    <Link
                        href="/"
                        className="mt-8 inline-flex rounded-lg bg-green-600 px-6 py-3 text-white transition duration-200 hover:bg-green-700"
                    >
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </>
    );
}