<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Middleware\ForceJson;
use App\Http\Controllers\Auth\LoginController;

Route::group(["middleware" => [ForceJson::class]], function () {

    Route::post("/login", [LoginController::class, "login"]);
    Route::post("/register", [RegisterController::class, "register"]);

});
