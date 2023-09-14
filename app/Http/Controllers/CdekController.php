<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class CdekController extends Controller
{
    function apiError($msg)
    {
        $result = array(
            "status" => false,
            "message" => $msg
        );
        return json_encode($result);
    }

    public function calcShipping(Request $request)
    {
        $tariff_code = $request->input('tariff_code');
        $from_location = $request->input('from_location');
        $to_location = $request->input('to_location');
        $packages = $request->input('packages');
        if ($tariff_code && $from_location && $to_location && $packages) {
            $response = Http::asForm()->post('https://api.cdek.ru/v2/oauth/token', [
                'grant_type' => 'client_credentials',
                'client_id' => env('CDEK_CLIENT_ID', ''),
                'client_secret' => env('CDEK_CLIENT_SECRET', '')
            ]);
            if ($response->ok()) {

                $token = $response->json()['access_token'];
                $response = Http::withToken($token)->post('https://api.cdek.ru/v2/calculator/tariff', [
                    'tariff_code' => $tariff_code,
                    'from_location' => array(
                        'address' => $from_location
                    ),
                    'to_location' => array(
                        'address' => $to_location
                    ),
                    'packages' => $packages
                ]);
                if ($response->ok()) {
                    $response = $response->json();
                    $result = array(
                        "status" => true,
                        "total_sum" => $response['total_sum'],
                        "period_min" => $response['period_min'],
                        "period_max" => $response['period_max']
                    );
                    return json_encode($result);
                } else {
                    return $this->apiError($response->json()['errors'][0]['message']);
                }
            } else {
                return $this->apiError('Неизвестная ошибка!');
            }
        } else {
            return $this->apiError('Неверно введен адрес!');
        }
    }

    public function createOrder()
    {
        $fields = DB::table('orders')
            ->select('id', 'cdek')
            ->where('status', '=', 'created')
            ->get();
        if ($fields) {
            $response = Http::asForm()->post('https://api.cdek.ru/v2/oauth/token', [
                'grant_type' => 'client_credentials',
                'client_id' => env('CDEK_CLIENT_ID', ''),
                'client_secret' => env('CDEK_CLIENT_SECRET', '')
            ]);
            if ($response->ok()) {
                $token = $response->json()['access_token'];
                foreach ($fields as $key => $value) {
                    $resp = Http::withToken($token)->post('https://api.cdek.ru/v2/orders', json_decode($value->cdek, true));
                    if ($resp->json()['requests'][0]['state'] != "INVALID") {
                        $affected = DB::table('orders')
                            ->where('id', $value->id)
                            ->update(['status' => 'processing', 'cdek->uuid' => $resp->json()['entity']['uuid']]);
                        $result = array(
                            "status" => true
                        );
                        return json_encode($result);
                    } else {
                        return $this->apiError($resp->json()['requests'][0]['errors'][0]['message']);
                    }
                }
            } else {
                return $this->apiError('Ошибка авторизации!');
            }
        } else {
            return $this->apiError('Нет данных!');
        }
    }
}
