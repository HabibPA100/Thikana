<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '^(?!api).*$');

//  Route::get('/link', function(){
//     Artisan::call('storage:link');
//  });