<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    // Route::post('login', 'AuthController@login');
    Route::post('login', [ 'as' => 'login', 'uses' => 'AuthController@login']);
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('check', 'AuthController@me');

});

// Rooms
Route::prefix('/rooms')->group(function () {

    Route::get('/', 'RoomController@get');

});

// Users
Route::prefix('/users')->group(function ($router) {

    Route::post('/', 'Auth\RegisterController@create');
    Route::get('/', function () {
        return 'users';
    });
});

// Times
Route::prefix('/times')->group(function () {
    Route::get('/', function () {
        return 'times';
    });
});
