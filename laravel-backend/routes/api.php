<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Middleware\ForceJson;

Route::group(["middleware" => [ForceJson::class]], function () {

    Route::post("/register", [RegisterController::class, "register"]);

});
