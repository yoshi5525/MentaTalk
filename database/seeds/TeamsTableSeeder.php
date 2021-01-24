<?php

use Illuminate\Database\Seeder;

class TeamsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('teams')->insert([
            [
                'team_name' => 'チームABC',
                'team_photo' => null,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'team_name' => '株式会社テック',
                'team_photo' => null,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'team_name' => '東京大学1期生',
                'team_photo' => null,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'team_name' => '渋谷もくもく会',
                'team_photo' => null,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'team_name' => 'チーム北海道',
                'team_photo' => null,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'team_name' => 'サーバーサイド部門',
                'team_photo' => null,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'team_name' => '新宿もくもく会',
                'team_photo' => null,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'team_name' => 'ショッピングアプリチーム開発',
                'team_photo' => null,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'team_name' => 'アジャイル開発部門',
                'team_photo' => null,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
        ]);
    }
}
