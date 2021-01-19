<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Menta_talk') }}</title>

    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Fontawesome -->
    <link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <header class="header">
        <div class="header__inner inner">
            <div class="header__inner__logo">
                <a href="index.html">MENTA Talk</a>
            </div>
            <ul class="header__inner__icons">
                <li class="header__inner__icons__icon"><a href="index.html"><button class="btn icon-btn"><i class="fas fa-comments"></i></button></a></li>
                <li class="header__inner__icons__icon"><a href="team.html"><button class="btn icon-btn"><i class="fas fa-users-cog"></i></button></a></li>
                <li class="header__inner__icons__icon"><a href="user.html"></href><button class="btn icon-btn"><i class="fas fa-user-cog"></i></button></a></li>
                <li class="header__inner__icons__icon"><a href="login.html"><button class="btn icon-btn"><i class="fas fa-user"></i></button></a></li>
            </ul>
            <div class="header__inner__menus">
                <i class="fas fa-ellipsis-h fa-2x"></i>
                <i class="fas fa-times fa-2x"></i>
                <ul class="header__inner__menus__nav-lists">
                    <li class="header__inner__menus__nav-lists__nav-list"><a href="index.html">TOP</a></li>
                    <li class="header__inner__menus__nav-lists__nav-list"><a href="team.html">TEAM</a></li>
                    <li class="header__inner__menus__nav-lists__nav-list"><a href="user.html">USER</a></li>
                    <li class="header__inner__menus__nav-lists__nav-list"><a href="login.html">LOGIN</a></li>
                </ul>
            </button>
        </div>
    </header>

    <main>
        @yield('team')
    </main>

</body>
</html>