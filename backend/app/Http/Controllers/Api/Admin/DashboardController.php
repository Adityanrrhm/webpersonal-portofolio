<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Certificate;
use App\Models\Experience;
use App\Models\Skill;
use App\Models\Contact;

class DashboardController extends Controller
{
    public function stats()
    {
        return response()->json([
            'data' => [
                'totalProjects'     => Project::count(),
                'totalCertificates' => Certificate::count(),
                'totalExperiences'  => Experience::count(),
                'totalSkills'       => Skill::count(),
                'unreadContacts'    => Contact::where('is_read', false)->count(),
                'totalContacts'     => Contact::count(),
            ],
        ]);
    }
}
