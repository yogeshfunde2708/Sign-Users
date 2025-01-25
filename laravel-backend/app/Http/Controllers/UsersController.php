<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use App\Models\User;

class UsersController extends Controller
{
    protected $user;
    protected $statusCodeArr;

    public function __construct(User $user)
    {
        $this->user = $user;
        $this->statusCodeArr = Config::get("constant.status_codes");
    }

    public function saveUserData(Request $request)
    {
        $result = [];
        $result['status'] = false;
        $status = $this->statusCodeArr["server_error"];
        $this->validateUser($request);
        try {

            $data = $request->only('name', 'email', 'username');
            $id = !empty($request->id) ? $request->id : null;
            if (!empty($request->password)) {
                $data['password'] = $request->password;
            }
            if ($storeResult = $this->user->saveUserData($data, $id)) {
                $result["status"] = true;
                $result["user"] = $storeResult;
                $status = $this->statusCodeArr["created"];
            }
        } catch (\Exception $e) {
            $result["message"] = $e->getMessage();
        }
        return response($result, $status);
    }

    public function validateUser($request)
    {
        $id = !empty($request->id) ? $request->id : null;
        $rules = [
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . ($id ?? 'NULL') . ',id',
            'username' => 'nullable|unique:users,username,' . ($id ?? 'NULL') . ',id',
            'password' => [!$id ? 'required' : 'nullable', 'min:6', 'confirmed'],
            'password_confirmation' => [!empty($request->password) ?  'required' : 'nullable', 'min:6'],
        ];

        $request->validate($rules);
    }

    public function getUsersList(Request $request)
    {
        $result = [];
        $result['status'] = false;
        $status = $this->statusCodeArr["server_error"];
        try {
            $per_page = $request->query('per_page', 25);

            if ($users = $this->user->getAllUsers($per_page)) {
                $result["users"] = $users;
                $result['status'] = true;
                $status = $this->statusCodeArr["ok"];
            }
        } catch (\Exception $e) {
            $result["message"] = $e->getMessage();
        }
        return response($result, $status);
    }
}
