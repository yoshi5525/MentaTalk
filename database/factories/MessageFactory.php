<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Message;
use Faker\Generator as Faker;

$factory->define(App\Models\Message::class, function (Faker $faker) {
    return [
        'member_id' => $faker->numberBetween($min = 1, $max = 16),
        'team_id' => $faker->numberBetween($min = 1, $max = 9),
        'message' => $faker->realText(70),
        'registered_at' => now(),
        'created_at' => now(),
        'updated_at' => now(),
    ];
});
