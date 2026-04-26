<?php

use Illuminate\Support\Facades\Route;

Route::get('/share/post/{id}', function ($id) {
    $post = \App\Models\Property::findOrFail($id);
    return view('share-post', compact('post'));
});

Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '^(?!api).*$');

//  Route::get('/link', function(){
//     Artisan::call('storage:link');
//  });