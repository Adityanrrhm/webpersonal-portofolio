<?php

namespace Database\Seeders;

use App\Models\Experience;
use Illuminate\Database\Seeder;

class ExperienceSeeder extends Seeder
{
    public function run(): void
    {
        $experiences = [
            [
                'role'         => 'President of Computer Science Society',
                'company'      => 'University Student Organization',
                'type'         => 'Extracurricular',
                'period_start' => 'Feb 2023',
                'period_end'   => 'Present',
                'points'       => [
                    'Led a team of 40+ members to organize national level hackathons.',
                    'Managed technical workshops focusing on Web Development and Cloud Computing.',
                ],
                'sort_order'   => 1,
            ],
            [
                'role'         => 'Software Engineering Intern',
                'company'      => 'Tech Startup',
                'type'         => 'Internship',
                'period_start' => 'Jan 2024',
                'period_end'   => 'Jun 2024',
                'points'       => [
                    'Built internal dashboard tools using Next.js and Tailwind CSS.',
                    'Collaborated with backend engineers to consume REST APIs.',
                ],
                'sort_order'   => 2,
            ],
        ];

        foreach ($experiences as $data) {
            Experience::create($data);
        }
    }
}
