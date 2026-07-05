<?php

namespace App\Http\Controllers\Api;

use App\Models\Profile;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProfileResource;

class ProfileController extends Controller
{
    public function show()
    {
        $profile = Profile::first();

        if (! $profile) {
            return response()->json(['message' => 'Profile not found'], 404);
        }

        return new ProfileResource($profile);
    }
}
