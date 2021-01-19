<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'TeamController@index');

Route::group([], function () {
    Route::get('/', 'TeamController@index')->name('team.index');
    Route::get('/index', 'TeamController@index')->name('team.index');
});