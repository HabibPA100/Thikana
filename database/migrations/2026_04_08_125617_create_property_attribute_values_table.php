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
        Schema::create('property_attribute_values', function (Blueprint $table) {
            $table->id();

            // 🔗 RELATION
            $table->foreignId('property_id')->constrained()->cascadeOnDelete();
            $table->foreignId('attribute_id')->constrained()->cascadeOnDelete();

            // 🔥 VALUE TYPES (IMPORTANT)
            $table->text('value_text')->nullable();          // text, select
            $table->decimal('value_number', 12, 2)->nullable(); // number, price, area
            $table->boolean('value_boolean')->nullable();    // checkbox, yes/no
            $table->date('value_date')->nullable();          // date picker

            // 🔥 EXTRA FLEXIBILITY (OPTIONAL BUT POWERFUL)
            $table->json('meta')->nullable(); // multi-select, extra data

            $table->timestamps();

            // ⚡ INDEXING (VERY IMPORTANT FOR PERFORMANCE)
            $table->index(['property_id', 'attribute_id']);
            $table->index('value_number');
            $table->index('value_boolean');
            $table->index('value_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('property_attribute_values');
    }
};
