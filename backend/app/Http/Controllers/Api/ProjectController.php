<?php

namespace App\Http\Controllers\Api;

use App\Models\Project;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;

class ProjectController extends Controller
{
    public function index()
    {
        return ProjectResource::collection(
            Project::active()->get()
        );
    }

    public function show(Project $project)
    {
        return new ProjectResource($project);
    }
}
