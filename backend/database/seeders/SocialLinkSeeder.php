<?php

namespace Database\Seeders;

use App\Models\SocialLink;
use Illuminate\Database\Seeder;

class SocialLinkSeeder extends Seeder
{
    public function run(): void
    {
        $links = [
            ['platform' => 'LinkedIn',  'url' => 'https://linkedin.com/in/adityanurrohim',  'icon_name' => 'FaLinkedin', 'sort_order' => 1],
            ['platform' => 'GitHub',    'url' => 'https://github.com/adityanurrohim',       'icon_name' => 'SiGithub',   'sort_order' => 2],
            ['platform' => 'Instagram', 'url' => 'https://instagram.com/adityanurrohim',    'icon_name' => 'SiInstagram','sort_order' => 3],
            ['platform' => 'Email',     'url' => 'mailto:business@adplay.id',               'icon_name' => 'Mail',      'sort_order' => 4],
        ];

        foreach ($links as $data) {
            SocialLink::create($data);
        }
    }
}
