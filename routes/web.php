<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/api/catalog', function () {
    $json = DB::select('select * from categories');
    return $json;
});

Route::get('/api/catalog/{category}', function ($category) {
    if ($category) {
        $res = DB::select('select * from catalog where category = :category', 
        ['category' => $category]);
    if (isset($res)) {
        return $res;
    } else {
        return '[]';
    }
    }
});

Route::get('/api/catalog/{category}/{product}', function ($category, $product) {
    if ($category) {
        $res = DB::select('select * from catalog where category = :category AND path = :product', 
        ['category' => $category, 'product' => $product]);
    if (isset($res)) {
        return $res;
    } else {
        return '[]';
    }
    }
});

Route::view('/{path}', 'welcome')
    ->where('path', '.*');
