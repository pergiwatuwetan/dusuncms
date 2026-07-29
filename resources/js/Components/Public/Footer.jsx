import { usePage } from "@inertiajs/react";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
    const { setting } = usePage().props;

    const villageName = setting?.village_name || "DusunCMS";

    return (
        <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-3">

                {/* Website */}
                <div>
                    <div className="flex items-center gap-3">
                        {setting?.logo_url ? (
                            <img
                                src={setting.logo_url}
                                alt={villageName}
                                className="h-12 w-12 rounded-xl object-cover"
                            />
                        ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 font-bold text-white">
                                {villageName.charAt(0).toUpperCase()}
                            </div>
                        )}

                        <div>
                            <h3 className="text-lg font-bold text-slate-900">
                                {villageName}
                            </h3>

                            <p className="text-sm text-slate-500">
                                Website Resmi Dusun
                            </p>
                        </div>
                    </div>

                    <p className="mt-5 text-sm leading-7 text-slate-600">
                        Website resmi dusun sebagai media informasi,
                        publikasi kegiatan, pelayanan masyarakat,
                        dan transparansi pemerintahan desa.
                    </p>
                </div>

                {/* Kontak */}
                <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                        Kontak
                    </h3>

                    <div className="mt-5 space-y-4 text-sm text-slate-600">

                        {setting?.address && (
                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="mt-0.5 text-emerald-600" />
                                <span>{setting.address}</span>
                            </div>
                        )}

                        {setting?.phone && (
                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-emerald-600" />
                                <span>{setting.phone}</span>
                            </div>
                        )}

                        {setting?.email && (
                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-emerald-600" />
                                <span>{setting.email}</span>
                            </div>
                        )}

                    </div>
                </div>

                {/* Media Sosial */}
                <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                        Media Sosial
                    </h3>

                    <div className="mt-5 flex flex-col gap-4">

                        {setting?.facebook && (
                            <a
                                href={setting.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-slate-600 transition hover:text-emerald-600"
                            >
                                <FaFacebook size={18} />
                                <span>Facebook</span>
                            </a>
                        )}

                        {setting?.instagram && (
                            <a
                                href={setting.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-slate-600 transition hover:text-emerald-600"
                            >
                                <FaInstagram size={18} />
                                <span>Instagram</span>
                            </a>
                        )}

                        {setting?.youtube && (
                            <a
                                href={setting.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-slate-600 transition hover:text-emerald-600"
                            >
                                <FaYoutube size={18} />
                                <span>YouTube</span>
                            </a>
                        )}

                        {!setting?.facebook &&
                            !setting?.instagram &&
                            !setting?.youtube && (
                                <p className="text-sm text-slate-500">
                                    Belum ada media sosial yang ditambahkan.
                                </p>
                            )}
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-200">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-sm text-slate-500 md:flex-row">

                    <p>
                        © {new Date().getFullYear()} {villageName}. Seluruh hak cipta dilindungi.
                    </p>

                    <p className="text-center md:text-right">
                        Website resmi sebagai media informasi dan pelayanan masyarakat.
                    </p>

                </div>
            </div>
        </footer>
    );
}
