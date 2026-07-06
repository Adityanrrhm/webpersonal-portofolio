/*
 Navicat Premium Dump SQL

 Source Server         :  Mysql_Local
 Source Server Type    : MySQL
 Source Server Version : 90701 (9.7.1)
 Source Host           : localhost:3306
 Source Schema         : webpersonal_portofolio

 Target Server Type    : MySQL
 Target Server Version : 90701 (9.7.1)
 File Encoding         : 65001

 Date: 06/07/2026 18:34:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for certificates
-- ----------------------------
DROP TABLE IF EXISTS `certificates`;
CREATE TABLE `certificates`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `org` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `issued_date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `credential_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `credential_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `sort_order` int NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of certificates
-- ----------------------------
INSERT INTO `certificates` VALUES (1, 'Associate Cloud Engineer', 'Google Cloud', 'Cloud', '2026-07-08', 'GCP-ACE-2415-9X3K', 'Earned after passing the Google Cloud ACE exam covering Compute Engine, Kubernetes, Cloud Storage, IAM, and monitoring across GCP projects.', NULL, 'coba', 1, 1, '2026-07-05 13:22:15', '2026-07-05 14:18:05');
INSERT INTO `certificates` VALUES (2, 'Solutions Architect – Associate', 'AWS', 'Cloud', 'Apr 2026', 'AWS-SAA-3F7D-2B1P', 'Validates ability to design distributed systems on AWS using EC2, S3, RDS, Lambda, and architectural best practices for high availability.', NULL, NULL, 2, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `certificates` VALUES (3, 'Cloud Practitioner', 'AWS', 'Cloud', 'Jan 2026', 'AWS-CP-8A2E-6C0Q', 'Foundational certification covering AWS cloud concepts, core services, pricing, billing, and security best practices.', NULL, NULL, 3, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `certificates` VALUES (4, 'Azure Fundamentals (AZ-900)', 'Microsoft', 'Cloud', 'Nov 2025', 'MS-AZ900-4H1G-9D8R', 'Demonstrates foundational knowledge of cloud services, Azure architecture, management, governance, and security.', NULL, NULL, 4, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `certificates` VALUES (5, 'Cloud Digital Leader', 'Google Cloud', 'Cloud', 'Sep 2025', 'GCP-CDL-7K2M-5E6N', 'Validates understanding of Google Cloud products and their role in digital transformation, data management, and infrastructure modernization.', NULL, NULL, 5, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `certificates` VALUES (6, 'Node.js Developer Certification', 'MongoDB', 'Backend', 'Mar 2026', 'MDB-NODE-2F8C-3H5P', 'Covers building RESTful APIs with Express, Mongoose ODM, authentication patterns, and integrating MongoDB with Node.js.', NULL, NULL, 6, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `certificates` VALUES (7, 'Django REST Framework', 'Django Software Foundation', 'Backend', 'Dec 2025', 'DSF-DRF-6A1B-4C9M', 'Validates proficiency in building robust APIs with Django REST Framework, serializers, viewsets, permissions, and testing.', NULL, NULL, 7, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `certificates` VALUES (8, 'Go Backend Development', 'Coursera', 'Backend', 'Aug 2025', 'CRS-GO-9D4E-2F7K', 'Covers Go programming fundamentals, concurrency patterns, HTTP servers, middleware, and database connectivity for backend systems.', NULL, NULL, 8, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `certificates` VALUES (9, 'TensorFlow Developer Certificate', 'Google', 'AI', 'May 2026', 'TF-DEV-3C8A-7B2X', 'Validates ability to build and train ML models using TensorFlow, including computer vision, NLP, and sequential models.', NULL, NULL, 9, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `certificates` VALUES (10, 'Machine Learning Engineering', 'Coursera (Stanford)', 'AI', 'Feb 2026', 'CRS-MLE-5H9F-1D4P', 'Covers advanced ML topics: neural networks, decision forests, recommendation systems, and MLOps best practices.', NULL, NULL, 10, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `certificates` VALUES (11, 'Deep Learning Specialization', 'DeepLearning.AI', 'AI', 'Oct 2025', 'DL-SPEC-8E2K-6C3Q', 'Five-course specialization covering CNNs, RNNs, LSTMs, transformers, hyperparameter tuning, and structured ML projects.', NULL, NULL, 11, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `certificates` VALUES (12, 'Natural Language Processing', 'Stanford Online', 'AI', 'Jul 2025', 'SO-NLP-4A7G-9B1R', 'Explores tokenization, word embeddings, sequence-to-sequence models, attention mechanisms, and transformer architectures.', NULL, NULL, 12, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `certificates` VALUES (13, 'Computer Vision Fundamentals', 'OpenCV University', 'AI', 'Apr 2025', 'CVU-CV-2D6H-8E5M', 'Covers image processing, feature detection, object detection with YOLO, segmentation, and deep learning-based vision pipelines.', NULL, NULL, 13, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `certificates` VALUES (14, 'AI For Everyone', 'DeepLearning.AI', 'AI', 'Jan 2025', 'DL-AFE-7C3B-4F9N', 'Non-technical introduction to AI concepts, ML workflows, ethical considerations, and practical AI project planning.', NULL, NULL, 14, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `certificates` VALUES (15, 'MongoDB Associate Developer', 'MongoDB University', 'Database', 'Jun 2026', 'MDB-AD-3E8K-1B7P', 'Validates CRUD operations, aggregation pipelines, indexes, data modeling, and Atlas cloud database management.', NULL, NULL, 15, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `certificates` VALUES (16, 'PostgreSQL Developer', 'PostgreSQL Global Development Group', 'Database', 'Mar 2026', 'PG-DEV-9C2F-5A4H', 'Covers advanced SQL queries, indexing strategies, window functions, CTEs, transaction isolation, and performance tuning.', NULL, NULL, 16, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `certificates` VALUES (17, 'MySQL Database Certified', 'Oracle University', 'Database', 'Dec 2025', 'OU-MYSQL-6H1D-8E3K', 'Validates skills in MySQL architecture, query optimization, stored procedures, replication, and backup/restore strategies.', NULL, NULL, 17, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `certificates` VALUES (18, 'Data Warehouse Engineering', 'IBM', 'Database', 'Sep 2025', 'IBM-DWE-4B7G-2C9R', 'Covers dimensional modeling, ETL pipelines, data lake architecture, OLAP cubes, and cloud data warehouse platforms.', NULL, NULL, 18, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `certificates` VALUES (19, 'Docker Certified Associate', 'Docker Inc.', 'DevOps', 'Apr 2026', 'DOCKER-DCA-5F2K-7E1P', 'Validates understanding of containerization, Dockerfile optimization, multi-stage builds, Docker Compose, and container networking.', NULL, NULL, 19, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `certificates` VALUES (20, 'Kubernetes Administrator', 'CNCF', 'DevOps', 'Feb 2026', 'CNCF-CKA-8A3D-4C6H', 'Certified Kubernetes Administrator — covers cluster architecture, pod lifecycle, services, ingress, persistent volumes, and troubleshooting.', NULL, NULL, 20, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');

-- ----------------------------
-- Table structure for contacts
-- ----------------------------
DROP TABLE IF EXISTS `contacts`;
CREATE TABLE `contacts`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of contacts
-- ----------------------------

-- ----------------------------
-- Table structure for experiences
-- ----------------------------
DROP TABLE IF EXISTS `experiences`;
CREATE TABLE `experiences`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `company` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `period_start` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `period_end` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `points` json NULL,
  `sort_order` int NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of experiences
-- ----------------------------
INSERT INTO `experiences` VALUES (1, 'President of Computer Science Society', 'University Student Organization', 'Extracurricular', 'Feb 2023', 'Present', '[\"Led a team of 40+ members to organize national level hackathons.\", \"Managed technical workshops focusing on Web Development and Cloud Computing.\"]', 1, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `experiences` VALUES (2, 'Software Engineering Intern', 'Tech Startup', 'Internship', 'Jan 2024', 'Jun 2024', '[\"Built internal dashboard tools using Next.js and Tailwind CSS.\", \"Collaborated with backend engineers to consume REST APIs.\"]', 2, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `experiences` VALUES (3, 'Web Developer', 'CV. Purnama Kreatifa', 'Internship', 'jan 2025', 'may 2025', '[\"Design database flow, creating system of ERP for sales or market\"]', 0, 1, '2026-07-05 14:17:12', '2026-07-05 14:17:12');

-- ----------------------------
-- Table structure for failed_jobs
-- ----------------------------
DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `failed_jobs_uuid_unique`(`uuid` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of failed_jobs
-- ----------------------------

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of migrations
-- ----------------------------
INSERT INTO `migrations` VALUES (1, '2014_10_12_000000_create_users_table', 1);
INSERT INTO `migrations` VALUES (2, '2014_10_12_100000_create_password_reset_tokens_table', 1);
INSERT INTO `migrations` VALUES (3, '2019_08_19_000000_create_failed_jobs_table', 1);
INSERT INTO `migrations` VALUES (4, '2019_12_14_000001_create_personal_access_tokens_table', 1);
INSERT INTO `migrations` VALUES (5, '2026_07_05_000001_create_projects_table', 1);
INSERT INTO `migrations` VALUES (6, '2026_07_05_000002_create_certificates_table', 1);
INSERT INTO `migrations` VALUES (7, '2026_07_05_000003_create_experiences_table', 1);
INSERT INTO `migrations` VALUES (8, '2026_07_05_000004_create_skills_table', 1);
INSERT INTO `migrations` VALUES (9, '2026_07_05_000005_create_profiles_table', 1);
INSERT INTO `migrations` VALUES (10, '2026_07_05_000006_create_social_links_table', 1);
INSERT INTO `migrations` VALUES (11, '2026_07_05_000007_create_contacts_table', 1);
INSERT INTO `migrations` VALUES (12, '2026_07_05_100000_add_is_admin_to_users_table', 1);

-- ----------------------------
-- Table structure for password_reset_tokens
-- ----------------------------
DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE `password_reset_tokens`  (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of password_reset_tokens
-- ----------------------------

-- ----------------------------
-- Table structure for personal_access_tokens
-- ----------------------------
DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE `personal_access_tokens`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `personal_access_tokens_token_unique`(`token` ASC) USING BTREE,
  INDEX `personal_access_tokens_tokenable_type_tokenable_id_index`(`tokenable_type` ASC, `tokenable_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of personal_access_tokens
-- ----------------------------
INSERT INTO `personal_access_tokens` VALUES (1, 'App\\Models\\User', 1, 'admin-token', 'fe8a7e5e62ffe19fadea32a82d8b31d6f392b3b684aee7e5c438d41fe116859d', '[\"*\"]', '2026-07-05 13:42:10', NULL, '2026-07-05 13:30:20', '2026-07-05 13:42:10');
INSERT INTO `personal_access_tokens` VALUES (2, 'App\\Models\\User', 1, 'admin-token', '7627d1e50e0fddec04dddc130ad55445fc1049d094c58389841b31b8bafa5422', '[\"*\"]', '2026-07-05 13:44:56', NULL, '2026-07-05 13:43:12', '2026-07-05 13:44:56');
INSERT INTO `personal_access_tokens` VALUES (3, 'App\\Models\\User', 1, 'admin-token', '8791787afeba53b895c6091d4e12681ce7781b6898ed25d6f955c38c35911c82', '[\"*\"]', '2026-07-05 13:46:42', NULL, '2026-07-05 13:45:18', '2026-07-05 13:46:42');
INSERT INTO `personal_access_tokens` VALUES (4, 'App\\Models\\User', 1, 'admin-token', '0df0cb27c47083d8409dd52b23289cdcf839cd290c995a1af801e8414105a5e9', '[\"*\"]', '2026-07-05 13:54:30', NULL, '2026-07-05 13:46:47', '2026-07-05 13:54:30');
INSERT INTO `personal_access_tokens` VALUES (5, 'App\\Models\\User', 1, 'admin-token', '00def8e7f00e0880a9a0ab6cace6c69ea39f943022513774f756134ed01bc2b8', '[\"*\"]', '2026-07-05 14:23:46', NULL, '2026-07-05 13:54:35', '2026-07-05 14:23:46');

-- ----------------------------
-- Table structure for profiles
-- ----------------------------
DROP TABLE IF EXISTS `profiles`;
CREATE TABLE `profiles`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `bio` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `photo_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `cv_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `focus` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `study` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of profiles
-- ----------------------------
INSERT INTO `profiles` VALUES (1, 'Aditya Nur Rohim', 'Data Analytics & Cloud Computing', 'I\'m a Information System student from University of Jember Indonesia with a deep interest in Data Analytics and Cloud Computing. I enjoy turning raw data into clear, actionable insights and building scalable solutions through hands-on projects that solve real problems.', '/assets/fotogw.png', NULL, 'adityanurrohim19@gmail.com', 'Indonesia', 'Data & Cloud', 'Information System', '2026-07-05 13:22:15', '2026-07-05 13:22:15');

-- ----------------------------
-- Table structure for projects
-- ----------------------------
DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `label` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `tech_stack` json NULL,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `live_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `github_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `sort_order` int NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of projects
-- ----------------------------
INSERT INTO `projects` VALUES (1, 'Mobile App Dev', 'React Native • Content', 'Mobile', 'A cross-platform mobile application built with React Native, featuring real-time content synchronization, push notifications, and an intuitive user interface designed for seamless content consumption on the go.', '[\"React Native\", \"TypeScript\", \"Expo\", \"Firebase\"]', NULL, 'coba', 'coba', 1, 1, '2026-07-05 13:22:15', '2026-07-05 14:18:10');
INSERT INTO `projects` VALUES (2, 'Figure 03 Robot', 'AI • Tech Review', 'AI', 'An in-depth technical review and analysis of the Figure 03 humanoid robot, covering its AI-driven locomotion, computer vision capabilities, and potential applications in industrial automation.', '[\"Python\", \"TensorFlow\", \"OpenCV\", \"ROS\"]', NULL, 'coba', 'coba', 2, 1, '2026-07-05 13:22:15', '2026-07-05 13:55:10');
INSERT INTO `projects` VALUES (3, 'VERV Brand Campaign', 'Brand • Creative', 'Brand', 'A full brand campaign for VERV, including visual identity design, motion graphics, and a multi-platform content strategy that increased brand awareness by 40% within the target market.', '[\"Figma\", \"After Effects\", \"Premiere Pro\", \"Illustrator\"]', NULL, '#', NULL, 3, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `projects` VALUES (4, 'Data Dashboard', 'Analytics • Visualization', 'Data', 'An interactive data dashboard built for real-time business metrics tracking, featuring customizable charts, drill-down capabilities, and automated report generation for stakeholders.', '[\"Next.js\", \"D3.js\", \"PostgreSQL\", \"Chart.js\"]', NULL, '#', '#', 4, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `projects` VALUES (5, 'Cloud Migration', 'DevOps • Infrastructure', 'Cloud', 'Led the migration of a monolith application to a cloud-native microservices architecture on AWS, reducing infrastructure costs by 35% and improving deployment frequency from monthly to daily.', '[\"AWS\", \"Docker\", \"Kubernetes\", \"Terraform\"]', NULL, '#', NULL, 5, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `projects` VALUES (6, 'ML Pipeline', 'Machine Learning • Automation', 'ML', 'Designed and deployed an end-to-end machine learning pipeline for automated data processing, model training, and inference, handling over 1 million predictions per day with 95% accuracy.', '[\"Python\", \"Apache Spark\", \"MLflow\", \"FastAPI\"]', NULL, '#', '#', 6, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');

-- ----------------------------
-- Table structure for skills
-- ----------------------------
DROP TABLE IF EXISTS `skills`;
CREATE TABLE `skills`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `color_hex` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `sort_order` int NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of skills
-- ----------------------------
INSERT INTO `skills` VALUES (1, 'Python', 'SiPython', '#3776AB', 'Data', 1, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `skills` VALUES (2, 'PostgreSQL', 'SiPostgresql', '#4169E1', 'Database', 2, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `skills` VALUES (3, 'Tableau', 'FaChartBar', '#E97627', 'Visualization', 3, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `skills` VALUES (4, 'Apache Spark', 'SiApachespark', '#E25A1C', 'Data', 4, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `skills` VALUES (5, 'AWS', 'FaAws', '#FF9900', 'Cloud', 5, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `skills` VALUES (6, 'Docker', 'SiDocker', '#2496ED', 'DevOps', 6, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `skills` VALUES (7, 'Google Cloud', 'SiGooglecloud', '#4285F4', 'Cloud', 7, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `skills` VALUES (8, 'Linux', 'SiLinux', '#FCC624', 'DevOps', 8, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `skills` VALUES (9, 'Apache Airflow', 'SiApacheairflow', '#017CEE', 'Data', 9, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `skills` VALUES (10, 'Terraform', 'SiTerraform', '#7B42BC', 'DevOps', 10, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');

-- ----------------------------
-- Table structure for social_links
-- ----------------------------
DROP TABLE IF EXISTS `social_links`;
CREATE TABLE `social_links`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `platform` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `sort_order` int NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of social_links
-- ----------------------------
INSERT INTO `social_links` VALUES (1, 'LinkedIn', 'https://linkedin.com/in/adityanurrohim', 'FaLinkedin', 1, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `social_links` VALUES (2, 'GitHub', 'https://github.com/adityanrrhm', 'SiGithub', 2, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `social_links` VALUES (3, 'Instagram', 'https://instagram.com/adityanrrhm', 'SiInstagram', 3, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');
INSERT INTO `social_links` VALUES (4, 'Email', 'adityanurrohim19@gmail.com', 'Mail', 4, 1, '2026-07-05 13:22:15', '2026-07-05 13:22:15');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `users_email_unique`(`email` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'Admin', 'adtynrhm@gmail.com', 1, NULL, '$2y$12$g10OR0lhFJ7SGUvSPtZQAevjyl5FYtLDsXmGyF.DFXeGhcDMaYZxa', NULL, '2026-07-05 13:22:16', '2026-07-05 13:22:16');

SET FOREIGN_KEY_CHECKS = 1;
