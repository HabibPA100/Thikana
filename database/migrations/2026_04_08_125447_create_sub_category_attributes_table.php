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
        Schema::create('sub_category_attributes', function (Blueprint $table) {
            $table->id();

            $table->foreignId('sub_category_id')->constrained()->cascadeOnDelete();
            $table->foreignId('attribute_id')->constrained()->cascadeOnDelete();

            // 🔥 UI CONTROL
            $table->string('label')->nullable(); // override label
            $table->string('placeholder')->nullable();

            // 🔥 ORDERING
            $table->integer('order')->default(0);

            // 🔥 VALIDATION
            $table->boolean('is_required')->default(false);

            // 🔥 FILTER SYSTEM
            $table->boolean('show_in_filter')->default(false);

            // 🔥 CONDITIONAL LOGIC (advanced)
            $table->json('conditions')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sub_category_attributes');
    }
};
