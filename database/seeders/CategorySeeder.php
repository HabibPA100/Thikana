<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Residential (আবাসিক)', 'slug' => 'residential'],
            ['name' => 'Commercial (বাণিজ্যিক)', 'slug' => 'commercial'],
            ['name' => 'Industrial & Warehouse (শিল্প ও গুদাম)', 'slug' => 'industrial-warehouse'],
            ['name' => 'Land (জমি)', 'slug' => 'land'],
            ['name' => 'Garage & Parking (গ্যারেজ ও পার্কিং)', 'slug' => 'garage-parking'],
            ['name' => 'Educational Space (শিক্ষামূলক স্পেস)', 'slug' => 'educational-space'],
            ['name' => 'Hospitality & Tourism (আতিথেয়তা ও পর্যটন)', 'slug' => 'hospitality-tourism'],
            ['name' => 'Specialized Space (বিশেষায়িত স্পেস)', 'slug' => 'specialized-space'],
            ['name' => 'Unique / Niche Property (বিশেষ ধরনের সম্পত্তি)', 'slug' => 'unique-property'],

            // Extra categories
            ['name' => 'Mixed-Use Property (মিশ্র ব্যবহার)', 'slug' => 'mixed-use'],
            ['name' => 'Co-working Space (শেয়ার্ড অফিস)', 'slug' => 'coworking'],
            ['name' => 'Event Space / Function Hall (ইভেন্ট স্পেস)', 'slug' => 'event-space'],
            ['name' => 'Agricultural Property (কৃষি জমি)', 'slug' => 'agricultural'],
            ['name' => 'Temporary / Construction Space (অস্থায়ী নির্মাণ স্পেস)', 'slug' => 'temporary-construction'],
            ['name' => 'Storage Units (স্টোরেজ)', 'slug' => 'storage'],
            ['name' => 'Studio Space (স্টুডিও)', 'slug' => 'studio'],
            ['name' => 'Healthcare Space (স্বাস্থ্যসেবা স্পেস)', 'slug' => 'healthcare'],
            ['name' => 'Transport / Terminal Space (পরিবহন স্পেস)', 'slug' => 'transport'],
            ['name' => 'Recreational Land (বিনোদনমূলক খোলা জায়গা)', 'slug' => 'recreational'],
        ];

        DB::table('categories')->insert($categories);
    }
}