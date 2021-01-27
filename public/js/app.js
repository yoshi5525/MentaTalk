/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! ./header */ "./resources/js/header.js");

__webpack_require__(/*! ./mainbar */ "./resources/js/mainbar.js");

__webpack_require__(/*! ./form */ "./resources/js/form.js");

/***/ }),

/***/ "./resources/js/form.js":
/*!******************************!*\
  !*** ./resources/js/form.js ***!
  \******************************/
/***/ (() => {

$(function () {
  // 画像選択時のプレビュー
  $('#icon-img').on('change', function (e) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#preview-icon-img').attr('src', e.target.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  }); // 検索フォームに入力したら、メンバー検索処理

  $('#member-check-form').on('input', function () {
    var str = $(this).val(); // 英数字以外が入力されないようにする

    while (str.match(/[^A-Z^a-z\d\-]/)) {
      str = str.replace(/[^A-Z^a-z\d\-]/, "");
    } // 入力文字数が10文字になったら、通信を行う


    if ($(this).val().length === 10) {
      var searchStr = $(this).val();
      $('.register-members').css('display', 'block');
      searchMember(searchStr);
    } else {
      $('.register-members-member').remove();
      $('.register-members').css('display', 'none');
    }
  }); // 該当したメンバーをクリックした時に、メンバー一覧に追加する(クリックした要素の削除も行う)

  $('body').on('click', '.register-members-member', function () {
    if ($(this).children('div').length) {
      var memberId = $(this).children('div').attr('data-member-id');
      var memberName = $(this).children('div').attr('data-member-name');
      var memberPhoto = $(this).children('div').attr('data-member-photo');
      $('.team-member-list').append(buildAddMember(memberId, memberName, memberPhoto));
      $('.register-members').empty();
      $('.register-members').css('display', 'none');
      $('#member-check-form').val('');
    }
  }); // 入力文字に基づきデータベース検索

  function searchMember(searchStr) {
    $.ajax({
      type: 'GET',
      url: 'member/index',
      data: {
        'team_key': searchStr
      },
      dataType: 'json'
    }).done(function (value) {
      // 該当メンバーなし
      if (value.length === 0) {
        $('.register-members').append(buildSearchMember('該当なし'));
        return;
      } // 該当メンバーあり


      var registeredMembers = [];
      var registeredMemberLength = $('.team-member-list td').find('input').length;

      for (var i = 0; i < registeredMemberLength; i++) {
        registeredMembers.push($('.team-member-list td').find('input')[i]);
      } // チームに登録済みかチェック


      var registeredCheck = true;
      $.each(registeredMembers, function (i, registeredMember) {
        if (registeredMember.defaultValue == value[0].id) {
          registeredCheck = false;
          return false;
        }
      }); // チームに未登録の場合追加する

      if (registeredCheck) {
        $('.register-members').append(buildSearchMember(value[0]));
      } else {
        $('.register-members').append(buildSearchMember('該当なし'));
      }
    }).fail(function () {
      alert('通信失敗');
    });
  } // チームメンバー検索結果のHTML生成


  function buildSearchMember(member) {
    // メンバー写真ありの場合
    if (member.member_photo) {
      var html = "<li class=\"register-members-member\">\n\t\t\t\t\t<img src=\"images/".concat(member.member_photo, "\" alt=\"\" class=\"register-member-img\">\n\t\t\t\t\t<p class=\"register-member-name\">").concat(member.name, "</p>\n\t\t\t\t\t<div style=\"display:none;\" data-member-id=\"").concat(member.id, "\" data-member-name=\"").concat(member.name, "\" data-member-photo=\"").concat(member.member_photo, "\"></div>\n\t\t\t\t</li>");
      return html;
    } else if (member.id) {
      // メンバー写真なしの場合
      var _html = "<li class=\"register-members-member\">\n\t\t\t\t\t<img src=\"images/no-image.png\" alt=\"\" class=\"register-member-img\">\n\t\t\t\t\t<p class=\"register-member-name\">".concat(member.name, "</p>\n\t\t\t\t\t<div style=\"display:none;\" data-member-id=\"").concat(member.id, "\" data-member-name=\"").concat(member.name, "\" data-member-photo=\"no-image.png\"></div>\n\t\t\t\t</li>");

      return _html;
    } else {
      var _html2 = "<li class=\"register-members-member\">\n\t\t\t\t\t<img src=\"images/no-image.png\" alt=\"\" class=\"register-member-img\">\n\t\t\t\t\t<p class=\"register-member-name\">".concat(member, "</p>\n\t\t\t\t</li>");

      return _html2;
    }
  }

  ; // チームメンバー追加のHTML生成

  function buildAddMember(memberId, memberName, memberPhoto) {
    var html = "<tr>\n\t\t\t\t<td>\n\t\t\t\t\t<img src=\"images/".concat(memberPhoto, "\" alt=\"\" class=\"register-member-img\">\n\t\t\t\t\t<p class=\"register-member-name\">").concat(memberName, "<input type=\"hidden\" name=\"member_ids[]\" value=\"").concat(memberId, "\"></p>\n\t\t\t\t</td>\n\t\t\t</tr>");
    return html;
  }

  ;
});

/***/ }),

/***/ "./resources/js/header.js":
/*!********************************!*\
  !*** ./resources/js/header.js ***!
  \********************************/
/***/ (() => {

$(function () {
  var menuIcon = $('.fa-ellipsis-h');
  var failIcon = $('.fa-times');
  var menuList = $('.header__inner__menus__nav-lists');
  menuIcon.on('click', function () {
    menuList.toggleClass('is-active');
    $(this).css("display", "none");
    failIcon.css("display", "block");
  });
  failIcon.on('click', function () {
    menuList.toggleClass('is-active');
    $(this).css("display", "none");
    menuIcon.css("display", "block");
  });
});

/***/ }),

/***/ "./resources/js/mainbar.js":
/*!*********************************!*\
  !*** ./resources/js/mainbar.js ***!
  \*********************************/
/***/ (() => {

$(function () {
  var sideContent = $('.side-content'); // サイドバー全体

  var teamTalkBtn = $('.group-info__talk-room__team-talk'); // チームトークボタン(サイドバー)

  var botTalkBtn = $('.group-info__talk-room__bot-talk'); // botトークボタン(サイドバー)

  var codeListBtn = $('.group-info__talk-room__code-list'); // codeトークボタン(サイドバー)

  var talkBtnList = $('.form-reload'); // チーム,bot,codeボタンのリスト

  var backBtn = $('.back-btn'); // 戻るボタン(トーク画面からサイドバーに)

  var mainContent = $('.main-content'); // トーク画面全体

  var mainBar = $('.main-content__main-bar'); // チームトーク画面

  var talkBox = $('.main-content__main-bar__talk-box'); // チームトークのメッセージ画面

  var messageContent = $('.main-content__main-bar__talk-box__content'); // メッセージブロック

  var messageForm = $('.main-content__main-bar__form'); // チームトーク画面のフォーム

  var photoBtn = $('#message-photo-btn'); // 投稿フォーム画像ボタン

  var tagBtn = $('#tag-btn'); // 投稿フォーム技術タグボタン

  var talkSendBtn = $('#talk-send'); // 投稿フォーム送信ボタン

  var photoCheck = $('#message-photo-check'); // 投稿フォーム画像選択済みチェックマーク

  var tagCheck = $('#message-tag-check'); // 投稿フォーム技術タグ選択済みチェックマーク

  var alertMessage = $('.alert-message'); // データ取得の際のメッセージ表示

  var botPage = $('.main-content__bot-page'); // 検索bot画面

  var botTalkRoom = $('.main-content__bot-page__bot-talk'); // 検索botのインナー

  var codePage = $('.main-content__code-page'); // 登録コード一覧表示画面

  var codeTable = $('#code-table'); // 登録コード表示用テーブル
  // 画面がパソコンサイズ未満(1139px未満)の時のformを非表示に

  if ($(window).width() < 1140) {
    $('.main-content').addClass('toggle');
    $('.main-content__main-bar__form').addClass('toggle');
  } // 画面読み込み時に、チームトーク画面の最新メッセージを表示


  if ($(window).width() >= 1140 && document.URL.match(/^http:\/\/127.0.0.1:8000/) || document.URL.match(/^http:\/\/127.0.0.1:8000\/index/)) {
    $('.main-content__main-bar__form').addClass('toggle'); // $('.main-content').scrollTop($('.main-content__main-bar')[0].scrollHeight);
  } // コードがDBに登録されていなかったら、Botボタンがクリックできないようにする


  if (typeof techs === 'undefined') {
    botTalkBtn.prop("disabled", true);
    codeListBtn.prop("disabled", true);
  } else {
    botTalkBtn.prop("disabled", false);
    codeListBtn.prop("disabled", false);
  } // DBよりメンバー情報を取得できたら、各ページにデータの反映を行う


  var openArrayNumber = 0;
  var openTeamId = 0;
  var memberTeamsLength;
  var talkContentCount = 0;

  if (typeof member !== 'undefined') {
    memberTeamsLength = member.teams.length;
    talkBtnList.on('click', function () {
      formReset();
      var openBtnId = $(this).data('btn-id');
      openArrayNumber = $(this).data('array-number');
      openTeamId = $(this).data('team-id');
      var clickBtnName = $(this).text();
      talkBox.empty();
      botTalkRoom.empty();
      codeTable.empty();

      for (var i = 0; i < memberTeamsLength; i++) {
        if (typeof messages !== 'undefined' && clickBtnName.match(/Talk/)) {
          if (messages[i][0] && messages[i][0].team_id === openTeamId) {
            $('#current-team-id').val(openTeamId);
            displayToggle(openBtnId);
            var messageLength = messages[i].length;

            for (var j = 0; j < messageLength; j++) {
              talkBox.append(buildTalkMessage(messages[i][j]));
            }

            talkContentCount = $('.main-content__main-bar__talk-box__content').length;
          } else {
            if ($(window).width() < 1140) {
              $('#current-team-id').val(openTeamId);
              displayToggle(openBtnId);
            } else {
              $('#current-team-id').val(openTeamId);
            }
          }
        } else if (typeof techs !== 'undefined' && clickBtnName.match(/Bot/)) {
          talkContentCount = 0;

          if (techs[i][0] && techs[i][0].team_id === openTeamId) {
            displayToggle(openBtnId);
            loadMessage(0);
          }
        } else if (typeof techs !== 'undefined' && clickBtnName.match(/Code/)) {
          talkContentCount = 0;

          if (techs[i][0] && techs[i][0].team_id === openTeamId) {
            displayToggle(openBtnId);
            codeTable.append(buildCodeHTML());
          }
        }
      }
    });
  } // チームトークボタンをクリックすると、トーク画面の最新メッセージに自動スクロールする


  teamTalkBtn.on('click', function () {
    $('.main-content').scrollTop(mainBar[0].scrollHeight);
  }); // 戻るボタン押下時、トークルームのリセット

  backBtn.on('click', function () {
    formReset();
    talkContentCount = 0;
    backBtn.css("display", "none");
    sideContent.removeClass('toggle');
    mainContent.addClass('toggle');
    mainBar.css("display", "block");
    botPage.css("display", "none");
    codePage.css("display", "none");
    messageForm.addClass('toggle');
    textCountDel();
    mainContent.css("height", mainContentHeightCheck());
    talkBox.empty();
    talkBox.empty();
    botTalkRoom.empty();
    codeTable.empty();
    $('.add-code-list').empty();
  }); // トークルームformの画像選択時にチェックを付ける

  photoBtn.change(function () {
    photoCheck.css("display", "inline-block");
  }); // トークルームformのタグ選択ボタン押下時に選択肢一覧を表示する

  $('.fa-tags').on('click', function () {
    tagBtn.css("display", "block");
  }); // // トークルームformのタグ選択時にチェックを付ける

  tagBtn.change(function () {
    if ($('option:selected').val() == 0) {
      tagCheck.css("display", "none");
    } else {
      $('.save-message').hide();
      tagCheck.css("display", "inline-block");
    }

    tagBtn.css("display", "none");
  }); // トークルームの投稿フォーム文字数カウントとフォームテキストのチェック

  var ajaxTechKey = '';
  var ajaxTechValue = '';
  talkSendBtn.prop('disabled', true);
  $('#form-text').on('input', function () {
    var textCount = $(this).val().length;
    messageCount(textCount); // 文字が入力されていたら送信ボタンを押せるようにする

    if ($('#message-count').text() < 1000) {
      talkSendBtn.prop('disabled', false);
    } else {
      talkSendBtn.prop('disabled', true);
    } // タグが選択せれているかチェックし、メッセージを表示


    if (tagBtn.val() == 0 && techTextCheck($(this).val()) != false) {
      $(this).next('p').show();
    } // 入力文字にプログラミングに関する文字があるかチェック


    if (techTextCheck($(this).val()) === 'code') {
      ajaxTechKey = 'code'; // let replaceText = $('#form-text').val().replace(/\r|\n|\r\n/g, '\/n').replace(/\s\s/g, '\t');
      // let inputCode = replaceText.match(/(<[\w\d ]+>[\s\S]+<\/[\w\d ]{1,100}>|{[\s\S]+}[\s\S]+{[\s\S]+}|{[\s\S]*{[\s\S]*}[\s\S]*}|([\s\S]*{[\s\S]+}[\s\S]*))/);

      var inputCode = $('#form-text').val().match(/(<[\w\d ]+>[\s\S]+<\/[\w\d ]{1,100}>|<\?[\s\S]+\?>|{[\s\S]+}[\s\S]+{[\s\S]+}|{[\s\S]*{[\s\S]*}[\s\S]*}|([\s\S]*{[\s\S]+}[\s\S]*))/);
      ajaxTechValue = inputCode[0];
    } else if (techTextCheck($(this).val()) === 'link') {
      ajaxTechKey = 'link';
      var inputLink = $('#form-text').val().match(/(ftp|https?):\/\/\S+\.\S+/);
      ajaxTechValue = inputLink[0];
    } else if (techTextCheck($(this).val()) === 'command') {
      ajaxTechKey = 'command';
      var inputCommand = $('#form-text').val().match(/`.+`/);
      ajaxTechValue = inputCommand[0];
    } else {
      $(this).next('p').hide();
      ajaxTechKey = '';
      ajaxTechValue = '';
    }
  }); // テキストエリア操作時の文字数カウント表示・非表示
  // focusすると入力中情報更新

  var inputMemberId = 0;
  var focusMemberId = 0;
  var focusStatus = 0;
  $('#form-text').focusin(function () {
    inputMemberId = member.id;
    $('.text-count').css('display', 'block');
    $.ajax({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      url: "inputSearchRegister",
      type: "POST",
      data: {
        'open_member_id': inputMemberId,
        'open_team_id': openTeamId
      },
      dataType: 'json'
    }).done(function (result) {
      focusMemberId = result[1].input_member;

      if (focusMemberId !== member.id) {
        focusStatus = result[1].input_status;
        $('#input-member-name').text(result[0]);
        $('.input-member').css('display', 'block');
      }
    }).fail(function () {
      $('.input-member').css('display', 'none');
      $('#input-member-name').text('');
      focusMemberId = 0;
      focusStatus = 0;
    });
  }); // focusを外すと入力情報削除

  $('#form-text').focusout(function () {
    $('#input-member-name').text('');
    $('.text-count').css('display', 'none');
    $('.input-member').css('display', 'none');
    $.ajax({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      url: "inputSearchDelete",
      type: "POST",
      data: {
        'open_member_id': inputMemberId,
        'open_team_id': openTeamId
      },
      dataType: 'json'
    }).done(function (result) {
      focusMemberId = 0;
      focusStatus = 0;
    }).fail(function () {
      focusMemberId = 0;
      focusStatus = 0;
    });
  }); // タグメッセージを閉じるボタンの挙動

  $('#save-message-close').on('click', function () {
    $('.save-message').css('opacity', '0');
  }); // トークルームformの送信ボタンクリック時、データと投稿と表示

  talkSendBtn.on('click', function (e) {
    e.preventDefault();
    var currentMemberId = $('#current-member-id').val();
    var currentTeamId = $('#current-team-id').val();
    var messageData = $('#form-text').val();
    var selectLanguageId = $('#tag-btn').val();

    if (tagBtn.val() !== 0 && ajaxTechKey !== '' && ajaxTechValue !== '') {
      $('#tech-code-text').attr('name', ajaxTechKey);
      $('#tech-code-text').attr('value', ajaxTechValue);
      $.ajax({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: "member/store",
        type: "POST",
        data: {
          'member_id': currentMemberId,
          'team_id': currentTeamId,
          'message': messageData,
          'language_id': selectLanguageId,
          'tech': ajaxTechValue,
          'techKey': ajaxTechKey
        },
        dataType: 'json'
      }).done(function (newMessages) {
        var messageSaveFlag = false;
        var codeSaveFlag = false; // 新しく投稿したデータを、messages配列に追加する

        for (var i = 0; i < messages.length; i++) {
          if (messages[i][0] && messages[i][0].team_id === openTeamId && messageSaveFlag !== true) {
            messages[i].push(newMessages[0][0]);
            messageSaveFlag = true;
          }

          if (techs[i][0] && techs[i][0].team_id === openTeamId && codeSaveFlag !== true) {
            if (newMessages.length === 1) {
              techs[i].push(newMessages[0]);
              codeSaveFlag = true;
            } else if (newMessages.length === 2) {
              techs[i].push(newMessages[1][0]);
              codeSaveFlag = true;
            }
          }
        }

        if (messageSaveFlag === false) {
          messages.push(newMessages[0]);
          memberTeamsLength++;
        }

        if (codeSaveFlag === false) {
          techs.push(newMessages[1]);
        }

        var html = buildTalkMessage(newMessages[0][0]);
        talkBox.append(html);
        $('.main-content').scrollTop($('.main-content__main-bar')[0].scrollHeight);
        $('#message-count').text(1000);
        formReset();
        $('.save-message').hide();
        $('.save-message').css('opacity', '0');
        talkSendBtn.prop('disabled', false);
      }).fail(function () {
        alert('メッセージを送信できませんでした');
      });
    } else {
      $.ajax({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: "member/store",
        type: "POST",
        data: {
          'member_id': currentMemberId,
          'team_id': currentTeamId,
          'message': messageData,
          'language_id': selectLanguageId
        },
        dataType: 'json'
      }).done(function (newMessages) {
        var messageSaveFlag = false;
        var codeSaveFlag = false; // 新しく投稿したデータを、messages配列に追加する

        for (var i = 0; i < messages.length; i++) {
          if (messages[i][0] && messages[i][0].team_id === openTeamId && messageSaveFlag !== true) {
            messages[i].push(newMessages[0][0]);
            messageSaveFlag = true;
          }
        }

        if (messageSaveFlag === false) {
          messages.push(newMessages[0]);
          memberTeamsLength++;
        }

        var html = buildTalkMessage(newMessages[0][0]);
        talkBox.append(html);
        $('.main-content').scrollTop($('.main-content__main-bar')[0].scrollHeight);
        $('#message-count').text(1000);
        formReset();
        $('.save-message').hide();
        $('.save-message').css('opacity', '0');
        talkSendBtn.prop('disabled', false);
      }).fail(function () {
        alert('メッセージを送信できませんでした');
      });
    }
  }); // 定期的に新しいメッセージが投稿されていないかチェックし、ビューに追加する

  setInterval(function () {
    if (talkContentCount > 0) {
      var lastMessageId = $('.main-content__main-bar__talk-box__content:last').data("message-id");

      if (lastMessageId > 0) {
        reloadMessages(lastMessageId, 'new message');
        lastMessageId = 0;
      }
    } // 他のチームメンバーが入力していないかチェック


    if (focusStatus > 0) {
      $.ajax({
        type: 'GET',
        url: 'inputSearch',
        data: {
          'open_team_id': openTeamId
        },
        dataType: 'json'
      }).done(function (value) {
        $('#input-member-name').text(value.name);
        $('.input-member').css('display', 'block');
      }).fail(function () {
        $('#input-member-name').text('');
        $('.input-member').css('display', 'none');
      });
    }
  }, 5000); // チームトークルームのメッセージデータの取得と表示(画面一番上にスクロールすることで発火)

  mainContent.scroll(function () {
    var topDistance = mainContent.scrollTop();

    if (topDistance === 0 && mainBar.css('display') === 'block' && mainContent.css('position') !== 'absolute') {
      var oldMessageId = messageContent.first().find('input').val();
      reloadMessages(oldMessageId, 'add message');
    }
  }); // bot返答メッセージクリック時(回答する答えの構築)

  $('body').on('click', '.res-btn', function () {
    var resNumber = parseInt($(this).val()); // どの選択肢が選ばれたか回答番号を取得

    resAnswer(resNumber);
  });

  function resAnswer(resNumber) {
    var howCheck = ''; // 直前にコード、コマンド、リンクのどれがやり取りされていたかチェック

    if ($('.bot-str-text:last').text().match(/コード/)) {
      howCheck = 'code';
    } else if ($('.bot-str-text:last').text().match(/コマンド/)) {
      howCheck = 'command';
    } else if ($('.bot-str-text:last').text().match(/リンク/)) {
      howCheck = 'link';
    }

    switch (resNumber) {
      case 1:
        howCheck = 'code';
        loadMessage(1, howCheck);
        break;

      case 2:
        howCheck = 'command';
        loadMessage(2, howCheck);
        break;

      case 3:
        howCheck = 'link';
        loadMessage(3, howCheck);
        break;

      case 4:
        loadMessage(4, howCheck);
        break;

      case 5:
        loadMessage(5, howCheck);
        break;

      case 6:
        loadMessage(6, howCheck);
        break;

      case 7:
        loadMessage(7, howCheck);
        break;

      case 8:
        loadMessage(8, howCheck);
        break;

      case 9:
        loadMessage(9, howCheck);
        break;

      case 10:
        loadMessage(10, howCheck);
        break;

      case 11:
        loadMessage(11, howCheck);
        break;

      case 12:
        loadMessage(12, howCheck);
        break;

      case 13:
        loadMessage(13, howCheck);
        break;

      case 14:
        loadMessage(14, howCheck);
        break;

      case 15:
        loadMessage(15, howCheck);
        break;

      case 16:
        loadMessage(16, howCheck);
        break;

      case 17:
        loadMessage(17, howCheck);
        break;

      default:
        howCheck = '';
        break;
    }
  } // メソッド一覧
  // クリックされたトークボタンを判断し、画面の表示非表示を行う


  function displayToggle(openedBtn) {
    // 画面がパソコンサイズ以上(1140px以上)の時の挙動
    if ($(window).width() >= 1140) {
      if (openedBtn === 'talk') {
        mainBar.css("display", "block");
        messageForm.removeClass('toggle');
        botPage.css("display", "none");
        codePage.css("display", "none");
        textCountDel();
        mainContent.css("height", mainContentHeightCheck());
        talkBox.empty();
        botTalkRoom.empty();
        codeTable.empty();
        $('.add-code-list').empty();
        $('.main-content').scrollTop(mainBar[0].scrollHeight);
      } else if (openedBtn === 'bot') {
        mainBar.css("display", "none");
        messageForm.addClass('toggle');
        botPage.css("display", "block");
        codePage.css("display", "none");
        textCountDel();
        mainContent.css("height", mainContentHeightCheck());
        talkBox.empty();
        botTalkRoom.empty();
        codeTable.empty();
        $('.add-code-list').empty();
      } else if (openedBtn === 'code') {
        mainBar.css("display", "none");
        messageForm.addClass('toggle');
        botPage.css("display", "none");
        codePage.css("display", "block");
        textCountDel();
        mainContent.css("height", mainContentHeightCheck());
        talkBox.empty();
        botTalkRoom.empty();
        codeTable.empty();
        $('.add-code-list').empty();
      }
    } // 画面がパソコンサイズ未満(1139px未満)の時の挙動


    if ($(window).width() < 1140) {
      if (openedBtn === 'talk') {
        backBtn.css("display", "block");
        sideContent.addClass('toggle');
        mainContent.removeClass('toggle');
        messageForm.removeClass('toggle');
        textCountDel();
        mainContent.css("height", mainContentHeightCheck());
        $('.main-content').scrollTop(mainBar[0].scrollHeight); // talkBox.empty();

        botTalkRoom.empty();
        $('.add-code-list').empty();
      } else if (openedBtn === 'bot') {
        backBtn.css("display", "block");
        sideContent.addClass('toggle');
        mainContent.removeClass('toggle');
        mainBar.css("display", "none");
        botPage.css("display", "block");
        textCountDel();
        mainContent.css("height", mainContentHeightCheck());
        talkBox.empty();
        botTalkRoom.empty();
        $('.add-code-list').empty();
      } else if (openedBtn === 'code') {
        backBtn.css("display", "block");
        sideContent.addClass('toggle');
        mainContent.removeClass('toggle');
        mainBar.css("display", "none");
        codePage.css("display", "block");
        textCountDel();
        mainContent.css("height", mainContentHeightCheck());
        talkBox.empty();
        botTalkRoom.empty();
        $('.add-code-list').empty();
      }
    }
  } // mainページの高さ調整(投稿フォームの有無で高さ調整)


  function mainContentHeightCheck() {
    var botPageDisplay = botPage.css('display') == 'block';
    var codePageDisplay = codePage.css('display') == 'block';
    var heightCheck = 'calc(100vh - 105px)';

    if (botPageDisplay || codePageDisplay) {
      heightCheck = '100vh';
    }

    return heightCheck;
  } // 新規メッセージの取得と取得時のローダー、メッセージの表示


  function reloadMessages(messageId, str) {
    if (str === 'new message') {
      $.ajax({
        type: 'GET',
        url: 'message/index',
        data: {
          'new_message_id': messageId
        },
        dataType: 'json'
      }).done(function (newMessages) {
        if (newMessages.length > 0) {
          var newMessageFlag = true;

          for (var i = 0; i < newMessages.length; i++) {
            var html = buildTalkMessage(newMessages[i]);
            talkBox.append(html);
            messages[openArrayNumber].push(newMessages[i]);

            if (newMessageFlag && newMessages[i].member_id === member.id) {
              newMessageFlag = false;
            }
          }

          $('.main-content').scrollTop($('.main-content__main-bar')[0].scrollHeight);

          if (!newMessageFlag) {
            // setTimeout(function() {
            alertMessage.text('新しいメッセージを取得しました');
            alertMessage.css("display", "block"); // }, 3000);

            setTimeout(function () {
              alertMessage.css('display', 'none');
              alertMessage.text('');
            }, 5000);
          }
        }
      }).fail(function () {
        // setTimeout(function() {
        alertMessage.text('新しいメッセージはありません');
        alertMessage.css("display", "block"); // }, 3000);

        setTimeout(function () {
          alertMessage.css('display', 'none');
          alertMessage.text('');
        }, 5000);
      });
    } else if (str === 'add message') {
      $('.loader').css('display', 'block');
      setTimeout(function () {
        $('.loader').css('display', 'none');
      }, 6000);
      setTimeout(function () {
        alertMessage.text('これよりも前に投稿されたメッセージはありません');
        alertMessage.css("display", "block");
      }, 6000);
      setTimeout(function () {
        alertMessage.css('display', 'none');
        alertMessage.text('');
      }, 10000); // $.ajax({
      //   type: 'GET',
      //   url: 'message/index',
      //   data: { old_message_id: messageId },
      //   dataType: 'json'
      // })
      // .done(function(newMessages) {
      //   if (newMessages.length > 0) {
      //     setTimeout(function() {
      //       $('.loader').css('display', 'none');
      //     }, 3000);
      //     setTimeout(function() {
      //       for (let i = 0; i < newMessages.length; i++) {
      //         const html = buildTalkMessage(newMessages[i]);
      //         talkBox.prepend(html);
      //       }
      //       alertMessage.text('メッセージ読み込みに成功しました');
      //       alertMessage.css("display", "block");
      //     }, 3000);
      //     setTimeout(function() {
      //       alertMessage.css('display', 'none');
      //       alertMessage.text('');
      //     }, 5000);
      //   }
      // })
      // .fail(function() {
      //   setTimeout(function() {
      //     $('.loader').css('display', 'none');
      //   }, 3000);
      //   setTimeout(function() {
      //     alertMessage.text('メッセージ読み込みに失敗しました');
      //     alertMessage.css("display", "block");
      //   }, 3000);
      //   setTimeout(function() {
      //     alertMessage.css('display', 'none');
      //     alertMessage.text('');
      //   }, 5000);
      // });
    }
  }

  ; // 新規メッセージのHTML構築

  function buildTalkMessage(message) {
    if (message.member_photo) {
      var html = "<div class=\"main-content__main-bar__talk-box__content\" data-message-id=\"".concat(message.id, "\">\n            <div class=\"main-content__main-bar__talk-box__content__info\">\n                <div class=\"left-info\">\n                    <div class=\"left-info__img\">\n                        <img src=\"images/").concat(message.member_photo, "\" alt=\"\u30E6\u30FC\u30B6\u30FC\u306E\u30A2\u30A4\u30B3\u30F3\">\n                    </div>\n                    <div class=\"left-info__user-name\">\n                        <p data-author-id=\"").concat(message.id, "\">").concat(message.name, "</p>\n                    </div>\n                </div>\n                <div class=\"right-info\">\n                    <p class=\"right-info__registered-date\">").concat(message.registered_at, "</p>\n                </div>\n            </div>\n            <div class=\"main-content__main-bar__talk-box__content__message\">\n                <div class=\"message-text\">\n                    ").concat(changeCode(message.message), "\n                </div>\n            </div>\n        </div>");
      return html;
    } else {
      var _html = "<div class=\"main-content__main-bar__talk-box__content\" data-message-id=\"".concat(message.id, "\">\n            <div class=\"main-content__main-bar__talk-box__content__info\">\n                <div class=\"left-info\">\n                    <div class=\"left-info__img\">\n                        <img src=\"images/no-image.png\" alt=\"\u30E6\u30FC\u30B6\u30FC\u306E\u30A2\u30A4\u30B3\u30F3\">\n                    </div>\n                    <div class=\"left-info__user-name\">\n                        <p data-author-id=\"").concat(message.id, "\">").concat(message.name, "</p>\n                    </div>\n                </div>\n                <div class=\"right-info\">\n                    <p class=\"right-info__registered-date\">").concat(message.registered_at, "</p>\n                </div>\n            </div>\n            <div class=\"main-content__main-bar__talk-box__content__message\">\n                <div class=\"message-text\">\n                    ").concat(changeCode(message.message), "\n                </div>\n            </div>\n        </div>");

      return _html;
    }
  }

  ; // form入力テキストチェック(code,urlが含まれているかを確認)

  var codeCheckFlag;
  var linkCheckFlag;
  var commandCheckFlag;

  function techTextCheck(text) {
    var codeCheckStr = /(<[\w\d ]+>[\s\S]+<\/[\w\d ]{1,100}>|<\?[\s\S]+\?>|{[\s\S]+}[\s\S]+{[\s\S]+}|{[\s\S]*{[\s\S]*}[\s\S]*}|([\s\S]*{[\s\S]+}[\s\S]*))/;
    var linkCheckStr = /(ftp|https?):\/\/\S+\.\S+/;
    var commandCheckStr = /`.+`/;
    codeCheckFlag = '';
    linkCheckFlag = '';
    commandCheckFlag = '';

    if (codeCheckStr.test(text)) {
      codeCheckFlag = 'code';
      return codeCheckFlag;
    } else if (linkCheckStr.test(text)) {
      linkCheckFlag = 'link';
      return linkCheckFlag;
    } else if (commandCheckStr.test(text)) {
      commandCheckFlag = 'command';
      return commandCheckFlag;
    }

    return false;
  } // 投稿時フォームの入力済み文字のリセット


  function formReset() {
    $('form')[0].reset();
    photoCheck.css("display", "none");
    tagCheck.css("display", "none");
  } // formの入力文字数算出


  function messageCount(textCount) {
    $('#message-count').text(1000 - textCount);
  } // トーク画面の入力文字数リセット


  function textCountDel() {
    $('#message-count').text(1000);
  } // 選択された回答番号を基にbot, 返答用メッセージの生成メソッド呼び出しと表示


  function loadMessage(resNumber, howCheck) {
    $('.res-btn').prop("disabled", true);
    var randomStart = Math.floor(Math.random() * 6 + 5) * 100; // 「500 〜 1000」の範囲で乱数(表示所要時間に使用)

    var randomEnd = Math.floor(Math.random() * 2 + 2) * 1000; // 「2000 〜 3000」の範囲で乱数(表示所要時間に使用)

    setTimeout(function () {
      botTalkRoom.append(buildBotMessage(resNumber, howCheck));
      $('.main-content').scrollTop($('.main-content__bot-page')[0].scrollHeight);
    }, randomStart);
    setTimeout(function () {
      botTalkRoom.append(selectTalkItems(resNumber));
      $('.main-content').scrollTop($('.main-content__bot-page')[0].scrollHeight);
    }, randomEnd);
  } // 選択された回答番号を基にbot返答メッセージの生成


  function buildBotMessage(resNumber, howCheck) {
    var message = '';
    var messages = [];

    switch (resNumber) {
      case 0:
      case 17:
        message = changePTag("ご用件を教えてください");
        break;

      case 1:
      case 16:
        if ($('.bot-str-text:last').text().match(/コマンド/)) {
          message = changePTag("どの技術(言語)のコマンドが見たいですか？");
          break;
        } else if ($('.bot-str-text:last').text().match(/リンク/)) {
          message = changePTag("どの技術(言語)のリンクが見たいですか？");
          break;
        } else {
          message = changePTag("どの技術(言語)のコードが知りたいですか？");
          break;
        }

      case 2:
        message = changePTag("どの技術(言語)のコマンドが知りたいですか？");
        break;

      case 3:
        message = changePTag("どの技術(言語)のリンクが見たいですか？");
        break;

      case 4:
        messages = searchTechAnswer(howCheck, 1);
        break;

      case 5:
        messages = searchTechAnswer(howCheck, 2);
        break;

      case 6:
        messages = searchTechAnswer(howCheck, 3);
        break;

      case 7:
        messages = searchTechAnswer(howCheck, 4);
        break;

      case 8:
        messages = searchTechAnswer(howCheck, 5);
        break;

      case 9:
        messages = searchTechAnswer(howCheck, 6);
        break;

      case 10:
        messages = searchTechAnswer(howCheck, 7);
        break;

      case 11:
        messages = searchTechAnswer(howCheck, 8);
        break;

      case 12:
        messages = searchTechAnswer(howCheck, 9);
        break;

      case 13:
        messages = searchTechAnswer(howCheck, 10);
        break;

      case 14:
        messages = searchTechAnswer(howCheck, 11);
        break;

      case 15:
        messages = searchTechAnswer(howCheck, 12);
        break;

      default:
        message = changePTag('その他');
        break;
    }

    if (messages.length > 0) {
      for (var i = 0; i < messages.length; i++) {
        message += messages[i];
      }
    }

    var html = "<div class=\"main-content__bot-page__bot-talk__talk-content\">\n        <div class=\"main-content__bot-page__bot-talk__talk-content__bot-info\">\n          <div class=\"left-bot-info\">\n            <div class=\"left-bot-info__img\">\n              <img src=\"images/bot-image.png\" alt=\"\u30DC\u30C3\u30C8\u306E\u30A2\u30A4\u30B3\u30F3\">\n            </div>\n            <div class=\"left-bot-info__bot-name\">\n              <p>\u30C1\u30E3\u30C3\u30C8\u30DC\u30C3\u30C8</p>\n            </div>\n          </div>\n        </div>\n        <div class=\"main-content__bot-page__bot-talk__talk-content__bot-message\">\n          <div class=\"bot-message-text\">\n            ".concat(message, "\n          </div>\n        </div>\n      </div>");
    return html;
  } // クリックされたボタンを基に、回答をDBより取得する


  function searchTechAnswer(howCheck, languageId) {
    if (typeof techs !== 'undefined') {
      var returnMessages = [];

      for (var h = 0; h < techs.length; h++) {
        if (howCheck === 'code' && techs[h][0] && techs[h][0].team_id === openTeamId) {
          for (var i = 0; i < techs[h].length; i++) {
            if (techs[h][i].code !== null && techs[h][i].language_id === languageId) {
              var _message = changeCode(techs[h][i].code);

              returnMessages.push(changePreTag(_message));
            }
          }
        } else if (howCheck === 'command' && techs[h][0] && techs[h][0].team_id === openTeamId) {
          for (var _i = 0; _i < techs[h].length; _i++) {
            if (techs[h][_i].command !== null && techs[h][_i].language_id === languageId) {
              var _message2 = changeCode(techs[h][_i].command);

              returnMessages.push(changePreTag(_message2));
            }
          }
        } else if (howCheck === 'link' && techs[h][0] && techs[h][0].team_id === openTeamId) {
          for (var _i2 = 0; _i2 < techs[h].length; _i2++) {
            if (techs[h][_i2].link !== null && techs[h][_i2].language_id === languageId) {
              var _message3 = changeCode(techs[h][_i2].link);

              returnMessages.push(changeATag(_message3));
            }
          }
        }
      } // 該当するデータが無かったときの処理


      if (returnMessages.length === 0) {
        var _message4 = changeCode("該当するデータが見つかりませんでした");

        returnMessages.push(changePreTag(_message4));
      }

      return returnMessages;
    }
  } // bot回答メッセージの検索コードをpタグに変換


  function changePTag(message) {
    return '<p class="bot-str-text">' + message + '</p>';
  }

  ; // bot回答メッセージの検索コードをpreタグに変換

  function changePreTag(message) {
    return '<pre><code>' + message + '</code></pre>';
  }

  ; // bot回答メッセージの検索コードをaタグに変換

  function changeATag(message) {
    return '<a href="' + message + '" target="_blank" class="bot-str-link"><pre><code>' + message + '</code></pre></a>';
  }

  ; // bot回答コードを、HTMLの出力形式に変換

  function changeCode(code) {
    return code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  ; // ユーザー回答用メッセージの生成

  function selectTalkItems(botMessageFlag) {
    var messages = [];
    var outputTalk = 0;

    switch (botMessageFlag) {
      case 0:
      case 17:
        messages.push('登録されているコードが知りたい');
        messages.push('登録されているコマンドが知りたい');
        messages.push('登録されているリンクを検索したい');
        outputTalk = 1;
        break;

      case 1:
      case 2:
      case 3:
      case 16:
        messages.push('HTML');
        messages.push('CSS');
        messages.push('JavaScript');
        messages.push('PHP');
        messages.push('Java');
        messages.push('Python');
        messages.push('Kotlin');
        messages.push('Swift');
        messages.push('C,C++');
        messages.push('R');
        messages.push('SQL');
        messages.push('その他');
        outputTalk = 4;
        break;

      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
        messages.push('もっと調べる');
        messages.push('最初に戻る');
        outputTalk = 16;
        break;

      default:
        message = 'その他';
        break;
    }

    if (member.member_photo) {
      var html = "<div class=\"main-content__bot-page__bot-talk__talk-content\">\n          <div class=\"main-content__bot-page__bot-talk__talk-content__bot-info\">\n            <div class=\"left-bot-info reverse\">\n              <div class=\"left-bot-info__img reverse\">\n                <img src=\"images/".concat(member.member_photo, "\" alt=\"\u30E6\u30FC\u30B6\u30FC\u306E\u30A2\u30A4\u30B3\u30F3\">\n              </div>\n              <div class=\"left-bot-info__bot-name reverse\">\n                <p>").concat(member.name, "</p>\n              </div>\n            </div>\n          </div>\n          <div class=\"main-content__bot-page__bot-talk__talk-content__bot-message\">\n            ").concat(selectItem(messages, outputTalk), "\n          </div>\n        </div>");
      return html;
    } else if (member) {
      var _html2 = "<div class=\"main-content__bot-page__bot-talk__talk-content\">\n          <div class=\"main-content__bot-page__bot-talk__talk-content__bot-info\">\n            <div class=\"left-bot-info reverse\">\n              <div class=\"left-bot-info__img reverse\">\n                <img src=\"images/no-image.png\" alt=\"\u30E6\u30FC\u30B6\u30FC\u306E\u30A2\u30A4\u30B3\u30F3\">\n              </div>\n              <div class=\"left-bot-info__bot-name reverse\">\n                <p>".concat(member.name, "</p>\n              </div>\n            </div>\n          </div>\n          <div class=\"main-content__bot-page__bot-talk__talk-content__bot-message\">\n            ").concat(selectItem(messages, outputTalk), "\n          </div>\n        </div>");

      return _html2;
    }
  }

  ; // ユーザー回答用メッセージの各回答を生成(繰り返し複数表示するボタン)

  function selectItem(messages, outputTalk) {
    var html = '';
    var i = outputTalk;
    messages.forEach(function (message) {
      html += "<div class=\"bot-message-text reverse\">\n          <button class=\"reverse res-btn\" value=\"".concat(i, "\">").concat(message, "</button>\n          <input type=\"hidden\" value=\"").concat(i, "\">\n        </div>");
      i++;
    });
    return html;
  }

  ; // code一覧HTMLの生成

  function buildCodeHTML() {
    if (typeof techs !== 'undefined') {
      var trValues;

      for (var h = 0; h < techs.length; h++) {
        if (techs[h][0] && techs[h][0].team_id === openTeamId) {
          for (var i = 0; i < techs[h].length; i++) {
            if (techs[h][i].code !== null) {
              var code = changeCode(techs[h][i].code);
              var preCode = changePreTag(code);
              var languageName = idChangeLanguageName(techs[h][i].language_id);
              var html = "<tr class=\"add-code-list\">\n                  <td>".concat(techs[h][i].name, "</td>\n                  <td>").concat(languageName + ' (コード)', "</td>\n                  <td>").concat(preCode, "</td>\n                </tr>");
              trValues += html;
            } else if (techs[h][i].command !== null) {
              var _code = changeCode(techs[h][i].command);

              var pCode = changePTag(_code);

              var _languageName = idChangeLanguageName(techs[h][i].language_id);

              var _html3 = "<tr class=\"add-code-list\">\n                  <td>".concat(techs[h][i].name, "</td>\n                  <td>").concat(_languageName + ' (コマンド)', "</td>\n                  <td>").concat(pCode, "</td>\n                </tr>");

              trValues += _html3;
            } else if (techs[h][i].link !== null) {
              var _code2 = changeCode(techs[h][i].link);

              var aCode = changeATag(_code2);

              var _languageName2 = idChangeLanguageName(techs[h][i].language_id);

              var _html4 = "<tr class=\"add-code-list\">\n                  <td>".concat(techs[h][i].name, "</td>\n                  <td>").concat(_languageName2 + ' (リンク)', "</td>\n                  <td>").concat(aCode, "</td>\n                </tr>");

              trValues += _html4;
            }
          }
        }
      }

      return trValues;
    }
  }

  function idChangeLanguageName(id) {
    var languageName = '';

    switch (id) {
      case 1:
        languageName = 'HTML';
        break;

      case 2:
        languageName = 'CSS';
        break;

      case 3:
        languageName = 'JavaScript';
        break;

      case 4:
        languageName = 'PHP';
        break;

      case 5:
        languageName = 'Java';
        break;

      case 6:
        languageName = 'Python';
        break;

      case 7:
        languageName = 'Kotlin';
        break;

      case 8:
        languageName = 'Swift';
        break;

      case 9:
        languageName = 'C,C++';
        break;

      case 10:
        languageName = 'R';
        break;

      case 11:
        languageName = 'SQL';
        break;

      case 12:
        languageName = 'その他';
        break;

      default:
        languageName = 'その他';
        break;
    }

    return languageName;
  }
});

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	// It's empty as some runtime module handles the default behavior
/******/ 	__webpack_require__.x = x => {}
/************************************************************************/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/app": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./resources/js/app.js"],
/******/ 			["./resources/sass/app.scss"]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = x => {};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime, executeModules] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 		
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = x => {};
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		var startup = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = startup || (x => {});
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// run startup
/******/ 	return __webpack_require__.x();
/******/ })()
;