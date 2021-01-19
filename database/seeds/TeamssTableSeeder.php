<?php

use Illuminate\Database\Seeder;

class TeamssTableSeeder extends Seeder
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
                'team_name' => 'チームA',
                'team_photo' => null,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'team_name' => 'チームB',
                'team_photo' => null,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
        ]);
    }
}
