<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Attribute;

class ManageAttributeController extends Controller

{
    public function index()
    {
        return response()->json(Attribute::latest()->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:attributes,name',
            'label' => 'required|string|max:255',
            'type' => 'required|string',
            'group_name' => 'nullable|string|max:255',
            'placeholder' => 'nullable|string|max:255',
            'css_class' => 'nullable|string|max:255',
            'order' => 'integer',
            'is_required' => 'boolean',
            'is_filterable' => 'boolean',
            'is_searchable' => 'boolean',
            'options' => 'nullable|array',
        ]);

        $attribute = Attribute::create($request->all());
        return response()->json($attribute);
    }

    public function show($id)
    {
        return Attribute::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $attribute = Attribute::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255|unique:attributes,name,' . $attribute->id,
            'label' => 'required|string|max:255',
            'type' => 'required|string',
            'group_name' => 'nullable|string|max:255',
            'placeholder' => 'nullable|string|max:255',
            'css_class' => 'nullable|string|max:255',
            'order' => 'integer',
            'is_required' => 'boolean',
            'is_filterable' => 'boolean',
            'is_searchable' => 'boolean',
            'options' => 'nullable|array',
        ]);

        $attribute->update($request->all());
        return response()->json($attribute);
    }

    public function destroy($id)
    {
        $attribute = Attribute::findOrFail($id);
        $attribute->delete();
        return response()->json(['message' => 'Attribute deleted successfully']);
    }
}