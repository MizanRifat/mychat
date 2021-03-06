<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;


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
Route::get('/login/github', 'Auth\LoginController@redirectToProvider');
Route::get('/login/github/callback', 'Auth\LoginController@handleProviderCallback');

Route::view('/{path?}', 'main');
// Route::get('/', function () {
//     return view('home');
// });
Route::post('stripe', 'HomeController@paymentProcess')->name('stripe.post');

Auth::routes();

// Route::get('/home', 'HomeController@index')->name('home');
// Route::middleware('auth:web')->get('/user', function (Request $request) {
//     return $request->user();
// });
