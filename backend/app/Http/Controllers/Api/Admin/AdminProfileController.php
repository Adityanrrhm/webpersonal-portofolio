<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Profile;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProfileResource;
use Illuminate\Http\Request;

class AdminProfileController extends Controller
{
    public function update(Request $request)
    {
        $profile = Profile::firstOrFail();

        $validated = $request->validate([
            'name'      => 'required|max:255',
            'title'     => 'required|max:255',
            'bio'       => 'nullable',
            'photo_url' => 'nullable|max:255',
            'cv_url'    => 'nullable|max:255',
            'email'     => 'required|email|max:255',
            'location'  => 'nullable|max:255',
            'focus'     => 'nullable|max:255',
            'study'     => 'nullable|max:255',
        ]);

        $profile->update($validated);

        return new ProfileResource($profile);
    }
}
