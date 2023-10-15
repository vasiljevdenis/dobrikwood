@php
    $path = Request::path();
    $title = '';
    $description = '';
    $keywords = '';
    if ($path !== '/' && count(explode("/", $path)) === 2) {
        $data = DB::table('categories')            
            ->select('meta_title', 'meta_description', 'meta_keywords')
            ->where('path', '=', explode("/", $path)[1])
            ->get();
            $title = $data[0]->meta_title . '. Купить в Добрик-Wood';
            $description = $data[0]->meta_description;    
            $keywords = $data[0]->meta_keywords;    
    } elseif ($path !== '/' && count(explode("/", $path)) === 3) {
        $data = DB::table('catalog')
            ->select('meta_title', 'meta_description', 'meta_keywords')
            ->where('category', '=', explode("/", $path)[1])
            ->where('path', '=', explode("/", $path)[2])
            ->get();
            $title = $data[0]->meta_title . '. Купить в Добрик-Wood';
            $description = $data[0]->meta_description;
            $keywords = $data[0]->meta_keywords;  
    } else {
        $title = config('meta.' . Request::path() . '.title');
        $description = config('meta.' . Request::path() . '.description');
        $keywords = config('meta.' . Request::path() . '.keywords');
    }
@endphp
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <meta content="{{ $description }}" name="description">
    <meta content="{{ $keywords }}" name="keywords">
    <meta name="referrer" content="no-referrer-when-downgrade">
    <meta name="format-detection" content="telephone=no">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="{{ config('app.name') }}">
    <meta property="og:url" content="{{ Request::url() }}">
    <meta property="og:locale" content="{{ str_replace('_', '-', app()->getLocale()) }}">
    <meta property="og:title" content="{{ $title }}">
    <meta property="og:description" content="{{ $description }}">
    <meta property="og:image" content="https://dobrik-wood.ru/storage/images/preview.jpg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <title>{{ $title }}</title>

    <!-- Favicon -->
    <link rel="shortcut icon" href="{{ env('APP_URL', '') . '/storage/images/favicon.svg' }}" type="image/x-icon">
    <!-- Canonical -->
    <link rel="canonical" href="{{ Request::url() }}">

    @viteReactRefresh
    @vite('resources/js/app.jsx')
      <!-- Yandex.Metrika counter -->
<script type="text/javascript" >
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
  
    ym(90346656, "init", {
         clickmap:true,
         trackLinks:true,
         accurateTrackBounce:true,
         webvisor:true
    });
  </script>
  <noscript><div><img src="https://mc.yandex.ru/watch/90346656" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
  <!-- /Yandex.Metrika counter -->
</head>

<body>
    <div id="app"></div>

</body>

</html>