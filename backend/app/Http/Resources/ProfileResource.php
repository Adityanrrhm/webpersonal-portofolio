<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'        => $this->id,
            'name'      => $this->name,
            'title'     => $this->title,
            'bio'       => $this->bio,
            'photoUrl'  => $this->photo_url,
            'cvUrl'     => $this->cv_url,
            'email'     => $this->email,
            'location'  => $this->location,
            'focus'     => $this->focus,
            'study'     => $this->study,
        ];
    }
}
