<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Certificate;
use App\Http\Controllers\Controller;
use App\Http\Resources\CertificateResource;
use Illuminate\Http\Request;

class AdminCertificateController extends Controller
{
    public function index()
    {
        return CertificateResource::collection(Certificate::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'         => 'required|max:255',
            'org'           => 'required|max:255',
            'category'      => 'required|max:255',
            'issued_date'   => 'required|date',
            'credential_id' => 'nullable|max:255',
            'description'   => 'nullable',
            'image_url'     => 'nullable|max:255',
            'credential_url'=> 'nullable|max:255',
        ]);

        $certificate = Certificate::create($validated);

        return new CertificateResource($certificate);
    }

    public function update(Request $request, Certificate $certificate)
    {
        $validated = $request->validate([
            'title'         => 'required|max:255',
            'org'           => 'required|max:255',
            'category'      => 'required|max:255',
            'issued_date'   => 'required|date',
            'credential_id' => 'nullable|max:255',
            'description'   => 'nullable',
            'image_url'     => 'nullable|max:255',
            'credential_url'=> 'nullable|max:255',
        ]);

        $certificate->update($validated);

        return new CertificateResource($certificate);
    }

    public function destroy(Certificate $certificate)
    {
        $certificate->delete();

        return response()->json(['message' => 'Certificate deleted.']);
    }
}
