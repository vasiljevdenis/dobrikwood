<?php

use App\Http\Controllers\CdekController;
use Illuminate\Http\Request;
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
        $res = DB::select(
            'select * from catalog where category = :category',
            ['category' => $category]
        );
        if (isset($res)) {
            return $res;
        } else {
            return '[]';
        }
    }
});

Route::get('/api/search', function (Request $request) {
    $query = $request->input('query');
    $res = DB::table('catalog')
        ->where('name', 'like', '%' . $query . '%')
        ->where('category', '<>', 'deleted')
        ->get();
    if (isset($res)) {
        return $res;
    }
});

Route::get('/api/catalog/{category}/{product}', function ($category, $product) {
    if ($category) {
        $res = DB::select(
            'select * from catalog where category = :category AND path = :product',
            ['category' => $category, 'product' => $product]
        );
        if (isset($res)) {
            return $res;
        } else {
            return '[]';
        }
    }
});

Route::post('/api/catalog/{category}/{product}/rate', function (Request $request) {
    $id = $request->input('id');
    $rate = $request->input('rate');
    $rate_history = DB::select('select rate_history from catalog where id = :id', ['id' => $id]);
    $rate_history = json_decode($rate_history[0]->rate_history);
    array_push($rate_history, $rate);
    $newRate = array_sum($rate_history) / count($rate_history);
    $newRate = ceil($newRate);
    $json = DB::update('update catalog set rate = :rate, rate_history = :rateHistory where id = :id', ['rate' => $newRate, 'rateHistory' => json_encode($rate_history), 'id' => $id]);
    return $json;
});

Route::post('/api/cart/goods', function (Request $request) {
    $goods = $request->input('goods');
    $res = DB::table('catalog')
        ->whereIn('id', $goods)
        ->get();
    if (isset($res)) {
        return $res;
    }
});

Route::post('/api/calculator', [CdekController::class, 'calcShipping']);

Route::view('/{path}', 'welcome')
    ->where('path', '.*');
