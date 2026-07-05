<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    public function run(): void
    {
        $skills = [
            ['name' => 'Python',         'icon_name' => 'SiPython',     'color_hex' => '#3776AB',   'category' => 'Data',         'sort_order' => 1],
            ['name' => 'PostgreSQL',     'icon_name' => 'SiPostgresql', 'color_hex' => '#4169E1',   'category' => 'Database',     'sort_order' => 2],
            ['name' => 'Tableau',        'icon_name' => 'FaChartBar',   'color_hex' => '#E97627',   'category' => 'Visualization', 'sort_order' => 3],
            ['name' => 'Apache Spark',   'icon_name' => 'SiApachespark','color_hex' => '#E25A1C',   'category' => 'Data',         'sort_order' => 4],
            ['name' => 'AWS',            'icon_name' => 'FaAws',        'color_hex' => '#FF9900',   'category' => 'Cloud',        'sort_order' => 5],
            ['name' => 'Docker',         'icon_name' => 'SiDocker',     'color_hex' => '#2496ED',   'category' => 'DevOps',       'sort_order' => 6],
            ['name' => 'Google Cloud',   'icon_name' => 'SiGooglecloud','color_hex' => '#4285F4',   'category' => 'Cloud',        'sort_order' => 7],
            ['name' => 'Linux',          'icon_name' => 'SiLinux',      'color_hex' => '#FCC624',   'category' => 'DevOps',       'sort_order' => 8],
            ['name' => 'Apache Airflow', 'icon_name' => 'SiApacheairflow','color_hex' => '#017CEE','category' => 'Data',         'sort_order' => 9],
            ['name' => 'Terraform',      'icon_name' => 'SiTerraform',  'color_hex' => '#7B42BC',   'category' => 'DevOps',       'sort_order' => 10],
        ];

        foreach ($skills as $data) {
            Skill::create($data);
        }
    }
}
