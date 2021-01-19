<?php

use Illuminate\Database\Seeder;
use League\CommonMark\Extension\Table\Table;

class LanguagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('languages')->insert([
            [
                'language' => 'HTML',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'language' => 'CSS',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'language' => 'JavaScript',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'language' => 'PHP',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'language' => 'Java',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'language' => 'Python',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'language' => 'Kotlin',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'language' => 'Swift',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'language' => 'C,C++',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'language' => 'R',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'language' => 'SQL',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'language' => 'その他',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
        ]);
    }
}
