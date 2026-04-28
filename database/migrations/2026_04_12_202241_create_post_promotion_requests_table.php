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
        Schema::create('post_promotion_requests', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('property_id')->constrained()->cascadeOnDelete();
            $table->foreignId('promotion_plan_id')->constrained()->cascadeOnDelete();

            $table->timestamp('starts_at')->nullable();
            $table->timestamp('expires_at')->nullable();

             $table->enum('status', [
                                'draft',
                                'pending',
                                'active',
                                'paused',
                                'expired',
                                'rejected'
                            ])->default('draft');

            // Payment phone number field
            $table->string('payment_number')->nullable();
            $table->string('payment_amount')->nullable();
            $table->string('payment_chanel')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post_promotion_requests');
    }
};
