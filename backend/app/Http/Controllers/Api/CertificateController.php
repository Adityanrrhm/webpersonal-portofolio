<?php

namespace App\Http\Controllers\Api;

use App\Models\Certificate;
use App\Http\Controllers\Controller;
use App\Http\Resources\CertificateResource;

class CertificateController extends Controller
{
    public function index()
    {
        return CertificateResource::collection(
            Certificate::active()->get()
        );
    }

    public function show(Certificate $certificate)
    {
        return new CertificateResource($certificate);
    }
}
