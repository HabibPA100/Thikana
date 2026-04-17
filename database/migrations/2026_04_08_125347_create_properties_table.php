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
        Schema::create('properties', function (Blueprint $table) {
            $table->id();

            // USER
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            // CATEGORY
            $table->foreignId('sub_category_id')->constrained();

            // BASIC
            $table->string('title');
            $table->string('description')->nullable();
            $table->string('rent_amount')->nullable();
            $table->string('sell_price')->nullable();

            // LOCATION
            $table->string('division');
            $table->string('district');
            $table->string('area');
            $table->string('address');
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();

            // AVAILABILITY
            $table->date('available_from')->nullable();
            $table->boolean('is_available')->default(true);

            // CONTACT
            $table->string('contact_name');
            $table->string('contact_phone');
            $table->string('contact_email')->nullable();

            // MEDIA
            $table->string('cover_image')->nullable();

            // PROMOTION
            $table->foreignId('promotion_plan_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamp('promotion_expires_at')->nullable();

            // STATUS
            $table->enum('purpose', ['rent', 'sell']);
            $table->enum('status', ['Active', 'Rented', 'Rejected'])->default('Active');

            $table->boolean('is_featured')->default(false);
            $table->unsignedBigInteger('views')->default(0);

            $table->softDeletes();
            $table->timestamps();

            // INDEX
            $table->index(['district', 'area']);
            $table->index(['rent_amount', 'sell_price']);
            $table->index(['status', 'is_available']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
