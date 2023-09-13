<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use YooKassa\Client;

class PaymentController extends Controller
{
    function apiError($msg)
    {
        $result = array(
            "status" => false,
            "message" => $msg
        );
        return json_encode($result);
    }

    public function yooKassa(Request $request)
    {
        $orderId = $request->input('orderId');
        $sum = DB::table('orders')
            ->select('price', 'delivery_sum')
            ->where('id', '=', $orderId)
            ->get();
        $sum = $sum[0]->price + $sum[0]->delivery_sum;
        $client = new Client();
        $client->setAuth(env('YOOKASSA_CLIENT_ID', ''), env('YOOKASSA_CLIENT_SECRET', ''));
        $payment = $client->createPayment(
            array(
                'amount' => array(
                    'value' => $sum,
                    'currency' => 'RUB',
                ),
                'confirmation' => array(
                    'type' => 'embedded'
                ),
                'capture' => true,
                'description' => 'Оплата заказа в интернет-магазине Добрик-Wood',
                'metadata' => array(
                    'order_id' => $orderId,
                )
            ),
            uniqid('', true)
        );
        $status = $payment->getStatus();
        $confirmationUrl = $payment->getConfirmation()->getConfirmationToken();
        $result = array(
            "status" => $status,
            "confirmation_url" => $confirmationUrl
        );
        return json_encode($result);
    }
}
