<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\SocialLink;
use App\Http\Controllers\Controller;
use App\Http\Resources\SocialLinkResource;
use Illuminate\Http\Request;

class AdminSocialLinkController extends Controller
{
    public function index()
    {
        return SocialLinkResource::collection(SocialLink::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'platform'  => 'required|max:255',
            'url'       => 'required|max:255',
            'icon_name' => 'required|max:255',
        ]);

        $socialLink = SocialLink::create($validated);

        return new SocialLinkResource($socialLink);
    }

    public function update(Request $request, SocialLink $socialLink)
    {
        $validated = $request->validate([
            'platform'  => 'required|max:255',
            'url'       => 'required|max:255',
            'icon_name' => 'required|max:255',
        ]);

        $socialLink->update($validated);

        return new SocialLinkResource($socialLink);
    }

    public function destroy(SocialLink $socialLink)
    {
        $socialLink->delete();

        return response()->json(['message' => 'Social link deleted.']);
    }
}
