<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\SubCategory;
use Illuminate\Http\Request;

class SubCategoryController extends Controller
{

     // 🔥 GET Subcategories by Category
    public function byCategory($categoryId)
    {
        $subCategories = SubCategory::where('category_id', $categoryId)->get(['id', 'name']);
        return response()->json($subCategories);
    }

    /**
     * 🔥 GET SubCategory with Attributes
     */
    public function show($id)
    {
        $subCategory = SubCategory::with([
            'attributes' => function ($query) {
                $query->orderBy('sub_category_attributes.order');
            }
        ])->findOrFail($id);

        // 🔥 FORMAT RESPONSE (Frontend friendly)
        $attributes = $subCategory->attributes->map(function ($attr) {

            return [
                'id' => $attr->id,
                'name' => $attr->name,
                'label' => $attr->label,
                'type' => $attr->type,
                'placeholder' => $attr->placeholder,
                'is_required' => $attr->pivot->is_required ?? false,
                'order' => $attr->pivot->order ?? 0,
            ];
        });

        return response()->json([
            'id' => $subCategory->id,
            'name' => $subCategory->name,
            'attributes' => $attributes
        ]);
    }
}