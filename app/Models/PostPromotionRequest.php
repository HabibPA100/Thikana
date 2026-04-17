<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostPromotionRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'property_id',
        'promotion_plan_id',
        'starts_at',
        'expires_at',
        'status',
        'payment_number',
        'payment_amount',
        'payment_chanel',
    ];

    // Relations
    public function promotionPlan()
    {
        return $this->belongsTo(PromotionPlan::class);
    }

    public function property()
    {
        return $this->belongsTo(Property::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}