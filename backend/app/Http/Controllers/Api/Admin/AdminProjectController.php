<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Project;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use Illuminate\Http\Request;

class AdminProjectController extends Controller
{
    public function index()
    {
        return ProjectResource::collection(Project::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|max:255',
            'category'    => 'required|max:255',
            'label'       => 'required|max:255',
            'description' => 'nullable',
            'tech_stack'  => 'nullable|array',
            'tech_stack.*'=> 'string',
            'image_url'   => 'nullable|max:255',
            'live_url'    => 'nullable|max:255',
            'github_url'  => 'nullable|max:255',
        ]);

        $project = Project::create($validated);

        return new ProjectResource($project);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title'       => 'required|max:255',
            'category'    => 'required|max:255',
            'label'       => 'required|max:255',
            'description' => 'nullable',
            'tech_stack'  => 'nullable|array',
            'tech_stack.*'=> 'string',
            'image_url'   => 'nullable|max:255',
            'live_url'    => 'nullable|max:255',
            'github_url'  => 'nullable|max:255',
        ]);

        $project->update($validated);

        return new ProjectResource($project);
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return response()->json(['message' => 'Project deleted.']);
    }
}
