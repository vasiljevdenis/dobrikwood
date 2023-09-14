<!DOCTYPE html>
<html>
<head>
    <title>Спасибо за заказ!</title>
</head>
<body>
    <a href="https://dobrik-wood.ru/"><img src="https://quickres.store/storage/images/header_mail.jpg" alt="Header image" style="width: 100%; max-width: 100vw; border-radius: 12px;"></a>
    
    <div style="text-align: center; padding: 5px 1px;">
        <h1 style="text-align: center;">🔔<b> Спасибо за заказ! </b>🔔</h1>
    </div>
    <br>
    @php
    $data = json_decode(json_encode($data['body']), true);
    @endphp
    <p><i><b>СВЕДЕНИЯ О ЗАКАЗЕ</b></i></p>
    <p><b>Номер заказа:</b> {{ $data['id'] }}</p>
    <p><b>Сумма заказа:</b> {{ number_format($data['price'] + $data['delivery_sum'], 0, '', ' ') . ' ₽' }}</p>
    <br>
    <p><i><b>ПОЗИЦИИ ЗАКАЗА</b></i></p>
    @foreach (json_decode($data['goods'], true) as $key => $value)
    <p>{{ $value['name'] . ' #' . $key . ' - ' . $value['count'] . ' шт.' }}</p>
    <p>{{ number_format($value['price'], 0, '', ' ') . ' ₽' }}</p>
    @endforeach
    <br>
    <p><i><b>СВЕДЕНИЯ О ДОСТАВКЕ</b></i></p>
    <p><b>Доставка:</b> {{ $data['delivery_sum'] === 0 ? "самовывоз" : "да" }}</p>
    @if ($data['delivery_sum'] > 0)
    <p><b>Тип доставки:</b> {{ $data['delivery_type'] }}</p>
    <p><b>Срок доставки:</b> {{ $data['delivery_days'] }}</p>
    <p><b>Стоимость доставки:</b> {{ number_format($data['delivery_sum'], 0, '', ' ') . ' ₽' }}</p>
    <p><b>Адрес:</b> {{ $data['delivery'] }}</p>
    @endif
    <br>
    <p><i><b>{{ mb_strlen($data['nameSecond']) === 0 && mb_strlen($data['lastNameSecond']) === 0 && mb_strlen($data['phoneSecond']) === 0 ? "ЗАКАЗЧИК/ПОЛУЧАТЕЛЬ" : "ЗАКАЗЧИК" }}</b></i></p>
    <p><b>Имя:</b> {{ $data['name'] }}</p>
    <p><b>Фамилия:</b> {{ $data['lastName'] }}</p>
    <p><b>Телефон:</b> {{ $data['phone'] }}</p>
    <p><b>E-mail:</b> {{ $data['email'] }}</p>
    <br>
    @if (mb_strlen($data['nameSecond']) !== 0 && mb_strlen($data['lastNameSecond']) !== 0 && mb_strlen($data['phoneSecond']) !== 0)
    <p><i><b>ПОЛУЧАТЕЛЬ</b></i></p>
    <p><b>Имя:</b> {{ $data['nameSecond'] }}</p>
    <p><b>Фамилия:</b> {{ $data['lastNameSecond'] }}</p>
    <p><b>Телефон:</b> {{ $data['phoneSecond'] }}</p>
    @endif
</body>
</html>