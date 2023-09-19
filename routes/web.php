<?php

use App\Http\Controllers\CdekController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Notifications\SendNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
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
Route::get('/api/catalog-{type}', function ($type) {
    $data = [];
    if ($type === "random") {
        $data = DB::table('catalog')
            ->inRandomOrder()
            ->where('category', '<>', 'deleted')
            ->limit(9)
            ->get();
    } elseif ($type === "sale") {
        $data = DB::table('catalog')
            ->where('badge', '<>', "new")
            ->where('badge', '<>', "top")
            ->where('category', '<>', 'deleted')
            ->limit(9)
            ->get();
    } else {
        $data = DB::table('catalog')
            ->where('badge', '=', $type)
            ->where('category', '<>', 'deleted')
            ->limit(9)
            ->get();
    }
    return $data;
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
// Route::get('/api/cdek/neworder', [CdekController::class, 'createOrder']);

Route::post('/api/order/new', [OrderController::class, 'newOrder']);
Route::post('/api/customorder/new', [OrderController::class, 'newCustomOrder']);
Route::get('/api/order/notification', function (Request $request) {
    $db = DB::table('orders')
        ->where('id', '=', (int) $request->input('id'))
        ->get()[0];
    Notification::route('chat_id', config('services.telegram-bot-api.chatid'))
        ->route('id', $db->id)
        ->route('name', $db->name)
        ->route('lastName', $db->lastName)
        ->route('phone', $db->phone)
        ->route('email', $db->email)
        ->route('nameSecond', $db->nameSecond)
        ->route('lastNameSecond', $db->lastNameSecond)
        ->route('phoneSecond', $db->phoneSecond)
        ->route('price', $db->price)
        ->route('delivery', $db->delivery)
        ->route('delivery_sum', $db->delivery_sum)
        ->route('delivery_type', $db->delivery_type)
        ->route('delivery_days', $db->delivery_days)
        ->route('date', $db->date)
        ->route('goods', $db->goods)
        ->route('note', $db->note)
        ->notify(new SendNotification);
});
Route::get('/api/order/mail', function (Request $request) {
    $db = DB::table('orders')
        ->where('id', '=', (int) $request->input('id'))
        ->get()[0];
    $mc = new MailController();
    return $mc->index($db);
});

Auth::routes();

Route::post('/user/changeemail', [UserController::class, 'changeEmail']);
Route::post('/user/changepassword', [UserController::class, 'changePassword']);

Route::post('/api/payment', [PaymentController::class, 'yooKassa']);

Route::view('/{path}', 'welcome', [])
    ->where('path', '.*');
