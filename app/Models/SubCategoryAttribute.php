<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubCategoryAttribute extends Model
{
    use HasFactory;

    protected $fillable = [
        'sub_category_id',
        'attribute_id',
        'label',
        'placeholder',
        'order',
        'is_required',
        'show_in_filter',
        'conditions',
    ];

    protected $casts = [
        'is_required'    => 'boolean',
        'show_in_filter' => 'boolean',
        'conditions'     => 'array',
    ];

    /**
     * 🔗 সম্পর্ক: এটি একটি SubCategory এর অন্তর্গত
     */
    public function subCategory()
    {
        return $this->belongsTo(SubCategory::class);
    }

    /**
     * 🔗 সম্পর্ক: এটি একটি Attribute এর অন্তর্গত
     */
    public function attribute()
    {
        return $this->belongsTo(Attribute::class);
    }

    /**
     * 🔥 Accessor: label fallback (attribute name)
     */
    public function getDisplayLabelAttribute()
    {
        return $this->label ?? $this->attribute?->name;
    }
}