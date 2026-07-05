<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\CertificateController;
use App\Http\Controllers\Api\ExperienceController;
use App\Http\Controllers\Api\SkillController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\SocialLinkController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Admin\DashboardController;
use App\Http\Controllers\Api\Admin\AdminProjectController;
use App\Http\Controllers\Api\Admin\AdminCertificateController;
use App\Http\Controllers\Api\Admin\AdminExperienceController;
use App\Http\Controllers\Api\Admin\AdminSkillController;
use App\Http\Controllers\Api\Admin\AdminSocialLinkController;
use App\Http\Controllers\Api\Admin\AdminProfileController;
use App\Http\Controllers\Api\Admin\AdminContactController;
use App\Http\Controllers\Api\Admin\MediaController;

// Public routes
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{project}', [ProjectController::class, 'show']);

Route::get('/certificates', [CertificateController::class, 'index']);
Route::get('/certificates/{certificate}', [CertificateController::class, 'show']);

Route::get('/experiences', [ExperienceController::class, 'index']);
Route::get('/experiences/{experience}', [ExperienceController::class, 'show']);

Route::get('/skills', [SkillController::class, 'index']);

Route::get('/profile', [ProfileController::class, 'show']);

Route::get('/social-links', [SocialLinkController::class, 'index']);

Route::post('/contact', [ContactController::class, 'store']);

// Admin auth
Route::post('/admin/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/admin/logout', [AuthController::class, 'logout']);
    Route::get('/admin/me', [AuthController::class, 'me']);

    Route::get('/admin/dashboard/stats', [DashboardController::class, 'stats']);

    Route::apiResource('/admin/projects', AdminProjectController::class)->except(['show']);
    Route::apiResource('/admin/certificates', AdminCertificateController::class)->except(['show']);
    Route::apiResource('/admin/experiences', AdminExperienceController::class)->except(['show']);
    Route::apiResource('/admin/skills', AdminSkillController::class)->except(['show']);
    Route::apiResource('/admin/social-links', AdminSocialLinkController::class)->except(['show']);

    Route::put('/admin/profile', [AdminProfileController::class, 'update']);

    Route::get('/admin/contacts', [AdminContactController::class, 'index']);
    Route::get('/admin/contacts/{contact}', [AdminContactController::class, 'show']);
    Route::patch('/admin/contacts/{contact}/read', [AdminContactController::class, 'markRead']);
    Route::delete('/admin/contacts/{contact}', [AdminContactController::class, 'destroy']);

    Route::post('/admin/media/upload', [MediaController::class, 'upload']);
});
