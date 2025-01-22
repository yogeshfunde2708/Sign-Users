<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public $statusCodeArr;

    public function __construct()
    {
        $this->statusCodeArr = Config::get("constant.status_codes",[]);
    }

    public function register(Request $request)
    {
        $request->validate([
            "name" => "required|string|max:255",
            "email" => 'required|email|unique:users',
            'username' => 'required|string|max:255|unique:users',
            "password" => "required|string|min:6|confirmed",
        ]);

        try {
            $user = User::create([
                "name" => $request->name,
                "email" => $request->email,
                'username' => $request->username,
                "password" => Hash::make($request->password),
            ]);

            $token = $user->createToken("signusers")->accessToken;

            return response()->json([
                "user" => $user,
                "token" => $token,
                "message" => "Registration successful",
            ], $this->statusCodeArr["created"]);
        } catch (\Exception $e) {
            return response()->json([
                "message" => "An error occurred during registration.",
                "error" => $e->getMessage(),
            ], $this->statusCodeArr["server_error"]);
        }
    }
}
