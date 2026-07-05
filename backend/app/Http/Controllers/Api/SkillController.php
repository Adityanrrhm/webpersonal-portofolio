<?php

namespace App\Http\Controllers\Api;

use App\Models\Skill;
use App\Http\Controllers\Controller;
use App\Http\Resources\SkillResource;

class SkillController extends Controller
{
    public function index()
    {
        return SkillResource::collection(
            Skill::active()->get()
        );
    }
}
