<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Property extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'post_type',
        'sub_category_id',
        'title',
        'description',
        'purpose',
        'rent_amount',
        'sell_price',
        'expected_budget',
        'division',
        'district',
        'area',
        'address',
        'latitude',
        'longitude',
        'available_from',
        'is_available',
        'contact_name',
        'contact_phone',
        'contact_email',
        'cover_image',
        'promotion_plan_id',
        'promotion_expires_at',
        'status',
        'is_featured',
        'views',
    ];

    protected $casts = [
        'latitude'              => 'decimal:7',
        'longitude'             => 'decimal:7',
        'available_from'        => 'date',
        'promotion_expires_at'  => 'datetime',
        'is_available'          => 'boolean',
        'is_featured'           => 'boolean',
    ];

    /**
     * 🔗 USER
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * 🔗 SUB CATEGORY
     */
    public function subCategory()
    {
        return $this->belongsTo(SubCategory::class);
    }

    /**
     * 🔗 ATTRIBUTE VALUES (Dynamic fields)
     */
    public function attributeValues()
    {
        return $this->hasMany(PropertyAttributeValue::class);
    }

    /**
     * 🔗 PROMOTION PLAN
     */
    public function promotionPlan()
    {
        return $this->belongsTo(PromotionPlan::class);
    }

    public function promotionRequest()
    {
        return $this->hasOne(PostPromotionRequest::class);
    }

    /**
     * 🔥 Access Category via SubCategory (Helper)
     */
    public function getCategoryAttribute()
    {
        return $this->subCategory?->category;
    }

    /**
     * 🔥 Scope: Active Properties
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'Active')
                     ->where('is_available', true);
    }

    /**
     * 🔥 Scope: Featured Properties
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * 🔥 Accessor: Price (rent or sell)
     */
    public function getPriceAttribute()
    {
        return $this->rent_amount ?? $this->sell_price;
    }
    
}