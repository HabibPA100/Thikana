<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\User\UserProfileController;
use App\Http\Controllers\Admin\PromotionPlanController;
use App\Http\Controllers\Admin\ManageCategoryController;
use App\Http\Controllers\Admin\ManageAttributeController;
use App\Http\Controllers\Admin\ManageSubCategoryController;
use App\Http\Controllers\Admin\SubCategoryAttributeController;
use App\Http\Controllers\User\CategoryController;
use App\Http\Controllers\User\SubCategoryController;
use App\Http\Controllers\User\PropertyPostController;
use App\Http\Controllers\User\PostPromotionRequestController;
use App\Http\Controllers\Admin\PostPromotionApprovalController;
use App\Http\Controllers\MessageController;

Route::get('/show-post', [HomeController::class, 'index']);
Route::get('/post/{id}', [HomeController::class, 'showDetails']);
Route::get('/search', [HomeController::class, 'search']);

Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::post('/forgot-password',[AuthController::class,'forgetPassword']);
Route::post('/reset-password',[AuthController::class,'resetPassword']);

Route::middleware('auth:sanctum', 'role:admin')->group(function () {

    // 🔥 Admin Promotion Plan CRUD
    Route::prefix('admin')->group(function () {
        Route::apiResource('promotion-plans', PromotionPlanController::class);
        Route::apiResource('categories', ManageCategoryController::class);
        Route::apiResource('attributes', ManageAttributeController::class);
        Route::apiResource('sub-categories', ManageSubCategoryController::class);
        Route::apiResource('sub-category-attributes', SubCategoryAttributeController::class);
        Route::get('promotion-requests', [PostPromotionApprovalController::class, 'index']);
        Route::post('promotion-requests/{id}/approve', [PostPromotionApprovalController::class, 'approve']);
        Route::post('promotion-requests/{id}/reject', [PostPromotionApprovalController::class, 'reject']);

        // Property Info 
        Route::get('/properties', [AdminDashboardController::class, 'getAllProperty']);
        Route::put('/properties/{id}/status', [AdminDashboardController::class, 'updatePropertyStatus']);

        // USER INFO 
        Route::get('/message/count', [AdminDashboardController::class, 'messageCount']);
        Route::get('/users/count', [AdminDashboardController::class, 'userCount']);
        Route::get('/property/count', [AdminDashboardController::class, 'propertyCount']);
        Route::get('/upgrade-plan/count', [AdminDashboardController::class, 'planCount']);
        Route::get('/revenue', [AdminDashboardController::class, 'revenue']);
        Route::get('/users/latest', [AdminDashboardController::class, 'latestUsers']);
        Route::get('/users', [AdminDashboardController::class, 'users']);
        Route::get('/users/{id}/details', [AdminDashboardController::class, 'showDetails']);
        Route::put('/users/{id}/status', [AdminDashboardController::class, 'updateStatus']);
        Route::delete('/users/{id}', [AdminDashboardController::class, 'deleteUser']);

        // message info 
        Route::get('/messages', [MessageController::class, 'index']);
    });

});

Route::middleware('auth:sanctum', 'role:user')->group(function(){

    Route::get('/profile', [UserProfileController::class, 'getProfile']);
    Route::post('/update-profile', [UserProfileController::class, 'updateProfile']);
    
    // Concact to admin 
    Route::post('/messages', [MessageController::class, 'store']);

    // USER dashboard
    Route::get('/my-properties', [PropertyPostController::class, 'index']);

    // CRUD
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{id}/subcategories', [SubCategoryController::class, 'byCategory']);
    Route::get('/subcategories/{id}', [SubCategoryController::class, 'show']);
    Route::apiResource('/properties', PropertyPostController::class);
    

    // User Promotion Requests
    Route::get('/user/promotion-plans', [PromotionPlanController::class, 'indexForUser']);
    Route::post('/user/promote-request', [PostPromotionRequestController::class, 'store']);
    Route::get('/user/promote-request', [PostPromotionRequestController::class, 'index']);


    Route::post('/logout',[AuthController::class,'logout']);

});

