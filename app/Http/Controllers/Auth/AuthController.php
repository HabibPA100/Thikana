<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AuthController extends Controller
{
    // Register
    public function register(Request $request)
    {
        // Validate input
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255|unique:users,email',
            'password' => 'required|string|min:6',
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Handle profile image upload
        $imageName = null;
        if ($request->hasFile('profile_image')) {
            $path = $request->file('profile_image')->store('profile_images', 'public');
            $imageName = $path; // Save relative path for storage
        }

        // Generate unique username
        do {
            $username = Str::slug($request->name) . rand(1000, 9999);
        } while (User::where('user_name', $username)->exists());

        // Create user
        $user = User::create([
            'name' => $request->name,
            'user_name' => $username,
            'phone' => $request->phone,
            'profile_image' => $imageName,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'user',
        ]);

        return response()->json([
            'message' => "User created successfully",
            'user' => $user
        ]);
    }

    // Login
    public function login(Request $request)
    {
        // ✅ validation
        $request->validate([
            'login' => 'required',
            'password' => 'required'
        ]);

        $loginInput = $request->input('login');

        // 🔍 check login type (email / phone / username)
        if (filter_var($loginInput, FILTER_VALIDATE_EMAIL)) {
            $field = 'email';
        } elseif (is_numeric($loginInput)) {
            $field = 'phone';
        } else {
            $field = 'user_name';
        }

        // ✅ attempt login
        if (Auth::attempt([$field => $loginInput, 'password' => $request->password])) {

            $user = Auth::user();

            // ✅ STATUS CHECK
            if ($user->status === 'inactive') {
                Auth::logout(); // 🔥 important

                return response()->json([
                    'message' => 'আপনার একাউন্টটি সাময়িকভাবে বন্ধ আছে। অনুগ্রহ করে এডমিনের সাথে যোগাযোগ করুন। mail to => mythikana360@gmail.com'
                ], 403);
            }

            if ($user->status === 'suspended') {
                Auth::logout(); // 🔥 important

                return response()->json([
                    'message' => 'আমাদের প্ল্যাটফর্মের নিয়ম বার বার লঙ্ঘন করায় আপনার একাউন্টটি suspend করা হয়েছে। mail to => mythikana360@gmail.com'
                ], 403);
            }


            $token = $user->createToken('token')->plainTextToken;
            return response()->json([
                'message' => 'Login successful',
                'user' => $user,
                'token' => $token
            ], 200);
        }

        // ❌ failed login
        return response()->json([
            'message' => 'Invalid credentials'
        ], 401);
    }

    // Logout
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message'=>"Logged out"
        ]);
    }


    public function forgetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $otp = rand(100000, 999999);

        // store OTP in database (password_resets table recommended)
        DB::table('password_resets')->updateOrInsert(
            ['email' => $request->email],
            [
                'token' => $otp,
                'created_at' => Carbon::now()
            ]
        );

        // send email
        Mail::raw("Your OTP is: $otp", function ($message) use ($request) {
            $message->to($request->email)
                    ->subject('Password Reset OTP');
        });

        return response()->json(['message' => 'OTP sent to email']);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required',
            'password' => 'required|min:6'
        ]);

        $record = DB::table('password_resets')
            ->where('email', $request->email)
            ->where('token', $request->otp)
            ->first();

        if (!$record) {
            return response()->json(['message' => 'Invalid OTP'], 400);
        }

        // OTP expiry check (10 minutes)
        if (Carbon::parse($record->created_at)->addMinutes(10)->isPast()) {
            return response()->json(['message' => 'OTP expired'], 400);
        }

        $user = User::where('email', $request->email)->first();

        $user->password = Hash::make($request->password);
        $user->save();

        // delete OTP after use
        DB::table('password_resets')->where('email', $request->email)->delete();

        return response()->json(['message' => 'Password reset successful']);
    }

}