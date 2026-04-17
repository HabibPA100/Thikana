<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\PostPromotionRequest;
use App\Models\Property;
use Illuminate\Http\Request;
use App\Models\User; 


class AdminDashboardController extends Controller
{
    public function messageCount()
    {
        $count = Message::count();

        return response()->json([
            'total_message' => $count
        ]);
    }

    public function userCount()
    {
        $count = User::count();

        return response()->json([
            'total_users' => $count
        ]);
    }

    public function propertyCount()
    {
        $count = Property::count();

        return response()->json([
            'total_property_post' => $count
        ]);
    }

    public function planCount()
    {
        $count = PostPromotionRequest::count();

        return response()->json([
            'total_upgrade_request' => $count
        ]);
    }

    public function revenue()
    {
        $totalRevenue = PostPromotionRequest::where('status', 'approved')
                            ->sum('payment_amount');

        return response()->json([
            'revenue' => $totalRevenue
        ]);
    }

    public function latestUsers()
    {
        $users = User::latest()->take(10)->get();

        return response()->json($users);
    }

    public function users()
    {
        $users = User::latest()->get();

        return response()->json($users);
    }

    public function showDetails($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    public function getAllProperty()
    {
        $properties = Property::with(['user', 'subCategory.category'])
            ->latest()
            ->get();

        return response()->json($properties);
    }

    public function updatePropertyStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Active,Rented,Rejected'
        ]);

        $property = Property::findOrFail($id);
        $property->status = $request->status;
        $property->save();

        return response()->json([
            'message' => 'Status updated successfully',
            'property' => $property
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->status = $request->status;
        $user->save();

        return response()->json(['message' => 'Status updated successfuly']);
    }

    public function deleteUser($id)
    {
        User::findOrFail($id)->delete();

        return response()->json([
            'message' => 'User Deleted'
        ]);
    }
}
