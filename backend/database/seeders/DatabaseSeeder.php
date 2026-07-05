<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            ProjectSeeder::class,
            CertificateSeeder::class,
            ExperienceSeeder::class,
            SkillSeeder::class,
            ProfileSeeder::class,
            SocialLinkSeeder::class,
            AdminSeeder::class,
        ]);
    }
}
