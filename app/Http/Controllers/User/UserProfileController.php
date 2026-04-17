<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class UserProfileController extends Controller
{
    // Get current user profile
    public function getProfile(Request $request)
    {
        $user = $request->user(); // logged in user
        return response()->json([
            'user' => $user
        ]);
    }

    // Update user profile
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        // Validation
        $request->validate([
            'name' => 'required|string|max:255',
            'user_name' => ['required','string','max:255', Rule::unique('users')->ignore($user->id)],
            'email' => ['required','email','max:255', Rule::unique('users')->ignore($user->id)],
            'phone' => 'nullable|string|max:20',
            'status' => 'nullable|string|max:255',
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Update basic info
        $user->name = $request->name;
        $user->user_name = $request->user_name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->status = $request->status;

        // Update profile image if uploaded
        if ($request->hasFile('profile_image')) {
            // Delete old image if exists
            if ($user->profile_image && Storage::exists($user->profile_image)) {
                Storage::delete($user->profile_image);
            }

            $path = $request->file('profile_image')->store('profile_images', 'public');
            $user->profile_image = $path;
        }

        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user
        ]);
    }
}