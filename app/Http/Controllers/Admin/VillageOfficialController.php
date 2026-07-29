<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VillageOfficial;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class VillageOfficialController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/VillageOfficials/Index', [
            'officials' => VillageOfficial::query()
                ->select([
                    'id',
                    'photo',
                    'name',
                    'position',
                    'phone',
                    'email',
                    'sort_order',
                    'is_active',
                    'created_at',
                ])
                ->orderBy('sort_order')
                ->orderBy('name')
                ->paginate(10)
                ->withQueryString(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/VillageOfficials/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'photo' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],
            'name' => [
                'required',
                'string',
                'max:255',
            ],
            'position' => [
                'required',
                'string',
                'max:255',
            ],
            'bio' => ['nullable', 'string'],
            'phone' => [
                'nullable',
                'string',
                'max:50',
            ],
            'email' => [
                'nullable',
                'email',
                'max:255',
            ],
            'sort_order' => [
                'required',
                'integer',
                'min:0',
            ],
            'is_active' => [
                'required',
                'boolean',
            ],
        ]);

        if ($request->hasFile('photo')) {
            $validated['photo'] = $this->storePhoto($request);
        }

        VillageOfficial::create($validated);

        return redirect()
            ->route('village-officials.index')
            ->with('success', 'Perangkat dusun berhasil ditambahkan.');
    }

    public function edit(VillageOfficial $villageOfficial): Response
    {
        return Inertia::render('Admin/VillageOfficials/Edit', [
            'official' => $villageOfficial,
        ]);
    }

    public function update(
        Request $request,
        VillageOfficial $villageOfficial
    ): RedirectResponse {
        $validated = $request->validate([
            'photo' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],
            'name' => [
                'required',
                'string',
                'max:255',
            ],
            'position' => [
                'required',
                'string',
                'max:255',
            ],
            'bio' => ['nullable', 'string'],
            'phone' => [
                'nullable',
                'string',
                'max:50',
            ],
            'email' => [
                'nullable',
                'email',
                'max:255',
            ],
            'sort_order' => [
                'required',
                'integer',
                'min:0',
            ],
            'is_active' => [
                'required',
                'boolean',
            ],
        ]);

        if ($request->hasFile('photo')) {
            $this->deletePhoto($villageOfficial);

            $validated['photo'] = $this->storePhoto($request);
        }

        $villageOfficial->update($validated);

        return redirect()
            ->route('village-officials.index')
            ->with('success', 'Perangkat dusun berhasil diperbarui.');
    }

    public function destroy(
        VillageOfficial $villageOfficial
    ): RedirectResponse {
        $this->deletePhoto($villageOfficial);

        $villageOfficial->delete();

        return redirect()
            ->route('village-officials.index')
            ->with('success', 'Perangkat dusun berhasil dihapus.');
    }

    private function storePhoto(Request $request): string
    {
        return $request
            ->file('photo')
            ->store('village-officials', 'public');
    }

    private function deletePhoto(
        VillageOfficial $official
    ): void {
        if (
            $official->photo &&
            Storage::disk('public')->exists($official->photo)
        ) {
            Storage::disk('public')->delete($official->photo);
        }
    }
}