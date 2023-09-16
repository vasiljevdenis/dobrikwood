🔔<b> Новый заказ на сайте! </b>🔔
Мебель на заказ

<b>Имя:</b> {{ $data['name'] }}
<b>Телефон:</b> {{ $data['phone'] }}
<b>Вид изделия:</b> {{ $data['type'] }}
@if (mb_strlen($data['material']) !== 0)
<b>Материал:</b> {{ $data['material'] }}
@endif
@if (mb_strlen($data['color']) !== 0)
<b>Расцветка:</b> {{ $data['color'] }}
@endif
@if (mb_strlen($data['size']) !== 0)
<b>Размеры:</b> {{ $data['size'] }}
@endif
@if (mb_strlen($data['other']) !== 0)
<b>Доп. характеристики:</b> {{ $data['other'] }}
@endif
