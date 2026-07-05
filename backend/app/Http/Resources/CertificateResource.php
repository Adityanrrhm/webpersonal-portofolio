<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CertificateResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'             => $this->id,
            'title'          => $this->title,
            'org'            => $this->org,
            'category'       => $this->category,
            'issuedDate'     => $this->issued_date,
            'credentialId'   => $this->credential_id,
            'description'    => $this->description,
            'imageUrl'       => $this->image_url,
            'credentialUrl'  => $this->credential_url,
        ];
    }
}
