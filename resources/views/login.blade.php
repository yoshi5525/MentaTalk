@extends('layouts.app')
@extends('layouts.header')

<main class="main">
    <div class="main__main-inner">
        <div class="main__main-inner__form">
            <h3 class="main__main-inner__form__title">ログイン</h3>
            <form action="" method="post">
                <p><label>Eメール<span class="required">必須</span>
                    <input type="email" name="email"></label></p>
                <p><label>ログインパスワード<span class="required">必須</span>
                    <input type="password" name="password"></label></p>
                <input type="submit" value="ログイン">
            </form>
        </div>
    </div>
</main>
