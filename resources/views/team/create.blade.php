@extends('layouts.layout')

@section('team')
<main class="main">
    <div class="main__main-inner">
        <div class="main__main-inner__form">
            <h3 class="main__main-inner__form__title">チーム情報登録</h3>
            {{-- チーム登録フォーム --}}
            <form action="{{ route('team.store') }}" method="post">
                @csrf
                <p><label>チームアイコン
                    <input type="file" name="team_img" id="icon-img"><i class="fas fa-image"></i></label></p>
                <div id="form-preview-icon">
                    <img src="images/no-image-team.png" id="preview-icon-img">
                </div>
                <p><label>チーム名<span class="required">必須</span>
                    <input type="text" name="team_name"></label></p>
                <table class="member-list">
                    <thead>
                        <tr>
                            <th colspan="2">メンバー一覧</th>
                        </tr>
                    </thead>
                    <tbody class="team-member-list">
                    </tbody>
                </table>
                <input type="submit" value="チーム作成">
            </form>
            {{-- / チーム登録フォーム --}}
            
            {{-- メンバー検索バー --}}
            <p><label>追加メンバー検索(承認キー10文字)<br>
                <input type="text" name="team_key" id="member-check-form" maxlength='10' autocomplete="off"></label>
                <button id="member-register-btn">検索</button></p>
            <div class="relative">
                <ul class="register-members">
                </ul>
            </div>
            {{-- メンバー検索バー --}}
        </div>
    </div>
</main>
@endsection