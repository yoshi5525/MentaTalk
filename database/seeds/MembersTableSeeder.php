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
            [
                'name' => 'シン',
                'email' => 'shin@gmail.com',
                'password' => Hash::make('shinshin'),
                'member_photo' => null,
                'member_key' => '6666666666',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'name' => 'タケ',
                'email' => 'take@gmail.com',
                'password' => Hash::make('taketake'),
                'member_photo' => null,
                'member_key' => '7777777777',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'name' => 'こびと',
                'email' => 'kobito@gmail.com',
                'password' => Hash::make('kobitokobito'),
                'member_photo' => null,
                'member_key' => '8888888888',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'name' => 'りょう',
                'email' => 'ryo@gmail.com',
                'password' => Hash::make('ryoryo'),
                'member_photo' => null,
                'member_key' => '9999999999',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'name' => 'ホン',
                'email' => 'hon@gmail.com',
                'password' => Hash::make('honhon'),
                'member_photo' => null,
                'member_key' => '0000000000',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'name' => 'タナ',
                'email' => 'tana@gmail.com',
                'password' => Hash::make('tanatana'),
                'member_photo' => null,
                'member_key' => 'aaaaaaaaaa',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'name' => 'ササキ',
                'email' => 'sasaki@gmail.com',
                'password' => Hash::make('sasakisasaki'),
                'member_photo' => null,
                'member_key' => 'bbbbbbbbbb',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'name' => 'カネ',
                'email' => 'kane@gmail.com',
                'password' => Hash::make('kanekane'),
                'member_photo' => null,
                'member_key' => 'cccccccccc',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'name' => 'キリ',
                'email' => 'kiri@gmail.com',
                'password' => Hash::make('kirikiri'),
                'member_photo' => null,
                'member_key' => 'dddddddddd',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'name' => 'タタ',
                'email' => 'tata@gmail.com',
                'password' => Hash::make('tatatata'),
                'member_photo' => null,
                'member_key' => 'eeeeeeeeee',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'name' => 'ノモ',
                'email' => 'nomo@gmail.com',
                'password' => Hash::make('nomonomo'),
                'member_photo' => null,
                'member_key' => 'ffffffffff',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
        ]);
    }
}
