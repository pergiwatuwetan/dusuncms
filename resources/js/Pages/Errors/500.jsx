import { Head, Link } from "@inertiajs/react";

export default function ServerError() {
    return (
        <>
            <Head title="500 - Server Error" />

            <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
                <div className="max-w-md text-center">
                    <h1 className="text-7xl font-extrabold text-orange-500">
                        500
                    </h1>

                    <h2 className="mt-4 text-2xl font-bold text-gray-800">
                        Terjadi Kesalahan
                    </h2>

                    <p className="mt-3 text-gray-600">
                        Maaf, terjadi kesalahan pada server. Silakan coba lagi
                        beberapa saat.
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