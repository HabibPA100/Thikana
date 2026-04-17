<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = DB::table('categories')->pluck('id', 'slug');

        $subCategories = [

            // Residential
            ['category_id' => $categories['residential'], 'name' => 'Apartment (ফ্ল্যাট)', 'slug' => 'apartment'],
            ['category_id' => $categories['residential'], 'name' => 'Family Flat (ফ্যামিলি ফ্ল্যাট)', 'slug' => 'family-flat'],
            ['category_id' => $categories['residential'], 'name' => 'House (বাসা)', 'slug' => 'house'],
            ['category_id' => $categories['residential'], 'name' => 'Sublet (সাবলেট)', 'slug' => 'sublet'],
            ['category_id' => $categories['residential'], 'name' => 'Hostel / Mess (মেস)', 'slug' => 'hostel-mess'],
            ['category_id' => $categories['residential'], 'name' => 'Duplex / Villa (ডুপ্লেক্স)', 'slug' => 'duplex-villa'],
            ['category_id' => $categories['residential'], 'name' => 'Luxury Apartment (লাক্সারি ফ্ল্যাট)', 'slug' => 'luxury-apartment'],

            // Commercial
            ['category_id' => $categories['commercial'], 'name' => 'Office Space (অফিস)', 'slug' => 'office'],
            ['category_id' => $categories['commercial'], 'name' => 'Shop (দোকান)', 'slug' => 'shop'],
            ['category_id' => $categories['commercial'], 'name' => 'Showroom (শোরুম)', 'slug' => 'showroom'],
            ['category_id' => $categories['commercial'], 'name' => 'Restaurant Space (রেস্টুরেন্ট স্পেস)', 'slug' => 'restaurant-space'],

            // Industrial
            ['category_id' => $categories['industrial-warehouse'], 'name' => 'Factory (কারখানা)', 'slug' => 'factory'],
            ['category_id' => $categories['industrial-warehouse'], 'name' => 'Warehouse (গুদাম)', 'slug' => 'warehouse'],
            ['category_id' => $categories['industrial-warehouse'], 'name' => 'Cold Storage (কোল্ড স্টোরেজ)', 'slug' => 'cold-storage'],

            // Land
            ['category_id' => $categories['land'], 'name' => 'Residential Plot (আবাসিক প্লট)', 'slug' => 'residential-plot'],
            ['category_id' => $categories['land'], 'name' => 'Commercial Plot (বাণিজ্যিক প্লট)', 'slug' => 'commercial-plot'],
            ['category_id' => $categories['land'], 'name' => 'Industrial Plot (শিল্প প্লট)', 'slug' => 'industrial-plot'],

            // Garage
            ['category_id' => $categories['garage-parking'], 'name' => 'Car Parking (কার পার্কিং)', 'slug' => 'car-parking'],
            ['category_id' => $categories['garage-parking'], 'name' => 'Bike Parking (বাইক পার্কিং)', 'slug' => 'bike-parking'],
            ['category_id' => $categories['garage-parking'], 'name' => 'Garage (গ্যারেজ)', 'slug' => 'garage'],

            // Educational
            ['category_id' => $categories['educational-space'], 'name' => 'School Building (স্কুল)', 'slug' => 'school'],
            ['category_id' => $categories['educational-space'], 'name' => 'Coaching Center (কোচিং)', 'slug' => 'coaching'],
            ['category_id' => $categories['educational-space'], 'name' => 'Training Center (ট্রেনিং)', 'slug' => 'training'],

            // Hospitality
            ['category_id' => $categories['hospitality-tourism'], 'name' => 'Hotel (হোটেল)', 'slug' => 'hotel'],
            ['category_id' => $categories['hospitality-tourism'], 'name' => 'Guest House (গেস্ট হাউস)', 'slug' => 'guest-house'],
            ['category_id' => $categories['hospitality-tourism'], 'name' => 'Resort (রিসোর্ট)', 'slug' => 'resort'],

            // Specialized
            ['category_id' => $categories['specialized-space'], 'name' => 'Clinic (ক্লিনিক)', 'slug' => 'clinic'],
            ['category_id' => $categories['specialized-space'], 'name' => 'Lab (ল্যাব)', 'slug' => 'lab'],
            ['category_id' => $categories['specialized-space'], 'name' => 'Data Center (ডাটা সেন্টার)', 'slug' => 'data-center'],

            // Unique
            ['category_id' => $categories['unique-property'], 'name' => 'Rooftop Space (ছাদ)', 'slug' => 'rooftop'],
            ['category_id' => $categories['unique-property'], 'name' => 'Container Space (কন্টেইনার)', 'slug' => 'container'],
            ['category_id' => $categories['unique-property'], 'name' => 'Floating Property (ভাসমান)', 'slug' => 'floating'],

            // Mixed Use
            ['category_id' => $categories['mixed-use'], 'name' => 'Shop + Apartment', 'slug' => 'shop-apartment'],
            ['category_id' => $categories['mixed-use'], 'name' => 'Office + Residence', 'slug' => 'office-residence'],

            // Coworking
            ['category_id' => $categories['coworking'], 'name' => 'Shared Desk', 'slug' => 'shared-desk'],
            ['category_id' => $categories['coworking'], 'name' => 'Private Cabin', 'slug' => 'private-cabin'],
            ['category_id' => $categories['coworking'], 'name' => 'Meeting Room', 'slug' => 'meeting-room'],

            // Event
            ['category_id' => $categories['event-space'], 'name' => 'Wedding Hall', 'slug' => 'wedding-hall'],
            ['category_id' => $categories['event-space'], 'name' => 'Conference Hall', 'slug' => 'conference-hall'],
            ['category_id' => $categories['event-space'], 'name' => 'Community Center', 'slug' => 'community-center'],

            // Agricultural
            ['category_id' => $categories['agricultural'], 'name' => 'Farm Land', 'slug' => 'farm-land'],
            ['category_id' => $categories['agricultural'], 'name' => 'Fish Farm', 'slug' => 'fish-farm'],
            ['category_id' => $categories['agricultural'], 'name' => 'Poultry Farm', 'slug' => 'poultry-farm'],

            // Temporary
            ['category_id' => $categories['temporary-construction'], 'name' => 'Construction Site', 'slug' => 'construction-site'],
            ['category_id' => $categories['temporary-construction'], 'name' => 'Site Office', 'slug' => 'site-office'],

            // Storage
            ['category_id' => $categories['storage'], 'name' => 'Mini Storage', 'slug' => 'mini-storage'],
            ['category_id' => $categories['storage'], 'name' => 'Personal Storage', 'slug' => 'personal-storage'],

            // Studio
            ['category_id' => $categories['studio'], 'name' => 'Photography Studio', 'slug' => 'photography-studio'],
            ['category_id' => $categories['studio'], 'name' => 'Music Studio', 'slug' => 'music-studio'],
            ['category_id' => $categories['studio'], 'name' => 'Other Studio', 'slug' => 'other-studio'],

            // Healthcare
            ['category_id' => $categories['healthcare'], 'name' => 'Doctor Chamber', 'slug' => 'doctor-chamber'],
            ['category_id' => $categories['healthcare'], 'name' => 'Diagnostic Center', 'slug' => 'diagnostic-center'],

            // Transport
            ['category_id' => $categories['transport'], 'name' => 'Bus Depot', 'slug' => 'bus-depot'],
            ['category_id' => $categories['transport'], 'name' => 'Truck Yard', 'slug' => 'truck-yard'],

            // Recreational
            ['category_id' => $categories['recreational'], 'name' => 'Playground', 'slug' => 'playground'],
            ['category_id' => $categories['recreational'], 'name' => 'Picnic Spot', 'slug' => 'picnic-spot'],
        ];

        DB::table('sub_categories')->insert($subCategories);
    }
}