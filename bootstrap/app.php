<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {

        $exceptions->respond(function (
            \Symfony\Component\HttpFoundation\Response $response,
            \Throwable $exception,
            \Illuminate\Http\Request $request
        ) {

            if ($request->expectsJson()) {
                return $response;
            }

            $status = $response->getStatusCode();

            if (in_array($status, [403, 404])) {
                return \Inertia\Inertia::render("Errors/{$status}")
                    ->toResponse($request)
                    ->setStatusCode($status);
            }

            if ($status === 500 && app()->environment('production')) {
                return \Inertia\Inertia::render('Errors/500')
                    ->toResponse($request)
                    ->setStatusCode(500);
            }

            return $response;
        });

    })
    ->create();