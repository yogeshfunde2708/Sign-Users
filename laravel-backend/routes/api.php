<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Middleware\ForceJson;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\UsersController;

Route::group(["middleware" => [ForceJson::class]], function () {

    Route::post("/login", [LoginController::class, "login"]);
    Route::post("/register", [RegisterController::class, "register"]);

    Route::group(["middleware" => ["auth:api"]], function () {
        Route::post("/save-user-data", [UsersController::class, "saveUserData"]);
        Route::get("/users-list", [UsersController::class, "getUsersList"]);
        Route::delete("/delete-user/{id}", [UsersController::class, "deleteUser"]);
        Route::get("/get-user/{id}", [UsersController::class, "getUserById"]);
        Route::get("/add-user-data", [UsersController::class, "getAddUserData"]);
    });

});
