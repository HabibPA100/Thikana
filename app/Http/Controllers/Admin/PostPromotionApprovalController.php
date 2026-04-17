<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PostPromotionRequest;
use Illuminate\Http\Request;

class PostPromotionApprovalController extends Controller
{
    // ✅ List pending requests
    public function index()
    {
        // dd(PostPromotionRequest::where('status', 'pending')->get());
        $requests = PostPromotionRequest::with('user', 'property', 'promotionPlan')
            ->where('status', 'pending')
            ->latest()
            ->get();

        return response()->json($requests);
    }

    // ✅ Approve request
    public function approve($id)
    {
        $req = PostPromotionRequest::findOrFail($id);
        $plan = $req->promotionPlan;

        $req->update([
            'status' => 'approved',
            'starts_at' => now(),
            'expires_at' => now()->addDays($plan->duration_days),
        ]);

        $req->property->update([
            'promotion_plan_id' => $plan->id,
            'promotion_expires_at' => now()->addDays($plan->duration_days),
        ]);

        return response()->json(['message' => 'Promotion approved']);
    }

    // ✅ Reject request
    public function reject($id)
    {
        $req = PostPromotionRequest::findOrFail($id);
        $req->update(['status' => 'rejected']);

        return response()->json(['message' => 'Promotion rejected']);
    }
}