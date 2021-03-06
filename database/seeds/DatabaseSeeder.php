<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(MembersTableSeeder::class);
        $this->call(TeamsTableSeeder::class);
        $this->call(TeamMemberTableSeeder::class);
        $this->call(MessagesTableSeeder::class);
        $this->call(LanguagesTableSeeder::class);
        $this->call(TechsTableSeeder::class);
    }
}
