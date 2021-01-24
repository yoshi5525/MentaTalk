<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTechsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('techs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('member_id')->unsigned();
            $table->bigInteger('team_id')->unsigned();
            $table->bigInteger('language_id')->unsigned();
            $table->string('code', 1000)->nullable();
            $table->string('command', 1000)->nullable();
            $table->string('link', 1000)->nullable();
            $table->foreign('member_id')->references('id')->on('members');
            $table->foreign('team_id')->references('id')->on('teams');
            $table->foreign('language_id')->references('id')->on('languages');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('techs');
    }
}
