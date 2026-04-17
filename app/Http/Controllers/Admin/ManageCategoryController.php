<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class ManageCategoryController extends Controller
{
    public function index()
    {
        $categories = Category::latest()->get();
        return response()->json($categories);
    }

    public function store(Request $request)
    {
        // Validate both name and slug
        $request->validate([
            'name' => 'required|unique:categories,name|max:255',
            'slug' => 'required|unique:categories,slug|max:255',
        ]);

        $category = Category::create([
            'name' => $request->name,
            'slug' => $request->slug,
        ]);

        return response()->json($category);
    }

    public function show($id)
    {
        return Category::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        // Validate name and slug, ignore current record for uniqueness
        $request->validate([
            'name' => 'required|unique:categories,name,' . $category->id . '|max:255',
            'slug' => 'required|unique:categories,slug,' . $category->id . '|max:255',
        ]);

        $category->update([
            'name' => $request->name,
            'slug' => $request->slug,
        ]);

        return response()->json($category);
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return response()->json(['message' => 'Category deleted successfully']);
    }
}