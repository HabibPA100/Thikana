<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use App\Models\Property;
use App\Models\Attribute;

class SubCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'name',
        'slug',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function properties()
    {
        return $this->hasMany(Property::class);
    }

    public function attributes()
    {
        return $this->belongsToMany(Attribute::class, 'sub_category_attributes')
            ->withPivot(['is_required', 'order'])
            ->withTimestamps();
    }
}
 