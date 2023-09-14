<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    function apiError($msg)
    {
        $result = array(
            "status" => false,
            "message" => $msg
        );
        return json_encode($result);
    }
    
    public function newOrder(Request $request)
    {
        $id = DB::table('orders')->insertGetId([
            'name' => $request->input('name'),
            'lastName' => $request->input('lastName'),
            'phone' => $request->input('phone'),
            'email' => $request->input('email'),
            'note' => $request->input('note'),
            'nameSecond' => $request->has('recipient') ? $request->input('recipient')['name'] : '',
            'lastNameSecond' => $request->has('recipient') ? $request->input('recipient')['lastName'] : '',
            'phoneSecond' => $request->has('recipient') ? $request->input('recipient')['phone'] : '',
            'delivery' => $request->input('address'),
            'delivery_type' => $request->has('delivery_type') ? $request->input('delivery_type') : null,
            'delivery_sum' => $request->has('delivery_sum') ? $request->input('delivery_sum') : 0,
            'delivery_days' => $request->has('delivery_days') ? $request->input('delivery_days') : null,
            'company' => 'CDEK',
            'goods' => json_encode($request->input('goods')),
            'price' => $request->input('price'),
            'ip_adress' => $request->ip(),
            'cdek' => $request->has('cdek') ? json_encode($request->input('cdek')) : null
        ]);
    if (isset($id)) {
        $result = array(
            "status" => true,
            "order_id" => $id
        );
        return json_encode($result);
    }        
    }
}
