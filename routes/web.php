<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\GalleryImageController;
use App\Http\Controllers\Admin\NewsController;
use App\Http\Controllers\Admin\VillageOfficialController;
use App\Http\Controllers\PublicVillageOfficialController;
use App\Http\Controllers\Admin\WebsiteSettingController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\PublicGalleryController;
use App\Http\Controllers\PublicNewsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Website
|--------------------------------------------------------------------------
*/

Route::get('/', [PublicController::class, 'index'])
    ->name('home');

/*
|--------------------------------------------------------------------------
| Public News
|--------------------------------------------------------------------------
*/

Route::get('/berita', [PublicNewsController::class, 'index'])
    ->name('public.news.index');

Route::get('/berita/{slug}', [PublicNewsController::class, 'show'])
    ->name('public.news.show');

/*
|--------------------------------------------------------------------------
| Public Gallery
|--------------------------------------------------------------------------
*/

Route::get('/galeri', [PublicGalleryController::class, 'index'])
    ->name('public.gallery.index');

Route::get('/galeri/{gallery}', [PublicGalleryController::class, 'show'])
    ->name('public.gallery.show');

    /*
|--------------------------------------------------------------------------
| Public Village Officials
|--------------------------------------------------------------------------
*/

Route::get('/perangkat-dusun', [PublicVillageOfficialController::class, 'index'])
    ->name('public.village-officials.index');

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Dashboard
    |--------------------------------------------------------------------------
    */

    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    /*
    |--------------------------------------------------------------------------
    | Website Settings
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/website-settings',
        [WebsiteSettingController::class, 'edit']
    )->name('website-settings.edit');

    Route::match(
        ['post', 'put'],
        '/website-settings',
        [WebsiteSettingController::class, 'update']
    )->name('website-settings.update');

    /*
    |--------------------------------------------------------------------------
    | News
    |--------------------------------------------------------------------------
    */

    Route::resource('news', NewsController::class);

    /*
    |--------------------------------------------------------------------------
    | Gallery
    |--------------------------------------------------------------------------
    */

    Route::resource('gallery', GalleryController::class);

    /*
    |--------------------------------------------------------------------------
    | Village Officials
    |--------------------------------------------------------------------------
    */

    Route::resource('village-officials', VillageOfficialController::class);

    /*
    |--------------------------------------------------------------------------
    | Gallery Images
    |--------------------------------------------------------------------------
    */

    Route::post(
        'gallery/{gallery}/images',
        [GalleryImageController::class, 'store']
    )->name('gallery.images.store');

    Route::delete(
        'gallery-images/{galleryImage}',
        [GalleryImageController::class, 'destroy']
    )->name('gallery.images.destroy');
});

require __DIR__ . '/auth.php';