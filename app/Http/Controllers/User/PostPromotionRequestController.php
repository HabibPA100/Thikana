<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\PostPromotionRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class PostPromotionRequestController extends Controller
{
    // ✅ User makes a promotion request
    public function store(Request $request)
    {
        $request->validate([
            'post_id' => 'required|exists:properties,id',
            'plan_id' => 'required|exists:promotion_plans,id',
            'payment_number' => 'required|digits_between:10,15',
            'payment_amount' => 'required|string',
            'payment_chanel' => 'required|string',
        ]);

        $exists = PostPromotionRequest::where('property_id', $request->post_id)
            ->where('status', 'pending')
            ->first();

        if ($exists) {
            return response()->json(['message' => 'You already have a pending request for this post'], 400);
        }

        $requestRecord = PostPromotionRequest::create([
            'user_id' => Auth::id(),
            'property_id' => $request->post_id,
            'promotion_plan_id' => $request->plan_id,
            'payment_number' => $request->payment_number,
            'payment_amount' => $request->payment_amount,
            'payment_chanel' => $request->payment_chanel,
            'status' => 'pending',
        ]);

        return response()->json(['message' => 'Promotion request submitted', 'data' => $requestRecord]);
    }

    // ✅ List user requests
    public function index()
    {
        $requests = PostPromotionRequest::with('property', 'promotionPlan')
            ->where('user_id', Auth::id())
            ->latest()
            ->get();

        return response()->json($requests);
    }
}