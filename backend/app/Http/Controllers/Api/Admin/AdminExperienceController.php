<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Experience;
use App\Http\Controllers\Controller;
use App\Http\Resources\ExperienceResource;
use Illuminate\Http\Request;

class AdminExperienceController extends Controller
{
    public function index()
    {
        return ExperienceResource::collection(Experience::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'role'         => 'required|max:255',
            'company'      => 'required|max:255',
            'type'         => 'required|max:255',
            'period_start' => 'required|max:255',
            'period_end'   => 'nullable|max:255',
            'points'       => 'nullable|array',
            'points.*'     => 'string',
        ]);

        $experience = Experience::create($validated);

        return new ExperienceResource($experience);
    }

    public function update(Request $request, Experience $experience)
    {
        $validated = $request->validate([
            'role'         => 'required|max:255',
            'company'      => 'required|max:255',
            'type'         => 'required|max:255',
            'period_start' => 'required|max:255',
            'period_end'   => 'nullable|max:255',
            'points'       => 'nullable|array',
            'points.*'     => 'string',
        ]);

        $experience->update($validated);

        return new ExperienceResource($experience);
    }

    public function destroy(Experience $experience)
    {
        $experience->delete();

        return response()->json(['message' => 'Experience deleted.']);
    }
}
