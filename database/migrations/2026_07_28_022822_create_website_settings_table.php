<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('website_settings', function (Blueprint $table) {
            $table->id();

            // General
            $table->string('village_name')->default('Nama Dusun');
            $table->string('logo')->nullable();
            $table->string('hero_image')->nullable();

            // Profile
            $table->text('history')->nullable();
            $table->text('vision')->nullable();
            $table->text('mission')->nullable();

            // Head
            $table->string('head_name')->nullable();
            $table->text('head_greeting')->nullable();

            // Contact
            $table->string('address')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();

            // Maps
            $table->text('maps_embed')->nullable();

            // Statistics
            $table->unsignedInteger('population')->default(0);
            $table->unsignedInteger('family_cards')->default(0);
            $table->unsignedInteger('rt_count')->default(0);
            $table->unsignedInteger('rw_count')->default(0);
            $table->decimal('area_size', 10, 2)->default(0);

            // Social Media
            $table->string('facebook')->nullable();
            $table->string('instagram')->nullable();
            $table->string('youtube')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('website_settings');
    }
};