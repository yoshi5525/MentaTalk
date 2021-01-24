<div class="header__inner inner">
    <div class="header__inner__logo">
        <a href="{{ route('team.index') }}">MENTA Talk</a>
    </div>
    <ul class="header__inner__icons">
        <li class="header__inner__icons__icon"><a href="{{ route('team.index') }}"><button class="btn icon-btn" title="トップページへ"><i class="fas fa-comments"></i></button></a></li>
        <li class="header__inner__icons__icon"><a href="{{ route('team.create') }}"><button class="btn icon-btn" title="チーム追加・編集"><i class="fas fa-users-cog"></i></button></a></li>
        <li class="header__inner__icons__icon"><a href="user.html"><button class="btn icon-btn" title="ユーザー情報編集"><i class="fas fa-user-cog"></i></button></a></li>
        <li class="header__inner__icons__icon"><a href="login.html"><button class="btn icon-btn" title="ログイン画面へ"><i class="fas fa-user"></i></button></a></li>
    </ul>
    <div class="header__inner__menus">
        <i class="fas fa-ellipsis-h fa-2x"></i>
        <i class="fas fa-times fa-2x"></i>
        <ul class="header__inner__menus__nav-lists">
            <li class="header__inner__menus__nav-lists__nav-list"><a href="{{ route('team.index') }}" title="トップページへ">TOP</a></li>
            <li class="header__inner__menus__nav-lists__nav-list"><a href="{{ route('team.create') }}" title="チーム追加・編集">TEAM</a></li>
            <li class="header__inner__menus__nav-lists__nav-list"><a href="user.html" title="ユーザー情報編集">USER</a></li>
            <li class="header__inner__menus__nav-lists__nav-list"><a href="login.html" title="ログイン画面へ">LOGIN</a></li>
        </ul>
    </button>
</div>