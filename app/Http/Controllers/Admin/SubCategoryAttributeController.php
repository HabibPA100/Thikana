<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SubCategoryAttribute;
use Illuminate\Http\Request;

class SubCategoryAttributeController extends Controller
{
    public function index()
    {
        return response()->json(SubCategoryAttribute::latest()->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'sub_category_id' => 'required|exists:sub_categories,id',
            'attribute_id' => 'required|exists:attributes,id',
            'label' => 'nullable|string|max:255',
            'placeholder' => 'nullable|string|max:255',
            'order' => 'integer',
            'is_required' => 'boolean',
            'show_in_filter' => 'boolean',
            'conditions' => 'nullable|array',
        ]);

        $sca = SubCategoryAttribute::create($request->all());
        return response()->json($sca);
    }

    public function show($id)
    {
        return SubCategoryAttribute::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $sca = SubCategoryAttribute::findOrFail($id);

        $request->validate([
            'sub_category_id' => 'required|exists:sub_categories,id',
            'attribute_id' => 'required|exists:attributes,id',
            'label' => 'nullable|string|max:255',
            'placeholder' => 'nullable|string|max:255',
            'order' => 'integer',
            'is_required' => 'boolean',
            'show_in_filter' => 'boolean',
            'conditions' => 'nullable|array',
        ]);

        $sca->update($request->all());
        return response()->json($sca);
    }

    public function destroy($id)
    {
        $sca = SubCategoryAttribute::findOrFail($id);
        $sca->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}