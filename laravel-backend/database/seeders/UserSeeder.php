<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        {
            DB::table('users')->insert([
                [
                    'name' => 'Test',
                    'email' => 'test@gmail.com',
                    'username' => 'test@123',
                    'password' => Hash::make('Test@123'),
                    'created_at' => new \DateTime(),
                    'updated_at' => new \DateTime(),
                ],
                [
                    'name' => 'User',
                    'email' => 'admin@gmail.com',
                    'username' => 'admin',
                    'password' => Hash::make('123456'),
                    'created_at' => new \DateTime(),
                    'updated_at' => new \DateTime(),
                ],
            ]);
        }
    }
}
