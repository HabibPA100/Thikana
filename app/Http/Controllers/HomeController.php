<?php

namespace App\Http\Controllers;

use App\Models\HouseRental;
use App\Models\Property;
use Illuminate\Http\Request;

class HomeController extends Controller
{

    public function search(Request $request)
    {
        $query = Property::query()->with(['user','subCategory.category']);

        // 🔍 Category filter
        if ($request->category_id) {
            $query->whereHas('subCategory.category', function ($q) use ($request) {
                $q->where('id', $request->category_id);
            });
        }

        // 🔍 SubCategory filter
        if ($request->sub_category_id) {
            $query->where('sub_category_id', $request->sub_category_id);
        }

        // 🔥 Purpose filter (NEW)
        if ($request->purpose) {
            $query->where('purpose', $request->purpose);
        }

        // 🔍 Division
        if ($request->division) {
            $query->where('division', $request->division);
        }

        // 🔍 District
        if ($request->district) {
            $query->where('district', $request->district);
        }

        // 🔍 Area
        if ($request->area) {
            $query->where('area', 'LIKE', '%' . $request->area . '%');
        }

        // 🔍 Price range (UPDATED 🔥)
        if ($request->min_price) {
            $query->where(function ($q) use ($request) {

                if ($request->purpose === 'rent') {
                    $q->where('rent_amount', '>=', $request->min_price);
                } elseif ($request->purpose === 'sell') {
                    $q->where('sell_price', '>=', $request->min_price);
                } else {
                    // 👉 যদি purpose না থাকে → দুইটাই check
                    $q->where('rent_amount', '>=', $request->min_price)
                    ->orWhere('sell_price', '>=', $request->min_price);
                }

            });
        }

        if ($request->max_price) {
            $query->where(function ($q) use ($request) {

                if ($request->purpose === 'rent') {
                    $q->where('rent_amount', '<=', $request->max_price);
                } elseif ($request->purpose === 'sell') {
                    $q->where('sell_price', '<=', $request->max_price);
                } else {
                    $q->where('rent_amount', '<=', $request->max_price)
                    ->orWhere('sell_price', '<=', $request->max_price);
                }

            });
        }

        // 🔍 Keyword
        if ($request->keyword) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'LIKE', '%' . $request->keyword . '%')
                ->orWhere('description', 'LIKE', '%' . $request->keyword . '%');
            });
        }

        // 🔥 Final result
        $properties = $query->active()->latest()->paginate(10);

        return response()->json($properties);
    }


    public function index()
    {
        $posts = Property::with([
                'user' => function ($query) {
                    $query->where('status', 'active');
                },
                'subCategory',
                'attributeValues.attribute',
                'promotionPlan'
            ])
            ->leftJoin('promotion_plans', 'properties.promotion_plan_id', '=', 'promotion_plans.id')
            ->where('properties.status', 'Active')
            ->whereHas('user', function ($query) {
                $query->where('status', 'active');
            })

            ->where(function ($query) {
                    $query->whereNull('promotion_expires_at')
                        ->orWhere('promotion_expires_at', '>=', now());
                })
                                    
            // promoted first
            ->orderByRaw('promotion_plans.priority IS NULL') 
            
            // priority order
            ->orderBy('promotion_plans.priority', 'asc')
            
            // latest promoted first
            ->orderBy('properties.promotion_expires_at', 'desc')
            
            // normal posts latest first
            ->orderBy('properties.created_at', 'desc')

            ->select('properties.*')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $posts
        ]);
    }

    // single post (optional)
    public function showDetails($id)
    {
        $post = Property::with([
            'user',
            'subCategory',
            'attributeValues.attribute'
        ])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $post
        ]);
    }
}
