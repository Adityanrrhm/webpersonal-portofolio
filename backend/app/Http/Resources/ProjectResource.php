<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'title'       => $this->title,
            'category'    => $this->category,
            'label'       => $this->label,
            'description' => $this->description,
            'techStack'   => $this->tech_stack,
            'imageUrl'    => $this->image_url,
            'liveUrl'     => $this->live_url,
            'githubUrl'   => $this->github_url,
        ];
    }
}
