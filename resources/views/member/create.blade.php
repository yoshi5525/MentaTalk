@extends('layouts.layout')
@extends('header')
@section('content')
    <main class="main">
        <div class="main__main-inner">
            <div class="main__main-inner__form">
                <h3 class="main__main-inner__form__title">アカウント登録</h3>
                <form action="" method="post">
                    <p><label>ユーザーアイコン画像
                        <input type="file" name="img" id="icon-img"><i class="fas fa-image"></i></label></p>
                    <div id="form-preview-icon">
                        <img src="../images/no-image.png" id="preview-icon-img">
                    </div>
                    <p><label>ユーザー名<span class="required">必須</span>
                        <input type="text" name="name"></label></p>
                    <p><label>Eメール<span class="required">必須</span>
                        <input type="email" name="email"></label></p>
                    <p><label>メンバー登録承認キー(半角英数字10文字)<span class="required">必須</span>
                        <input type="text" name="team_key" id="check-form"></label></p>
                    <p><label>ログインパスワード<span class="required">必須</span>
                        <input type="password" name="password"></label></p>
                    <input type="submit" value="会員登録">
                </form>
            </div>
        </div>
    </main>
@endsection