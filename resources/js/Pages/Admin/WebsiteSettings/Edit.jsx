import AdminLayout from "@/Layouts/AdminLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Textarea from "@/Components/UI/Textarea";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Edit({ setting }) {
    const { data, setData, post, processing, errors } = useForm({
        village_name: setting.village_name ?? "",

        logo: null,
        hero_image: null,

        history: setting.history ?? "",
        vision: setting.vision ?? "",
        mission: setting.mission ?? "",

        head_name: setting.head_name ?? "",
        head_greeting: setting.head_greeting ?? "",

        address: setting.address ?? "",
        phone: setting.phone ?? "",
        email: setting.email ?? "",

        maps_embed: setting.maps_embed ?? "",

        population: setting.population ?? "",
        family_cards: setting.family_cards ?? "",
        rt_count: setting.rt_count ?? "",
        rw_count: setting.rw_count ?? "",
        area_size: setting.area_size ?? "",

        facebook: setting.facebook ?? "",
        instagram: setting.instagram ?? "",
        youtube: setting.youtube ?? "",
    });
    const [logoPreview, setLogoPreview] = useState(
    setting.logo_url ?? null
);

const [heroPreview, setHeroPreview] = useState(
    setting.hero_image_url ?? null
);
    const submit = (e) => {
    e.preventDefault();

    post(route("website-settings.update"), {
            forceFormData: true,
            data: {
                ...data,
                _method: "put",
            },
        });
    };

    return (
        <AdminLayout>
            <Head title="Website Settings" />

            <div className="space-y-6">

                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        Website Settings
                    </h1>

                    <p className="mt-2 text-slate-600">
                        Kelola informasi website dusun.
                    </p>
                </div>

                <form
                    onSubmit={submit}
                    className="space-y-6"
                >

                    {/* Informasi Umum */}

                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-xl font-bold">
                            Informasi Umum
                        </h2>

                        <div>
                            <InputLabel value="Nama Dusun" />

                            <TextInput
                                value={data.village_name}
                                onChange={(e) =>
                                    setData("village_name", e.target.value)
                                }
                                className="mt-2"
                            />

                            <InputError
                                message={errors.village_name}
                                className="mt-2"
                            />
                        </div>
                    </div>
                        {/* Media Website */}

                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <h2 className="mb-6 text-xl font-bold">
                                Media Website
                            </h2>

                            <div className="grid gap-8 lg:grid-cols-2">

                                {/* Logo Website */}
                                <div>
                                    <InputLabel value="Logo Website" />

                                    {logoPreview && (
                                        <img
                                            src={logoPreview}
                                            alt="Logo Website"
                                            loading="lazy"
                                            decoding="async"
                                            className="mt-3 h-32 w-32 rounded-xl border object-contain"
                                        />
                                    )}

                                    <input
                                        name="logo"
                                        type="file"
                                        accept="image/*"
                                        className="mt-4 block w-full rounded-lg border border-slate-300 p-2 text-sm"
                                        onChange={(e) => {
                                            const file = e.target.files[0];

                                            if (!file) return;

                                            setData("logo", file);
                                            setLogoPreview(URL.createObjectURL(file));
                                        }}
                                    />
                                    
                                    <InputError
                                        message={errors.logo}
                                        className="mt-2"
                                    />
                                    
                                </div>

                                {/* Hero Image */}
                                <div>
                                    <InputLabel value="Hero Image" />

                                    {heroPreview && (
                                        <img
                                            src={heroPreview}
                                            alt="Hero Image"
                                            className="mt-3 aspect-video w-full rounded-xl border object-cover"
                                        />
                                    )}

                                    <input
                                        name="hero_image"
                                        type="file"
                                        accept="image/*"
                                        className="mt-4 block w-full rounded-lg border border-slate-300 p-2 text-sm"
                                        onChange={(e) => {
                                            const file = e.target.files[0];

                                            if (!file) return;

                                            setData("hero_image", file);
                                            setHeroPreview(URL.createObjectURL(file));
                                        }}
                                    />

                                    <InputError
                                        message={errors.hero_image}
                                        className="mt-2"
                                    />
                                </div>

                            </div>
                        </div>
                    {/* Profil */}

                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-xl font-bold">
                            Profil Dusun
                        </h2>

                        <div className="space-y-5">

                            <div>
                                <InputLabel value="Sejarah" />

                                <Textarea
                                    rows={5}
                                    value={data.history}
                                    onChange={(e) =>
                                        setData("history", e.target.value)
                                    }
                                    className="mt-2"
                                />

                                <InputError
                                    message={errors.history}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel value="Visi" />

                                <Textarea
                                    rows={3}
                                    value={data.vision}
                                    onChange={(e) =>
                                        setData("vision", e.target.value)
                                    }
                                    className="mt-2"
                                />

                                <InputError
                                    message={errors.vision}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel value="Misi" />

                                <Textarea
                                    rows={5}
                                    value={data.mission}
                                    onChange={(e) =>
                                        setData("mission", e.target.value)
                                    }
                                    className="mt-2"
                                />

                                <InputError
                                    message={errors.mission}
                                    className="mt-2"
                                />
                            </div>

                        </div>
                    </div>

                    {/* Kepala Dusun */}

                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-xl font-bold">
                            Kepala Dusun
                        </h2>

                        <div className="space-y-5">

                            <div>
                                <InputLabel value="Nama Kepala Dusun" />

                                <TextInput
                                    value={data.head_name}
                                    onChange={(e) =>
                                        setData("head_name", e.target.value)
                                    }
                                    className="mt-2"
                                />

                                <InputError
                                    message={errors.head_name}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel value="Sambutan" />

                                <Textarea
                                    rows={6}
                                    value={data.head_greeting}
                                    onChange={(e) =>
                                        setData("head_greeting", e.target.value)
                                    }
                                    className="mt-2"
                                />

                                <InputError
                                    message={errors.head_greeting}
                                    className="mt-2"
                                />
                            </div>

                        </div>
                    </div>

                    {/* Kontak */}

                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-xl font-bold">
                            Kontak
                        </h2>

                        <div className="grid gap-5 md:grid-cols-2">

                            <div>
                                <InputLabel value="Nomor Telepon" />

                                <TextInput
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                    className="mt-2"
                                />

                                <InputError
                                    message={errors.phone}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel value="Email" />

                                <TextInput
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="mt-2"
                                />
                                
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                        </div>

                        <div className="mt-5">
                            <InputLabel value="Alamat" />

                            <Textarea
                                rows={4}
                                value={data.address}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                className="mt-2"
                            />
                            <InputError
                                message={errors.address}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    {/* Statistik Dusun */}

                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-xl font-bold">
                            Statistik Dusun
                        </h2>

                        <div className="grid gap-5 md:grid-cols-2">

                            <div>
                                <InputLabel value="Jumlah Penduduk" />

                                <TextInput
                                    type="number"
                                    value={data.population}
                                    onChange={(e) =>
                                        setData("population", e.target.value)
                                    }
                                    className="mt-2"
                                />

                                <InputError
                                    message={errors.population}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel value="Jumlah KK" />

                                <TextInput
                                    type="number"
                                    value={data.family_cards}
                                    onChange={(e) =>
                                        setData("family_cards", e.target.value)
                                    }
                                    className="mt-2"
                                />

                                <InputError
                                    message={errors.family_cards}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel value="Jumlah RT" />

                                <TextInput
                                    type="number"
                                    value={data.rt_count}
                                    onChange={(e) =>
                                        setData("rt_count", e.target.value)
                                    }
                                    className="mt-2"
                                />

                                <InputError
                                    message={errors.rt_count}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel value="Jumlah RW" />

                                <TextInput
                                    type="number"
                                    value={data.rw_count}
                                    onChange={(e) =>
                                        setData("rw_count", e.target.value)
                                    }
                                    className="mt-2"
                                />

                                <InputError
                                    message={errors.rw_count}
                                    className="mt-2"
                                />
                            </div>

                        </div>

                        <div className="mt-5">
                            <InputLabel value="Luas Wilayah" />

                            <TextInput
                                placeholder="Contoh: 245 Ha"
                                value={data.area_size}
                                onChange={(e) =>
                                    setData("area_size", e.target.value)
                                }
                                className="mt-2"
                            />

                            <InputError
                                message={errors.area_size}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    
                    {/* Media Sosial */}

                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-xl font-bold">
                            Media Sosial
                        </h2>

                        <div className="space-y-5">

                            <TextInput
                                placeholder="Facebook URL"
                                value={data.facebook}
                                onChange={(e) =>
                                    setData("facebook", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.facebook}
                                className="mt-2"
                            />

                            <TextInput
                                placeholder="Instagram URL"
                                value={data.instagram}
                                onChange={(e) =>
                                    setData("instagram", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.instagram}
                                className="mt-2"
                            />

                            <TextInput
                                placeholder="YouTube URL"
                                value={data.youtube}
                                onChange={(e) =>
                                    setData("youtube", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.youtube}
                                className="mt-2"
                            />

                        </div>
                    </div>

                    {/* Maps */}

                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-xl font-bold">
                            Google Maps
                        </h2>

                        <Textarea
                            rows={5}
                            placeholder="Paste Google Maps Embed Code"
                            value={data.maps_embed}
                            onChange={(e) =>
                                setData("maps_embed", e.target.value)
                            }
                        />
                        {data.maps_embed && (
                            <div
                                className="prose mt-6 max-w-none overflow-hidden rounded-xl border"
                                dangerouslySetInnerHTML={{
                                    __html: data.maps_embed,
                                }}
                            />
                        )}
                        <InputError
                            message={errors.maps_embed}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex justify-end">
                        <PrimaryButton
                            disabled={processing}
                        >
                            Simpan Perubahan
                        </PrimaryButton>
                    </div>

                </form>

            </div>
        </AdminLayout>
    );
}