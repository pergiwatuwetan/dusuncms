<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use App\Models\GalleryImage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GalleryImageController extends Controller
{
    public function store(Request $request, Gallery $gallery): RedirectResponse
    {
        $validated = $request->validate([
            'images' => [
                'required',
                'array',
                'min:1',
            ],
            'images.*' => [
                'required',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:4096',
            ],
        ]);

        $lastOrder = $gallery->images()->max('sort_order') ?? 0;

        foreach ($validated['images'] as $index => $image) {
            $path = $image->store('gallery', 'public');

            $gallery->images()->create([
                'image' => $path,
                'sort_order' => $lastOrder + $index + 1,
            ]);
        }

        return back()->with(
            'success',
            'Foto berhasil ditambahkan.'
        );
    }

    public function destroy(GalleryImage $galleryImage): RedirectResponse
    {
        if (
            $galleryImage->image &&
            Storage::disk('public')->exists($galleryImage->image)
        ) {
            Storage::disk('public')->delete($galleryImage->image);
        }

        $galleryImage->delete();

        return back()->with(
            'success',
            'Foto berhasil dihapus.'
        );
    }
}