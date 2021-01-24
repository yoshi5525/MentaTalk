@extends('layouts.layout')

@section('team')
<main class="contents">
    {{-- サイドバー --}}
    <div class="side-content">
        <div class="side-content__bar">
            <ul class="side-content__bar__groups">
                @foreach ($member->teams as $team)
                <li class="side-content__bar__groups__group">
                    <div class="group-name">
                        <p>{{ $team->team_name }}</p>
                    </div>
                    <div class="group-info">
                        <div class="group-info__group-img">
                            <img src="images/no-image-team.png" alt="チームのアイコン">
                        </div>
                        <div class="group-info__talk-room">
                            <button class="group-info__talk-room__team-talk form-reload" data-btn-id="talk" data-team-id="{{ $team->id }}">
                                <i class="fas fa-users"></i><br>
                                Talk
                            </button>
                            <button class="group-info__talk-room__bot-talk form-reload" data-btn-id="bot" data-team-id="{{ $team->id }}">
                                <i class="fas fa-robot"></i><br>
                                Bot
                            </button>
                            <button class="group-info__talk-room__code-list form-reload" data-btn-id="code" data-team-id="{{ $team->id }}">
                                <i class="fas fa-code"></i><br>
                                Code
                            </button>
                        </div>
                    </div>
                </li>
                @endforeach
            </ul>
        </div>
    </div>
    {{-- / サイドバー --}}

    {{-- トーク画面 --}}
    <div class="main-content">
        {{-- 戻るボタン --}}
        <div class="back-btn">
            <button class="btn icon-btn" id="back-btn">
                <i class="fas fa-chevron-left fa-2x"></i>
            </button>
        </div>
        {{-- / 戻るボタン --}}

        {{-- teamトーク --}}
        <div class="main-content__main-bar">
            <div class="loader">Loading...</div>
            <p class="alert-message"></p>

            <div class="main-content__main-bar__talk-box">
            </div>
            <div class="main-content__main-bar__form">
                <div class="main-content__main-bar__form__message-form">
                    <form action="" method="POST" class="talk-form">
                        <div class="talk-form__form-icons">
                            <p class="text-count">残り文字数<br><span id="message-count">1000</span></p>
                            <label>
                                <input type="submit" id="talk-send">
                                <i class="fas fa-paper-plane"></i>
                            </label>
                            <label id="message-photo">
                                <input type="file" id="message-photo-btn">
                                <i class="fas fa-image"></i>
                                <i class="fas fa-check-circle" id="message-photo-check"></i>
                            </label>
                            <label id="message-tag">
                                <i class="fas fa-check-circle" id="message-tag-check"></i>
                                <i class="fas fa-tags"></i>
                                <select id="tag-btn" size="8">
                                    <option value="0">-保存しない-</option>
                                    <option value="1">HTML</option>
                                    <option value="2">CSS</option>
                                    <option value="3">JavaScript</option>
                                    <option value="4">PHP</option>
                                    <option value="5">Java</option>
                                    <option value="6">Python</option>
                                    <option value="7">Kotlin</option>
                                    <option value="8">Swift</option>
                                    <option value="9">C,C++</option>
                                    <option value="10">R</option>
                                    <option value="11">SQL</option>
                                    <option value="12">その他</option>
                                </select>
                            </label>
                        </div>
                        <input type="hidden" name="team_id" id="current-team-id">
                        <textarea name="message" rows="5" wrap="soft" id="form-text"></textarea>
                        <p class="save-message">コードやURL情報を保存するには<br>タグを選択してください</p>
                    </form>
                </div>
            </div>
        </div>
        {{-- / teamトーク --}}
        
        {{-- botトーク --}}
        <div class="main-content__bot-page inner">
            <div class="main-content__bot-page__bot-talk">
            </div>
        </div>
        {{-- / botトーク --}}

        {{-- code詳細 --}}
        <div class="main-content__code-page inner">
            <table border="1" id="code-table">
                <tr>
                    <th>投稿</th>
                    <th>技術</th>
                    <th>詳細</th>
                </tr>
            </table>
        </div>
        {{-- / code詳細 --}}
    </div>
    {{-- / トーク画面 --}}
</main>
<script>
    const member = @json($member);
    const teamMembers = @json($teamMembers);
    const messages = @json($messages);
    const techs = @json($techs);
</script>
@endsection