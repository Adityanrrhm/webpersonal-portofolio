<?php

namespace Database\Seeders;

use App\Models\Profile;
use Illuminate\Database\Seeder;

class ProfileSeeder extends Seeder
{
    public function run(): void
    {
        Profile::create([
            'name'      => 'Aditya Nur Rohim',
            'title'     => 'Data Analytics & Cloud Computing',
            'bio'       => "I'm a Computer Science student from Indonesia with a deep interest in Data Analytics and Cloud Computing. I enjoy turning raw data into clear, actionable insights and building scalable solutions through hands-on projects that solve real problems.",
            'photo_url' => '/assets/fotogw.png',
            'cv_url'    => null,
            'email'     => 'adityanurrohim19@gmail.com',
            'location'  => 'Indonesia',
            'focus'     => 'Data & Cloud',
            'study'     => 'Computer Science',
        ]);
    }
}
