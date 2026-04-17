<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PropertyAttributeValue extends Model
{
    use HasFactory;

    protected $fillable = [
        'property_id',
        'attribute_id',
        'value_text',
        'value_number',
        'value_boolean',
        'value_date',
        'meta',
    ];

    protected $casts = [
        'value_number'  => 'decimal:2',
        'value_boolean' => 'boolean',
        'value_date'    => 'date',
        'meta'          => 'array',
    ];

    /**
     * 🔗 সম্পর্ক: এটি একটি Property এর অন্তর্গত
     */
    public function property()
    {
        return $this->belongsTo(Property::class);
    }

    /**
     * 🔗 সম্পর্ক: এটি একটি Attribute এর অন্তর্গত
     */
    public function attribute()
    {
        return $this->belongsTo(Attribute::class);
    }

    /**
     * 🔥 Helper: যেকোনো value return করার জন্য
     */
    public function getValueAttribute()
    {
        return $this->value_text
            ?? $this->value_number
            ?? $this->value_boolean
            ?? $this->value_date;
    }
}