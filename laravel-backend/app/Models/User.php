<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Spatie\QueryBuilder\QueryBuilder;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;
    use HasApiTokens;
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'username',
        'password',
        'email_verified_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function saveUserData($data, $id = 0)
    {
        $result = false;
        try {
            DB::beginTransaction();
            $result = User::updateOrCreate(['id' => $id], $data);

            if ($result) {
                DB::commit();
            } else {
                DB::rollBack();
            }
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error($th);
            $result = false;
            throw $th;
        }

        return $result;
    }

    public function getAllUsers($per_page = 25)
    {
        $users = QueryBuilder::for(User::class)
            ->select(
                'id',
                'name',
                'email',
                'username',
            )
            ->allowedSorts('name', 'email', 'username')
            ->paginate($per_page ?: 25)
            ->appends(request()->query());
        return $users;
    }
}
