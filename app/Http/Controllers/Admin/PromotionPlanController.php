<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PromotionPlan;
use Illuminate\Http\Request;

class PromotionPlanController extends Controller
{

    public function indexForUser()
    {
        // Return all plans for user
        $plans = PromotionPlan::all();
        return response()->json($plans);
    }

    // ✅ Get all plans
    public function index()
    {
        return response()->json(PromotionPlan::latest()->get());
    }

    // ✅ Store new plan
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'duration_days' => 'required|integer',
            'priority' => 'required|integer',
        ]);

        $plan = PromotionPlan::create($request->all());

        return response()->json([
            'message' => 'Plan created successfully',
            'data' => $plan
        ]);
    }

    // ✅ Show single
    public function show($id)
    {
        return response()->json(PromotionPlan::findOrFail($id));
    }

    // ✅ Update
    public function update(Request $request, $id)
    {
        $plan = PromotionPlan::findOrFail($id);

        $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'duration_days' => 'required|integer',
            'priority' => 'required|integer',
        ]);

        $plan->update($request->all());

        return response()->json([
            'message' => 'Plan updated successfully',
            'data' => $plan
        ]);
    }

    // ✅ Delete
    public function destroy($id)
    {
        $plan = PromotionPlan::findOrFail($id);
        $plan->delete();

        return response()->json([
            'message' => 'Plan deleted successfully'
        ]);
    }
}