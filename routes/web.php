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

// use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Route;

// Route::get('/', 'TeamController@index');

Route::group([], function () {
    Route::get('/', 'TeamController@index')->name('team.index');
    Route::get('/index', 'TeamController@index')->name('team.index');
    Route::get('/create', 'TeamController@create')->name('team.create');
    Route::post('/store', 'TeamController@store')->name('team.store');
    Route::get('/inputSearch', 'TeamController@inputSearch')->name('team.inputSearch');
    Route::post('/inputSearchRegister', 'TeamController@inputSearchRegister')->name('team.inputSearchRegister');
    Route::post('/inputSearchDelete', 'TeamController@inputSearchDelete')->name('team.inputSearchDelete');
    // Route::get('/show/{id}', 'TeamController@show')->name('team.show');
    // Route::get('/edit/{id}', 'TeamController@edit')->name('team.edit');
    // Route::post('/update{/id}', 'TeamController@update')->name('team.update');
    // Route::post('/destroy/{id}', 'TeamController@destroy')->name('team.destroy');
});

Route::group(['prefix' => 'member'], function () {
    Route::get('index', 'MemberController@index')->name('member.index');
    Route::get('create', 'MemberController@create')->name('member.create');
    Route::post('store', 'MemberController@store')->name('member.store');
//     Route::get('show/{id}', 'MemberController@show')->name('member.show');
//     Route::get('edit/{id}', 'MemberController@edit')->name('member.edit');
//     Route::post('update/{id}', 'MemberController@update')->name('member.update');
//     Route::post('destroy/{id}', 'MemberController@destroy')->name('member.destroy');
});

Route::group(['prefix' => 'message'], function () {
    Route::get('index', 'MessageController@index')->name('message.index');
});
