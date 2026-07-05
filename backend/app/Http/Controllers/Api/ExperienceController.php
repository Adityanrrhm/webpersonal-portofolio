<?php

namespace App\Http\Controllers\Api;

use App\Models\Experience;
use App\Http\Controllers\Controller;
use App\Http\Resources\ExperienceResource;

class ExperienceController extends Controller
{
    public function index()
    {
        return ExperienceResource::collection(
            Experience::active()->get()
        );
    }

    public function show(Experience $experience)
    {
        return new ExperienceResource($experience);
    }
}
