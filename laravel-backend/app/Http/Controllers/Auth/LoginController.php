<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;

class LoginController extends Controller
{
    public $statusCodeArr;

    public function __construct()
    {
        $this->statusCodeArr = Config::get("constant.status_codes");
    }

    public function login(Request $request)
    {

        $request->validate([
            "login" => "required",
            "password" => "required",
        ]);

        $login_type = filter_var($request->input('login'), FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
        $request->merge([$login_type => $request->input('login')]);

        if (!auth()->attempt($request->only($login_type, 'password'))) {
            return response(["message" => "Invalid Credentials"], 400);
        }

        $token = auth()->user()->createToken("loginusers")->accessToken;
        $user = auth()->user();

        return response([
            "user" => [
                'id' => $user->id,
                'name' => $user->first_name,
                'username' => $user->username,
                'email' => $user->email,
            ],
            "token" => $token,
        ]);
    }
}