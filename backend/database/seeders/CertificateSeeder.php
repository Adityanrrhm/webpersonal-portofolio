<?php

namespace Database\Seeders;

use App\Models\Certificate;
use Illuminate\Database\Seeder;

class CertificateSeeder extends Seeder
{
    public function run(): void
    {
        $certificates = [
            ['title' => 'Associate Cloud Engineer', 'org' => 'Google Cloud', 'category' => 'Cloud', 'issued_date' => 'Jun 2026', 'credential_id' => 'GCP-ACE-2415-9X3K', 'description' => 'Earned after passing the Google Cloud ACE exam covering Compute Engine, Kubernetes, Cloud Storage, IAM, and monitoring across GCP projects.', 'sort_order' => 1],
            ['title' => 'Solutions Architect – Associate', 'org' => 'AWS', 'category' => 'Cloud', 'issued_date' => 'Apr 2026', 'credential_id' => 'AWS-SAA-3F7D-2B1P', 'description' => 'Validates ability to design distributed systems on AWS using EC2, S3, RDS, Lambda, and architectural best practices for high availability.', 'sort_order' => 2],
            ['title' => 'Cloud Practitioner', 'org' => 'AWS', 'category' => 'Cloud', 'issued_date' => 'Jan 2026', 'credential_id' => 'AWS-CP-8A2E-6C0Q', 'description' => 'Foundational certification covering AWS cloud concepts, core services, pricing, billing, and security best practices.', 'sort_order' => 3],
            ['title' => 'Azure Fundamentals (AZ-900)', 'org' => 'Microsoft', 'category' => 'Cloud', 'issued_date' => 'Nov 2025', 'credential_id' => 'MS-AZ900-4H1G-9D8R', 'description' => 'Demonstrates foundational knowledge of cloud services, Azure architecture, management, governance, and security.', 'sort_order' => 4],
            ['title' => 'Cloud Digital Leader', 'org' => 'Google Cloud', 'category' => 'Cloud', 'issued_date' => 'Sep 2025', 'credential_id' => 'GCP-CDL-7K2M-5E6N', 'description' => 'Validates understanding of Google Cloud products and their role in digital transformation, data management, and infrastructure modernization.', 'sort_order' => 5],
            ['title' => 'Node.js Developer Certification', 'org' => 'MongoDB', 'category' => 'Backend', 'issued_date' => 'Mar 2026', 'credential_id' => 'MDB-NODE-2F8C-3H5P', 'description' => 'Covers building RESTful APIs with Express, Mongoose ODM, authentication patterns, and integrating MongoDB with Node.js.', 'sort_order' => 6],
            ['title' => 'Django REST Framework', 'org' => 'Django Software Foundation', 'category' => 'Backend', 'issued_date' => 'Dec 2025', 'credential_id' => 'DSF-DRF-6A1B-4C9M', 'description' => 'Validates proficiency in building robust APIs with Django REST Framework, serializers, viewsets, permissions, and testing.', 'sort_order' => 7],
            ['title' => 'Go Backend Development', 'org' => 'Coursera', 'category' => 'Backend', 'issued_date' => 'Aug 2025', 'credential_id' => 'CRS-GO-9D4E-2F7K', 'description' => 'Covers Go programming fundamentals, concurrency patterns, HTTP servers, middleware, and database connectivity for backend systems.', 'sort_order' => 8],
            ['title' => 'TensorFlow Developer Certificate', 'org' => 'Google', 'category' => 'AI', 'issued_date' => 'May 2026', 'credential_id' => 'TF-DEV-3C8A-7B2X', 'description' => 'Validates ability to build and train ML models using TensorFlow, including computer vision, NLP, and sequential models.', 'sort_order' => 9],
            ['title' => 'Machine Learning Engineering', 'org' => 'Coursera (Stanford)', 'category' => 'AI', 'issued_date' => 'Feb 2026', 'credential_id' => 'CRS-MLE-5H9F-1D4P', 'description' => 'Covers advanced ML topics: neural networks, decision forests, recommendation systems, and MLOps best practices.', 'sort_order' => 10],
            ['title' => 'Deep Learning Specialization', 'org' => 'DeepLearning.AI', 'category' => 'AI', 'issued_date' => 'Oct 2025', 'credential_id' => 'DL-SPEC-8E2K-6C3Q', 'description' => 'Five-course specialization covering CNNs, RNNs, LSTMs, transformers, hyperparameter tuning, and structured ML projects.', 'sort_order' => 11],
            ['title' => 'Natural Language Processing', 'org' => 'Stanford Online', 'category' => 'AI', 'issued_date' => 'Jul 2025', 'credential_id' => 'SO-NLP-4A7G-9B1R', 'description' => 'Explores tokenization, word embeddings, sequence-to-sequence models, attention mechanisms, and transformer architectures.', 'sort_order' => 12],
            ['title' => 'Computer Vision Fundamentals', 'org' => 'OpenCV University', 'category' => 'AI', 'issued_date' => 'Apr 2025', 'credential_id' => 'CVU-CV-2D6H-8E5M', 'description' => 'Covers image processing, feature detection, object detection with YOLO, segmentation, and deep learning-based vision pipelines.', 'sort_order' => 13],
            ['title' => 'AI For Everyone', 'org' => 'DeepLearning.AI', 'category' => 'AI', 'issued_date' => 'Jan 2025', 'credential_id' => 'DL-AFE-7C3B-4F9N', 'description' => 'Non-technical introduction to AI concepts, ML workflows, ethical considerations, and practical AI project planning.', 'sort_order' => 14],
            ['title' => 'MongoDB Associate Developer', 'org' => 'MongoDB University', 'category' => 'Database', 'issued_date' => 'Jun 2026', 'credential_id' => 'MDB-AD-3E8K-1B7P', 'description' => 'Validates CRUD operations, aggregation pipelines, indexes, data modeling, and Atlas cloud database management.', 'sort_order' => 15],
            ['title' => 'PostgreSQL Developer', 'org' => 'PostgreSQL Global Development Group', 'category' => 'Database', 'issued_date' => 'Mar 2026', 'credential_id' => 'PG-DEV-9C2F-5A4H', 'description' => 'Covers advanced SQL queries, indexing strategies, window functions, CTEs, transaction isolation, and performance tuning.', 'sort_order' => 16],
            ['title' => 'MySQL Database Certified', 'org' => 'Oracle University', 'category' => 'Database', 'issued_date' => 'Dec 2025', 'credential_id' => 'OU-MYSQL-6H1D-8E3K', 'description' => 'Validates skills in MySQL architecture, query optimization, stored procedures, replication, and backup/restore strategies.', 'sort_order' => 17],
            ['title' => 'Data Warehouse Engineering', 'org' => 'IBM', 'category' => 'Database', 'issued_date' => 'Sep 2025', 'credential_id' => 'IBM-DWE-4B7G-2C9R', 'description' => 'Covers dimensional modeling, ETL pipelines, data lake architecture, OLAP cubes, and cloud data warehouse platforms.', 'sort_order' => 18],
            ['title' => 'Docker Certified Associate', 'org' => 'Docker Inc.', 'category' => 'DevOps', 'issued_date' => 'Apr 2026', 'credential_id' => 'DOCKER-DCA-5F2K-7E1P', 'description' => 'Validates understanding of containerization, Dockerfile optimization, multi-stage builds, Docker Compose, and container networking.', 'sort_order' => 19],
            ['title' => 'Kubernetes Administrator', 'org' => 'CNCF', 'category' => 'DevOps', 'issued_date' => 'Feb 2026', 'credential_id' => 'CNCF-CKA-8A3D-4C6H', 'description' => 'Certified Kubernetes Administrator — covers cluster architecture, pod lifecycle, services, ingress, persistent volumes, and troubleshooting.', 'sort_order' => 20],
        ];

        foreach ($certificates as $data) {
            Certificate::create($data);
        }
    }
}
