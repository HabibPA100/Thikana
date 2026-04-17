<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // 🔥 GET All Categories
    public function index()
    {
        $categories = Category::all(['id', 'name']);
        return response()->json($categories);
    }
}