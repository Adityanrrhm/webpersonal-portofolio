<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExperienceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'role'         => $this->role,
            'company'      => $this->company,
            'type'         => $this->type,
            'periodStart'  => $this->period_start,
            'periodEnd'    => $this->period_end,
            'points'       => $this->points,
        ];
    }
}
