<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ManageSubCategoryController extends Controller
{
    public function index()
    {
        return response()->json(SubCategory::with('category')->latest()->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
        ]);

        $subCategory = SubCategory::create([
            'category_id' => $request->category_id,
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        return response()->json($subCategory);
    }

    public function show($id)
    {
        return SubCategory::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $subCategory = SubCategory::findOrFail($id);

        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
        ]);

        $subCategory->update([
            'category_id' => $request->category_id,
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        return response()->json($subCategory);
    }

    public function destroy($id)
    {
        SubCategory::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}