<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\WebsiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class WebsiteSettingController extends Controller
{
    /**
     * Display the website settings form.
     */
    public function edit(): Response
    {
        $setting = Cache::rememberForever('website_setting', function () {
            return WebsiteSetting::first();
        });

        if (! $setting) {
            $setting = WebsiteSetting::create([
                'village_name' => 'Nama Dusun',
            ]);

            Cache::forever('website_setting', $setting);
        }

        return Inertia::render('Admin/WebsiteSettings/Edit', [
            'setting' => $setting,
        ]);
    }

    /**
     * Update the website settings.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            // General
            'village_name' => ['required', 'string', 'max:255'],

            // Images
            'logo' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],

            'hero_image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:5120',
            ],

            // Profile
            'history' => ['nullable', 'string'],
            'vision' => ['nullable', 'string'],
            'mission' => ['nullable', 'string'],

            // Head
            'head_name' => ['nullable', 'string', 'max:255'],
            'head_greeting' => ['nullable', 'string'],

            // Contact
            'address' => ['nullable', 'string'],
            'phone' => ['nullable', 'string', 'max:50'],
            'email' => ['nullable', 'email', 'max:255'],

            // Maps
            'maps_embed' => ['nullable', 'string'],

            // Statistics
            'population' => ['nullable', 'integer', 'min:0'],
            'family_cards' => ['nullable', 'integer', 'min:0'],
            'rt_count' => ['nullable', 'integer', 'min:0'],
            'rw_count' => ['nullable', 'integer', 'min:0'],
            'area_size' => ['nullable', 'string', 'max:100'],

            // Social Media
            'facebook' => ['nullable', 'url', 'max:255'],
            'instagram' => ['nullable', 'url', 'max:255'],
            'youtube' => ['nullable', 'url', 'max:255'],
        ]);

        $setting = WebsiteSetting::first();

        if (! $setting) {
            $setting = WebsiteSetting::create([
                'village_name' => 'Nama Dusun',
            ]);
        }

        unset($validated['logo'], $validated['hero_image']);

        if ($request->hasFile('logo')) {
            $validated['logo'] = $this->storeLogo(
                $request,
                $setting
            );
        }

        if ($request->hasFile('hero_image')) {
            $validated['hero_image'] = $this->storeHeroImage(
                $request,
                $setting
            );
        }

        $setting->update($validated);

        Cache::forget('website_setting');

        Cache::forever(
            'website_setting',
            $setting->fresh()
        );

        return redirect()
            ->route('website-settings.edit')
            ->with('success', 'Pengaturan website berhasil diperbarui.');
    }

    /**
     * Store logo image.
     */
    private function storeLogo(
        Request $request,
        WebsiteSetting $setting
    ): string {
        if ($setting->logo) {
            Storage::disk('public')->delete($setting->logo);
        }

        return $request
            ->file('logo')
            ->store('website/logo', 'public');
    }

    /**
     * Store hero image.
     */
    private function storeHeroImage(
        Request $request,
        WebsiteSetting $setting
    ): string {
        if ($setting->hero_image) {
            Storage::disk('public')->delete($setting->hero_image);
        }

        return $request
            ->file('hero_image')
            ->store('website/hero', 'public');
    }
}