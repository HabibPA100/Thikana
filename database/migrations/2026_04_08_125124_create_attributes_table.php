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
        Schema::create('attributes', function (Blueprint $table) {
            $table->id();

            // BASIC
            $table->string('name'); // internal নাম
            $table->string('label'); // UI label

            // UI CONTROL
            $table->string('type'); // text, number, select, checkbox
            $table->string('group_name')->nullable(); // Basic Info, Location, etc
            $table->string('placeholder')->nullable();

            // STYLE / UI
            $table->string('css_class')->nullable();
            $table->integer('order')->default(0);

            // LOGIC
            $table->boolean('is_required')->default(false);
            $table->boolean('is_filterable')->default(false);
            $table->boolean('is_searchable')->default(false);

            // DATA (for select, checkbox)
            $table->json('options')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attributes');
    }
};
