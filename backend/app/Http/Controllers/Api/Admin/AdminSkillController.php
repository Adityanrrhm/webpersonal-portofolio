<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Skill;
use App\Http\Controllers\Controller;
use App\Http\Resources\SkillResource;
use Illuminate\Http\Request;

class AdminSkillController extends Controller
{
    public function index()
    {
        return SkillResource::collection(Skill::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'      => 'required|max:255',
            'icon_name' => 'required|max:255',
            'color_hex' => 'nullable|max:255',
            'category'  => 'required|max:255',
        ]);

        $skill = Skill::create($validated);

        return new SkillResource($skill);
    }

    public function update(Request $request, Skill $skill)
    {
        $validated = $request->validate([
            'name'      => 'required|max:255',
            'icon_name' => 'required|max:255',
            'color_hex' => 'nullable|max:255',
            'category'  => 'required|max:255',
        ]);

        $skill->update($validated);

        return new SkillResource($skill);
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();

        return response()->json(['message' => 'Skill deleted.']);
    }
}
