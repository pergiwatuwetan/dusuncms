<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'DusunCMS') }}</title>

        <meta
            name="description"
            content="Website resmi dusun yang menyajikan informasi, berita, galeri, perangkat dusun, dan profil wilayah."
        >

        <meta
            name="theme-color"
            content="#16A34A"
        >

        <meta property="og:type" content="website">
        <meta property="og:title" content="{{ config('app.name', 'DusunCMS') }}">
        <meta
            property="og:description"
            content="Website resmi dusun yang menyajikan informasi dan layanan masyarakat."
        >

        <link rel="icon" href="{{ asset('favicon.ico') }}" sizes="any">
        <link rel="apple-touch-icon" href="{{ asset('apple-touch-icon.png') }}">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link
            href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap"
            rel="stylesheet"
        >

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite([
            'resources/js/app.jsx',
            "resources/js/Pages/{$page['component']}.jsx"
        ])
        @inertiaHead
    </head>

    <body class="font-sans antialiased">
        @inertia
    </body>
</html>