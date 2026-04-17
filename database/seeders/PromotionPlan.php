<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PromotionPlan as PromotionPlanModel;

class PromotionPlan extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PromotionPlanModel::insert([

            // Premium Plans
            [
                'name' => 'Premium',
                'duration_days' => 30,
                'price' => 1000,
                'priority' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Premium',
                'duration_days' => 15,
                'price' => 700,
                'priority' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Premium',
                'duration_days' => 7,
                'price' => 400,
                'priority' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Golden Plans
            [
                'name' => 'Golden',
                'duration_days' => 30,
                'price' => 700,
                'priority' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Golden',
                'duration_days' => 15,
                'price' => 500,
                'priority' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Golden',
                'duration_days' => 7,
                'price' => 300,
                'priority' => 6,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Silver Plans
            [
                'name' => 'Silver',
                'duration_days' => 30,
                'price' => 400,
                'priority' => 7,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Silver',
                'duration_days' => 15,
                'price' => 300,
                'priority' => 8,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Silver',
                'duration_days' => 7,
                'price' => 200,
                'priority' => 9,
                'created_at' => now(),
                'updated_at' => now(),
            ],

        ]);
    }
}