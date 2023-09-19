<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function changePassword(Request $request)
    {
        $user =  User::find(1);
        $user->password = Hash::make($request->new_password);
        $user->save();
        return back()->with('success', "Пароль успешно изменен!");
    }

    public function changeEmail(Request $request)
    {
        $user =  User::find(1);
        $user->email = $request->new_email;
        $user->save();
        return back()->with('success', "Email успешно изменен!");
    }
}
