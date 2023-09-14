🔔<b> Новый заказ на сайте! </b>🔔

<i><b>СВЕДЕНИЯ О ЗАКАЗЕ</b></i>
<b>Номер заказа:</b> {{ $data['id'] }}
<b>Статус оплаты:</b> оплачено
<b>Дата/время:</b> {{ date('d.m.Y H:i:s', strtotime($data['date'])) }}
<b>Сумма заказа:</b> {{ number_format($data['price'] + $data['delivery_sum'], 0, '', ' ') . ' ₽' }}
@if (mb_strlen($data['note']) !== 0)
<b>Примечание:</b> {{ $data['note'] }}
@endif

<i><b>ПОЗИЦИИ ЗАКАЗА</b></i>
@foreach (json_decode($data['goods'], true) as $key => $value)
{{ $value['name'] . ' #' . $key . ' - ' . $value['count'] . ' шт.' }}
{{ number_format($value['price'], 0, '', ' ') . ' ₽' }}
@endforeach

<i><b>СВЕДЕНИЯ О ДОСТАВКЕ</b></i>
<b>Доставка:</b> {{ $data['delivery_sum'] === 0 ? "нет, самовывоз" : "да" }}
@if ($data['delivery_sum'] > 0)
<b>Тип доставки:</b> {{ $data['delivery_type'] }}
<b>Срок доставки:</b> {{ $data['delivery_days'] }}
<b>Стоимость доставки:</b> {{ number_format($data['delivery_sum'], 0, '', ' ') . ' ₽' }}
<b>Адрес:</b> {{ $data['delivery'] }}
@endif

<i><b>{{ mb_strlen($data['nameSecond']) === 0 && mb_strlen($data['lastNameSecond']) === 0 && mb_strlen($data['phoneSecond']) === 0 ? "ЗАКАЗЧИК/ПОЛУЧАТЕЛЬ" : "ЗАКАЗЧИК" }}</b></i>
<b>Имя:</b> {{ $data['name'] }}
<b>Фамилия:</b> {{ $data['lastName'] }}
<b>Телефон:</b> {{ $data['phone'] }}
<b>E-mail:</b> {{ $data['email'] }}

@if (mb_strlen($data['nameSecond']) !== 0 && mb_strlen($data['lastNameSecond']) !== 0 && mb_strlen($data['phoneSecond']) !== 0)
<i><b>ПОЛУЧАТЕЛЬ</b></i>
<b>Имя:</b> {{ $data['nameSecond'] }}
<b>Фамилия:</b> {{ $data['lastNameSecond'] }}
<b>Телефон:</b> {{ $data['phoneSecond'] }}
@endif
