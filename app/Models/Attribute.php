<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'label',
        'type',
        'group_name',
        'placeholder',
        'css_class',
        'order',
        'is_required',
        'is_filterable',
        'is_searchable',
        'options',
    ];

    protected $casts = [
        'is_required'   => 'boolean',
        'is_filterable' => 'boolean',
        'is_searchable' => 'boolean',
        'options'       => 'array',
    ];

    /**
     * 🔗 সম্পর্ক: SubCategoryAttribute (pivot with config)
     */
    public function subCategoryAttributes()
    {
        return $this->hasMany(SubCategoryAttribute::class);
    }

    /**
     * 🔗 সম্পর্ক: Property values
     */
    public function values()
    {
        return $this->hasMany(PropertyAttributeValue::class);
    }

    /**
     * 🔥 Helper: check type
     */
    public function isSelect()
    {
        return $this->type === 'select';
    }

    public function isCheckbox()
    {
        return $this->type === 'checkbox';
    }

    public function isText()
    {
        return $this->type === 'text';
    }

    public function isNumber()
    {
        return $this->type === 'number';
    }
}