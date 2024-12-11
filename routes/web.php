<?php

use App\Http\Controllers\CdekController;
use App\Http\Controllers\CdekService;
use App\Http\Controllers\MailController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\UserController;
use App\Notifications\SendNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

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

Route::get('/api/getproduct', function (Request $request) {
    $id = $request->input('id');
    $res = DB::select(
        'select * from catalog where id = :id',
        ['id' => $id]
    );
    if (isset($res)) {
        return $res;
    } else {
        return '[]';
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

Route::post('/api/catalog/new', function (Request $request) {
    $catalogData = [];
    foreach ($request->except(['_token', 'images']) as $key => $value) {
        $catalogData[$key] = $value;
    }

    $images_arr = [];

    if ($request->hasFile('images')) {
        $num = 1;
        foreach ($request->file('images') as $image) {
            $extension = $image->getClientOriginalExtension();
            $filename = $request->input('path') . $num . '.' . $extension;
            $path = Storage::putFileAs('public/images/' . $request->input('category'), $image, $filename);
            array_push($images_arr, str_replace("public", "storage", $path));
            $num++;
        }
    }

    $catalogData['images'] = json_encode($images_arr);
    $catalogData['rate_history'] = '[5]';
    $catalogId = DB::table('catalog')->insertGetId($catalogData);
    if ($catalogId) {
        return $catalogId;
    }
});
Route::post('/api/catalog/update', function (Request $request) {
    $catalogData = [];
    foreach ($request->except(['_token', 'images', 'deletedImages', 'newImages']) as $key => $value) {
        $catalogData[$key] = $value;
    }

    $images_arr = [];

    if ($request->has('deletedImages')) {
        foreach ($request->input('deletedImages') as $key => $value) {
            $res = Storage::delete(str_replace("storage", "public", $value));
        }
        if ($request->has('images')) {
            $n = 1;
            foreach ($request->input('images') as $key => $value) {
                $newName = 'public/images/' . $request->input('category') . "/" . $request->input('path') . $n . '.' . explode(".", $value)[1];
                $rename = Storage::move(str_replace("storage", "public", $value), $newName);
                array_push($images_arr, str_replace("public", "storage", $newName));
                $n++;
            }
        }
    } else {
        $images_arr = $request->input('images');
    }

    if ($request->hasFile('newImages')) {
        $num = is_array($request->input('images')) ? count($request->input('images')) + 1 : 1;
        foreach ($request->file('newImages') as $image) {
            $extension = $image->getClientOriginalExtension();
            $filename = $request->input('path') . $num . '.' . $extension;
            $path = Storage::putFileAs('public/images/' . $request->input('category'), $image, $filename);
            array_push($images_arr, str_replace("public", "storage", $path));
            $num++;
        }
    }

    $catalogData['images'] = json_encode($images_arr);
    $catalogData['rate_history'] = '[5]';
    $catalogId = DB::table('catalog')->where('path', $catalogData['path'])->update($catalogData);
    if ($catalogId) {
        return $catalogId;
    }
});
Route::post('/api/catalog/delete', function (Request $request) {
    $goods = $request->input('ids');
    $res = DB::table('catalog')
        ->select('images')
        ->whereIn('id', $goods)
        ->get();
    if (isset($res)) {
        foreach ($res as $key => $value) {
            foreach (json_decode($value->images) as $k => $v) {
                $p = Storage::delete(str_replace('storage', 'public', $v));
            }
        }
        $resp = DB::table('catalog')
            ->whereIn('id', $goods)
            ->delete();
        if (isset($resp)) {
            return $resp;
        }
    }
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

Route::post('/api/page/text', function (Request $request) {
    $page = $request->input('page');
    $text = $request->input('text');
    $json = DB::update('update pages set text = :text where page = :page', ['text' => $text, 'page' => $page]);
    return $json;
});
Route::post('/api/page/title', function (Request $request) {
    $page = $request->input('page');
    $title = $request->input('title');
    $json = DB::update('update pages set title = :title where page = :page', ['title' => $title, 'page' => $page]);
    return $json;
});
Route::post('/api/page/image', function (Request $request) {
    // Storage::makeDirectory('/public/images/');
    $path = $request->image->storeAs('/public/images/', $request->input('page') . '.' . $request->image->extension());
    $page = $request->input('page');
    $image = '/storage/images/' . $request->input('page') . '.' . $request->image->extension();
    $json = DB::update('update pages set image = :image where page = :page', ['image' => $image, 'page' => $page]);
    return $json;
});
Route::get('/api/page/{page}', function ($page) {
    $json = DB::select('select * from pages where page = :page', ['page' => $page]);
    return $json;
});

Route::get('/api/slider', function () {
    $json = DB::select('select * from slider');
    return $json;
});

Route::post('/api/slider/update', function (Request $request) {
    $slider = json_decode($request->input('slider'), true);
    foreach ($slider as $el) {
        $priority = $el['priority'];
        $id = $el['id'];
        $json = DB::update('update slider set priority = :priority where id = :id', ['priority' => $priority, 'id' => $id]);
    }
});

Route::post('/api/slider/delete', function (Request $request) {
    $id = $request->input('id');
    $json = DB::delete('delete from slider where id = :id', ['id' => $id]);
    return $json;
});

Route::post('/api/slider/new', function (Request $request) {
    $image = '';
    $uniqid = uniqid();
    if ($request->hasFile('image')) {
        $path = $request->image->storeAs('/public/images/', $uniqid . '.' . $request->image->extension());
        $image = '/storage/images/' . $uniqid . '.' . $request->image->extension();
    } else {
        $image = $request->input('image');
    }
    $target = $request->input('target');
    $priority = $request->input('priority');
    $link = $request->input('link');
    $json = DB::insert('insert into slider (image, link, priority, target) values (?, ?, ?, ?)', [$image, $link, $priority, $target]);
    return $json;
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
Route::match(['get', 'post'], '/api/cdek/service', function (Request $request) {
    $service = new CdekService(env('CDEK_CLIENT_ID', ''), env('CDEK_CLIENT_SECRET', ''));
    $service->process($request, $request->all());
});

Auth::routes();

Route::post('/user/changeemail', [UserController::class, 'changeEmail']);
Route::post('/user/changepassword', [UserController::class, 'changePassword']);

Route::post('/api/payment', [PaymentController::class, 'yooKassa']);

Route::view('/{path}', 'welcome', [])
    ->where('path', '.*');