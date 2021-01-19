<?php

use Illuminate\Database\Seeder;

class TechesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('teches')->insert([
            [
                'member_id' => 1,
                'team_id' => 1,
                'language_id' => 1,
                'code' => "<html>\n\t<h1>HTML文章です</h1>\n\t<a href=\"http://apple.com\">タグです</a>\n</html>",
                'command' => null,
                'link' => null,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'member_id' => 5,
                'team_id' => 1,
                'language_id' => 2,
                'code' => "h1 {\n\tcolor: #fff;\n\tfont-size: 14px;\n}",
                'command' => null,
                'link' => null,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'member_id' => 3,
                'team_id' => 2,
                'language_id' => 4,
                'code' => "<?php\nfunction calCircleArea(\$radius) {\n\t\$pai = 3.14;\n\t\$area = \$radius * \$radius * \$pai;\n\treturn \$area;\n}\n?>",
                'command' => null,
                'link' => null,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'member_id' => 1,
                'team_id' => 2,
                'language_id' => 3,
                'code' => "const btn = $('#btn');\nbtn.on('click', function() {\n\talert('error');\n});",
                'command' => null,
                'link' => null,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
        ]);
    }
}
