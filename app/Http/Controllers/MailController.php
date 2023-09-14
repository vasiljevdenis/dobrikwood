<?php
 
namespace App\Http\Controllers;

use App\Mail\MailNotification;
use Mail;


class MailController extends Controller
{
     
  public function index($arr)
  {
    $data = [
      "subject"=>"Спасибо за заказ!",
      "body"=>$arr
      ];
    try
    {
      Mail::to($arr->email)->send(new MailNotification($data));
      return response()->json(['Great! Successfully send in your mail']);
    }
    catch(Exception $e)
    {
      return response()->json(['Sorry! Please try again later']);
    }
  } 
}