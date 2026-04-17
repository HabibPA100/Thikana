<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\SubCategory;
use App\Models\Property;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug'
    ];

    public function subCategories()
    {
        return $this->hasMany(SubCategory::class);
    }

    public function properties()
    {
        return $this->hasMany(Property::class);
    }
}
