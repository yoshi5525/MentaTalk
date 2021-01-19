<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class MembersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('members')->insert([
            [
                'name' => 'ニシ',
                'email' => 'nishi@gmail.com',
                'password' => Hash::make('nishinishi'),
                'member_photo' => null,
                'member_key' => '1111111111',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'name' => 'シマ',
                'email' => 'shima@gmail.com',
                'password' => Hash::make('shimashima'),
                'member_photo' => null,
                'member_key' => '2222222222',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'name' => 'サト',
                'email' => 'sato@gmail.com',
                'password' => Hash::make('satosato'),
                'member_photo' => null,
                'member_key' => '3333333333',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'name' => 'ケン',
                'email' => 'ken@gmail.com',
                'password' => Hash::make('kenken'),
                'member_photo' => null,
                'member_key' => '4444444444',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'name' => 'アオ',
                'email' => 'ao@gmail.com',
                'password' => Hash::make('aoao'),
                'member_photo' => null,
                'member_key' => '5555555555',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
        ]);
    }
}
