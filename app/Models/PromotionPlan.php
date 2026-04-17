<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PromotionPlan extends Model
{

    protected $fillable = [
        'name',
        'price',
        'duration_days',
        'priority'
    ];

    public function property()
    {
        return $this->hasMany(Property::class);
    }

}
