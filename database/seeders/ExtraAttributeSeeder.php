<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExtraAttributeSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();
        $i = 1;

        $make = function ($data) use (&$i, $now) {
            return [
                'name' => $data['name'],
                'label' => $data['label'],
                'type' => $data['type'],
                'group_name' => $data['group_name'],

                'placeholder' => $data['placeholder'] ?? null,
                'css_class' => $data['css_class'] ?? null,
                'order' => $data['order'] ?? $i++,

                'is_required' => $data['is_required'] ?? false,
                'is_filterable' => $data['is_filterable'] ?? false,
                'is_searchable' => $data['is_searchable'] ?? false,

                'options' => isset($data['options']) ? json_encode($data['options']) : null,

                'created_at' => $now,
                'updated_at' => $now,
            ];
        };

        $attributes = array_map($make, [

            // ================= RESIDENTIAL =================
            ['name'=>'bedrooms','label'=>'Bedrooms','type'=>'text','group_name'=>'Residential','order'=>1],
            ['name'=>'bathrooms','label'=>'Bathrooms','type'=>'text','group_name'=>'Residential','order'=>2],
            ['name'=>'size_sqft','label'=>'Size in SQFT','type'=>'text','group_name'=>'Residential','order'=>3],
            ['name'=>'balcony','label'=>'Balcony','type'=>'text','group_name'=>'Residential','order'=>4],
            ['name'=>'floor','label'=>'Floor','type'=>'text','group_name'=>'Residential','order'=>5],
            ['name'=>'total_floor','label'=>'Total Floor','type'=>'text','group_name'=>'Residential','order'=>6],
            ['name'=>'furnished','label'=>'Furnished','type'=>'select','group_name'=>'Residential','order'=>7,'options'=>['Full','Semi','No']],
            ['name'=>'family_allowed','label'=>'Family Allowed','type'=>'checkbox','group_name'=>'Residential','order'=>8],
            ['name'=>'bachelor_allowed','label'=>'Bachelor Allowed','type'=>'checkbox','group_name'=>'Residential','order'=>9],
            ['name'=>'gas','label'=>'Gas','type'=>'checkbox','group_name'=>'Residential','order'=>10],
            ['name'=>'electricity','label'=>'Electricity','type'=>'checkbox','group_name'=>'Residential','order'=>11],
            ['name'=>'water_supply','label'=>'Water Supply','type'=>'checkbox','group_name'=>'Residential','order'=>12],
            // ================= COMMERCIAL =================
            ['name'=>'floor_text','label'=>'Floor Number','type'=>'number','group_name'=>'Commercial','order'=>1],
            ['name'=>'total_floor','label'=>'Total Floor','type'=>'number','group_name'=>'Commercial','order'=>2],
            ['name'=>'front_road_width','label'=>'Front Road Width','type'=>'number','group_name'=>'Commercial','order'=>3],
            ['name'=>'generator','label'=>'Generator','type'=>'checkbox','group_name'=>'Commercial','order'=>4],
            ['name'=>'lift','label'=>'Lift','type'=>'checkbox','group_name'=>'Commercial','order'=>5],
            ['name'=>'parking','label'=>'Parking','type'=>'checkbox','group_name'=>'Commercial','order'=>6],
            ['name'=>'security','label'=>'Security','type'=>'checkbox','group_name'=>'Commercial','order'=>7],

            // ================= INDUSTRIAL =================
            ['name'=>'ceiling_height','label'=>'Ceiling Height','type'=>'number','group_name'=>'Industrial','order'=>1],
            ['name'=>'floor_load_capacity','label'=>'Floor Load Capacity','type'=>'number','group_name'=>'Industrial','order'=>2],
            ['name'=>'loading_dock','label'=>'Loading Dock','type'=>'checkbox','group_name'=>'Industrial','order'=>3],
            ['name'=>'truck_access','label'=>'Truck Access','type'=>'checkbox','group_name'=>'Industrial','order'=>4],
            ['name'=>'power_supply','label'=>'Power Supply','type'=>'text','group_name'=>'Industrial','order'=>5],
            ['name'=>'fire_safety','label'=>'Fire Safety','type'=>'checkbox','group_name'=>'Industrial','order'=>6],

            // ================= LAND =================
            ['name'=>'land_size','label'=>'Land Size','type'=>'number','group_name'=>'Land','order'=>1],
            ['name'=>'land_type','label'=>'Land Type','type'=>'select','group_name'=>'Land','order'=>2,'options'=>['Residential','Commercial','Agricultural']],
            ['name'=>'road_access','label'=>'Road Access','type'=>'checkbox','group_name'=>'Land','order'=>3],
            ['name'=>'corner_plot','label'=>'Corner Plot','type'=>'checkbox','group_name'=>'Land','order'=>4],
            ['name'=>'water_source','label'=>'Water Source','type'=>'text','group_name'=>'Land','order'=>5],
            ['name'=>'electricity','label'=>'Electricity','type'=>'checkbox','group_name'=>'Land','order'=>6],

            // ================= EVENT SPACE =================
            ['name'=>'capacity','label'=>'Capacity','type'=>'number','group_name'=>'Event Space','order'=>1],
            ['name'=>'ac','label'=>'AC','type'=>'checkbox','group_name'=>'Event Space','order'=>2],
            ['name'=>'stage','label'=>'Stage','type'=>'checkbox','group_name'=>'Event Space','order'=>3],
            ['name'=>'sound_system','label'=>'Sound System','type'=>'checkbox','group_name'=>'Event Space','order'=>4],
            ['name'=>'parking','label'=>'Parking','type'=>'checkbox','group_name'=>'Event Space','order'=>5],
            ['name'=>'catering','label'=>'Catering','type'=>'checkbox','group_name'=>'Event Space','order'=>6],

            // ================= CO-WORKING =================
            ['name'=>'desk_type','label'=>'Desk Type','type'=>'select','group_name'=>'Co-working','order'=>1,'options'=>['Shared','Private']],
            ['name'=>'internet','label'=>'Internet','type'=>'checkbox','group_name'=>'Co-working','order'=>2],
            ['name'=>'meeting_room','label'=>'Meeting Room','type'=>'checkbox','group_name'=>'Co-working','order'=>3],
            ['name'=>'power_backup','label'=>'Power Backup','type'=>'checkbox','group_name'=>'Co-working','order'=>4],

            // ================= STUDIO =================
            ['name'=>'studio_type','label'=>'Studio Type','type'=>'select','group_name'=>'Studio','order'=>1,'options'=>['Photography','Music','Video']],
            ['name'=>'soundproof','label'=>'Soundproof','type'=>'checkbox','group_name'=>'Studio','order'=>2],
            ['name'=>'lighting_setup','label'=>'Lighting Setup','type'=>'checkbox','group_name'=>'Studio','order'=>3],
            ['name'=>'equipment','label'=>'Equipment','type'=>'checkbox','group_name'=>'Studio','order'=>4],

            // ================= HEALTHCARE =================
            ['name'=>'chamber_type','label'=>'Chamber Type','type'=>'select','group_name'=>'Healthcare','order'=>1,'options'=>['Doctor','Dental','Diagnostic']],
            ['name'=>'waiting_area','label'=>'Waiting Area','type'=>'checkbox','group_name'=>'Healthcare','order'=>2],
            ['name'=>'medical_equipment','label'=>'Medical Equipment','type'=>'checkbox','group_name'=>'Healthcare','order'=>3],

            // ================= TRANSPORT =================
            ['name'=>'vehicle_type','label'=>'Vehicle Type','type'=>'select','group_name'=>'Transport','order'=>1,'options'=>['Car','Truck','Bus','Bike']],
            ['name'=>'capacity','label'=>'Capacity','type'=>'number','group_name'=>'Transport','order'=>2],
            ['name'=>'security','label'=>'Security','type'=>'checkbox','group_name'=>'Transport','order'=>3],
            ['name'=>'covered','label'=>'Covered','type'=>'checkbox','group_name'=>'Transport','order'=>4],

            // ================= RECREATIONAL =================
            ['name'=>'field_type','label'=>'Field Type','type'=>'select','group_name'=>'Recreational','order'=>1,'options'=>['Playground','Picnic Spot','Camp']],
            ['name'=>'capacity','label'=>'Capacity','type'=>'number','group_name'=>'Recreational','order'=>2],
            ['name'=>'parking','label'=>'Parking','type'=>'checkbox','group_name'=>'Recreational','order'=>3],
            ['name'=>'washroom','label'=>'Washroom','type'=>'checkbox','group_name'=>'Recreational','order'=>4],
        ]);

        DB::table('attributes')->insert($attributes);
    }
}