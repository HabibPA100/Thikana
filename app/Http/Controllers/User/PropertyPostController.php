<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Property;
use App\Models\PropertyAttributeValue;
use App\Models\Attribute;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PropertyPostController extends Controller
{
    /**
     * 📥 GET ALL (ONLY USER OWN)
     */
   public function index()
    {
        $user = Auth::user();

        $properties = Property::with([
                'user',
                'subCategory',
                'attributeValues.attribute',
                'promotionRequest'
            ])
            ->where('user_id', $user->id)
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $properties
        ]);
    }

    /**
     * 📥 SINGLE PROPERTY (ONLY OWN)
     */
    public function show($id)
    {
        return Property::where('user_id', Auth::id())
            ->with(['subCategory', 'attributeValues'])
            ->findOrFail($id);
    }

    /**
     * ✅ STORE PROPERTY
     */
    public function store(Request $request)
    {
        DB::beginTransaction();

        try {

            $data = $request->validate([
                'post_type' => 'required|string',
                'sub_category_id' => 'required|exists:sub_categories,id',
                'title' => 'required|string|max:255',
                'description' => 'required_unless:post_type,owner|nullable|string',

                'purpose' => 'required|in:rent,sell,wanted',
                'rent_amount' => 'nullable|numeric',
                'sell_price' => 'nullable|numeric',
                'expected_budget' => 'nullable|numeric',

                'division' => 'required|string',
                'district' => 'required|string',
                'area' => 'required|string',
                'address' => 'required|string',

                'contact_name' => 'required|string',
                'contact_phone' => 'required|string',
                'contact_email' => 'nullable|email',

                'cover_image' => 'required_if:post_type,owner|nullable|image|max:2048',
            ]);

            // PURPOSE FIX
            if ($data['purpose'] === 'rent') {
                $data['sell_price'] = null;
                $data['expected_budget'] = null;
            } elseif ($data['purpose'] === 'sell') {
                $data['rent_amount'] = null;
                $data['expected_budget'] = null;
            } elseif ($data['purpose'] === 'wanted') {
                $data['rent_amount'] = null;
                $data['sell_price'] = null;
            }

            // IMAGE UPLOAD
            if ($request->hasFile('cover_image')) {
                $data['cover_image'] = $request->file('cover_image')->store('properties', 'public');
            }

            $data['user_id'] = Auth::id();

            $property = Property::create($data);

            // ✅ FIX: JSON decode
            $this->saveAttributes($request->input('attributes'), $property->id);

            DB::commit();

            return response()->json([
                'message' => 'Property Created',
                'data' => $property
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * ✏️ UPDATE PROPERTY (ONLY OWN)
     */
    public function update(Request $request, $id)
    {
        DB::beginTransaction();

        try {

            $property = Property::where('user_id', Auth::id())->findOrFail($id);

            $data = $request->validate([
                'post_type' => 'required|string',
                'sub_category_id' => 'required|exists:sub_categories,id',
                'title' => 'sometimes|required|string|max:255',
                'description' => 'sometimes|required_unless:post_type,owner|nullable|string',

                'purpose' => 'required|in:rent,sell,wanted',
                'rent_amount' => 'nullable|numeric',
                'sell_price' => 'nullable|numeric',
                'expected_budget' => 'nullable|numeric',

                'division' => 'sometimes|required|string',
                'district' => 'sometimes|required|string',
                'area' => 'sometimes|required|string',
                'address' => 'sometimes|required|string',

                'contact_name' => 'sometimes|required|string',
                'contact_phone' => 'sometimes|required|string',
                'contact_email' => 'nullable|email',

                'cover_image' => 'sometimes|required_if:post_type,owner|nullable|image|max:2048',
            ]);

            // 🔥 IMAGE UPDATE
            if ($request->hasFile('cover_image')) {
                $data['cover_image'] = $request->file('cover_image')->store('properties', 'public');
            }

            $property->update($data);

            // ✅ FIX: JSON decode
            $this->saveAttributes($request->input('attributes'), $property->id);

            DB::commit();

            return response()->json([
                'message' => 'Property Updated'
            ]);

        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * ❌ DELETE PROPERTY (ONLY OWN)
     */
    public function destroy($id)
    {
        $property = Property::where('user_id', Auth::id())->findOrFail($id);

        $property->delete();

        return response()->json([
            'message' => 'Property Deleted'
        ]);
    }

    /**
     * 🔥 SAVE ATTRIBUTE VALUES
     */
    private function saveAttributes($attributesJson, $propertyId)
    {
        $attributes = json_decode($attributesJson, true);

        // Validate input
        if (!is_array($attributes)) {
            return;
        }

        foreach ($attributes as $attr) {

            // Skip invalid data
            if (!isset($attr['id'])) {
                continue;
            }

            $attribute = Attribute::find($attr['id']);

            // Skip if attribute not found
            if (!$attribute) {
                continue;
            }

            $value = $attr['value'] ?? null;

            // Skip empty values (optional)
            if ($value === null || $value === '') {
                continue;
            }

            // Base data
            $data = [
                'property_id'  => $propertyId,
                'attribute_id' => $attr['id'],
                'value_text'   => null,
                'value_number' => null,
                'value_boolean'=> null,
                'value_date'   => null,
            ];

            // Assign value based on type
            switch ($attribute->type) {

                case 'number':
                    $data['value_number'] = (float) $value;
                    break;

                case 'boolean':
                    $data['value_boolean'] = filter_var($value, FILTER_VALIDATE_BOOLEAN);
                    break;

                case 'date':
                    $data['value_date'] = $value; // optionally format করতে পারো
                    break;

                default:
                    $data['value_text'] = $value;
                    break;
            }

            // Update or Insert (no duplicate)
            PropertyAttributeValue::updateOrCreate(
                [
                    'property_id'  => $propertyId,
                    'attribute_id' => $attr['id'],
                ],
                $data
            );
        }
    }
}