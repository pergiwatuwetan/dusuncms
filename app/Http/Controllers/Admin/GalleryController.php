<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Gallery/Index', [
            'galleries' => Gallery::query()
                ->select([
                    'id',
                    'title',
                    'description',
                    'created_at',
                ])
                ->withCount('images')
                ->latest()
                ->paginate(10)
                ->withQueryString(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Gallery/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => [
                'required',
                'string',
                'max:255',
            ],
            'description' => ['nullable', 'string'],
        ]);

        $gallery = Gallery::create($validated);

        return redirect()
            ->route('gallery.edit', $gallery)
            ->with('success', 'Album berhasil dibuat. Silakan tambahkan foto.');
    }

    public function edit(Gallery $gallery): Response
    {
        $gallery->load([
            'images' => fn ($query) => $query
                ->select([
                    'id',
                    'gallery_id',
                    'image',
                    'sort_order',
                    'created_at',
                ])
                ->orderBy('sort_order')
                ->orderBy('id'),
        ]);

        return Inertia::render('Admin/Gallery/Edit', [
            'gallery' => $gallery,
        ]);
    }

    public function update(Request $request, Gallery $gallery): RedirectResponse
    {
        $validated = $request->validate([
            'title' => [
                'required',
                'string',
                'max:255',
            ],
            'description' => ['nullable', 'string'],
        ]);

        $gallery->update($validated);

        return back()->with(
            'success',
            'Album berhasil diperbarui.'
        );
    }

    public function destroy(Gallery $gallery): RedirectResponse
    {
        $gallery->load('images');

        foreach ($gallery->images as $image) {
            if (
                $image->image &&
                Storage::disk('public')->exists($image->image)
            ) {
                Storage::disk('public')->delete($image->image);
            }
        }

        // Record gallery_images akan ikut terhapus
        // karena foreign key menggunakan cascadeOnDelete().
        $gallery->delete();

        return redirect()
            ->route('gallery.index')
            ->with('success', 'Album berhasil dihapus.');
    }
}