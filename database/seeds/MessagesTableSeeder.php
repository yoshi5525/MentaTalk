<?php

use Illuminate\Database\Seeder;

class MessagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('messages')->insert([
            [
                'member_id' => 1,
                'team_id' => 1,
                'message' => 'よろしくお願いします。',
                'registered_at' => new DateTime(),
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'member_id' => 5,
                'team_id' => 1,
                'message' => 'コードを積極的に共有します!',
                'registered_at' => new DateTime(),
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'member_id' => 3,
                'team_id' => 1,
                'message' => 'チャットもできますよ^-^',
                'registered_at' => new DateTime(),
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'member_id' => 4,
                'team_id' => 2,
                'message' => '仕事用のメンバーグループです。',
                'registered_at' => new DateTime(),
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'member_id' => 2,
                'team_id' => 2,
                'message' => '仕事時間中のみのやり取りです',
                'registered_at' => new DateTime(),
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'member_id' => 4,
                'team_id' => 2,
                'message' => 'URL求む',
                'registered_at' => new DateTime(),
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
        ]);
    }
}
