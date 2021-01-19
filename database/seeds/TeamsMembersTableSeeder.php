<?php

use Illuminate\Database\Seeder;

class TeamsMembersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('teams_members')->insert([
            [
                'member_id' => 1,
                'team_id' => 1,
                'admin_member_id' => null,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'member_id' => 5,
                'team_id' => 1,
                'admin_member_id' => null,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'member_id' => 3,
                'team_id' => 1,
                'admin_member_id' => 3,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'member_id' => 5,
                'team_id' => 2,
                'admin_member_id' => null,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'member_id' => 2,
                'team_id' => 2,
                'admin_member_id' => null,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'member_id' => 4,
                'team_id' => 2,
                'admin_member_id' => 4,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
        ]);
    }
}
