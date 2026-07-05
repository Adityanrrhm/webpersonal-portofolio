<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'title'       => 'Mobile App Dev',
                'category'    => 'React Native • Content',
                'label'       => 'Mobile',
                'description' => 'A cross-platform mobile application built with React Native, featuring real-time content synchronization, push notifications, and an intuitive user interface designed for seamless content consumption on the go.',
                'tech_stack'  => ['React Native', 'TypeScript', 'Expo', 'Firebase'],
                'live_url'    => '#',
                'github_url'  => '#',
                'sort_order'  => 1,
            ],
            [
                'title'       => 'Figure 03 Robot',
                'category'    => 'AI • Tech Review',
                'label'       => 'AI',
                'description' => 'An in-depth technical review and analysis of the Figure 03 humanoid robot, covering its AI-driven locomotion, computer vision capabilities, and potential applications in industrial automation.',
                'tech_stack'  => ['Python', 'TensorFlow', 'OpenCV', 'ROS'],
                'live_url'    => '#',
                'github_url'  => '#',
                'sort_order'  => 2,
            ],
            [
                'title'       => 'VERV Brand Campaign',
                'category'    => 'Brand • Creative',
                'label'       => 'Brand',
                'description' => 'A full brand campaign for VERV, including visual identity design, motion graphics, and a multi-platform content strategy that increased brand awareness by 40% within the target market.',
                'tech_stack'  => ['Figma', 'After Effects', 'Premiere Pro', 'Illustrator'],
                'live_url'    => '#',
                'sort_order'  => 3,
            ],
            [
                'title'       => 'Data Dashboard',
                'category'    => 'Analytics • Visualization',
                'label'       => 'Data',
                'description' => 'An interactive data dashboard built for real-time business metrics tracking, featuring customizable charts, drill-down capabilities, and automated report generation for stakeholders.',
                'tech_stack'  => ['Next.js', 'D3.js', 'PostgreSQL', 'Chart.js'],
                'live_url'    => '#',
                'github_url'  => '#',
                'sort_order'  => 4,
            ],
            [
                'title'       => 'Cloud Migration',
                'category'    => 'DevOps • Infrastructure',
                'label'       => 'Cloud',
                'description' => 'Led the migration of a monolith application to a cloud-native microservices architecture on AWS, reducing infrastructure costs by 35% and improving deployment frequency from monthly to daily.',
                'tech_stack'  => ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
                'live_url'    => '#',
                'sort_order'  => 5,
            ],
            [
                'title'       => 'ML Pipeline',
                'category'    => 'Machine Learning • Automation',
                'label'       => 'ML',
                'description' => 'Designed and deployed an end-to-end machine learning pipeline for automated data processing, model training, and inference, handling over 1 million predictions per day with 95% accuracy.',
                'tech_stack'  => ['Python', 'Apache Spark', 'MLflow', 'FastAPI'],
                'live_url'    => '#',
                'github_url'  => '#',
                'sort_order'  => 6,
            ],
        ];

        foreach ($projects as $data) {
            Project::create($data);
        }
    }
}
