<?php

namespace App\Http\Controllers\Api;

use App\Models\SocialLink;
use App\Http\Controllers\Controller;
use App\Http\Resources\SocialLinkResource;

class SocialLinkController extends Controller
{
    public function index()
    {
        return SocialLinkResource::collection(
            SocialLink::active()->get()
        );
    }
}
