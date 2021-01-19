/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! ./header */ "./resources/js/header.js");

__webpack_require__(/*! ./mainbar */ "./resources/js/mainbar.js");

__webpack_require__(/*! ./sidebar */ "./resources/js/sidebar.js");

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
  });
  $('#member-check-form').on('input', function () {
    var str = $(this).val();

    while (str.match(/[^A-Z^a-z\d\-]/)) {
      str = str.replace(/[^A-Z^a-z\d\-]/, "");
    }

    $(this).val(str);

    if ($(this).val().length === 10) {
      $('.register-members').css('display', 'block');
      $('.register-members').append(buildSearchMember());
    } else {
      $('.register-members-member').remove();
      $('.register-members').css('display', 'none');
    }
  });

  function buildSearchMember() {
    var html = "<li class=\"register-members-member\">\n        <img src=\"images/no-image.png\" alt=\"\" class=\"register-member-img\">\n        <p class=\"register-member-name\">\u30E6\u30FC\u30B6\u30FC1</p>\n      </li>";
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
  $('.main-content').scrollTop($('.main-content__main-bar')[0].scrollHeight);
  var mainContent = $('.main-content');
  var mainBar = $('.main-content__main-bar');
  var messageContent = $('.main-content__main-bar__talk-box__content');
  var photoBtn = $('#message-photo-btn');
  var photoCheck = $('#message-photo-check');
  var tagBtn = $('#tag-btn');
  var tagCheck = $('#message-tag-check');
  var talkSendBtn = $('#talk-send');
  var talkBox = $('.main-content__main-bar__talk-box'); // フォーム共通設定

  $('.form-reload').on('click', function () {
    formReset();
  }); // トークルーム formボタン関係
  // 画像選択ボタン

  photoBtn.change(function () {
    photoCheck.css("display", "inline-block");
  }); // タグ選択ボタン

  $('.fa-tags').on('click', function () {
    tagBtn.css("display", "block");
  }); // タグ選択時

  tagBtn.change(function () {
    if ($('option:selected').val() == 0) {
      tagCheck.css("display", "none");
    } else {
      $('.save-message').hide();
      tagCheck.css("display", "inline-block");
    }

    tagBtn.css("display", "none");
  }); // トークルーム 文字数カウント・フォームテキストチェック

  $('#form-text').on('input', function () {
    var textCount = $(this).val().length;
    messageCount(textCount);

    if (techTextCheck($(this).val())) {
      $(this).next('p').show();
    } else {
      $(this).next('p').hide();
    }
  }); // 文字数カウントの表示・非表示

  $('#form-text').focusin(function () {
    $('.text-count').css('display', 'block');
  });
  $('#form-text').focusout(function () {
    $('.text-count').css('display', 'none');
  }); // トークルーム form送信

  talkSendBtn.on('click', function (e) {
    e.preventDefault();
    $.ajax({
      url: "",
      type: "POST",
      data: "",
      dataType: 'json'
    }).done(function (message) {
      var html = buildTalkMessage(message);
      talkBox.append(html);
      $('.main-content').scrollTop($('.main-content__main-bar')[0].scrollHeight);
      formReset();
      talkSendBtn.prop('disabled', false);
    }).fail(function () {
      alert('メッセージを送信できませんでした');
    });
  }); // トークルーム message読み込み

  mainContent.scroll(function () {
    var topDistance = mainContent.scrollTop();

    if (topDistance == 0 && mainBar.css('display') == 'block') {
      var oldMessageId = messageContent.first().find('input').val();
      reloadMessages(oldMessageId);
    }
  }); // メソッド一覧
  // 投稿時フォームのリセット

  function formReset() {
    $('form')[0].reset();
    photoCheck.css("display", "none");
    tagCheck.css("display", "none");
  } // form文字数確認


  function messageCount(textCount) {
    $('#message-count').text(1000 - textCount);
  } // form入力テキストチェック(code,url)


  function techTextCheck(text) {
    var urlResult = /(ftp|https?):\/\/\S+\.\S+/.test(text);
    var codeResult = /(<[\w\d ]+>.+<\/[\w\d ]{1,100}>|{.+}.+{.+}|{.*{.*}.*}|(.*{.+}.*))/.test(text);
    var techSaveFlag = false;

    if (urlResult || codeResult) {
      techSaveFlag = true;
    } else {
      techSaveFlag = false;
    }

    return techSaveFlag;
  } // メッセージの表示


  function buildTalkMessage(message) {
    var html = "<div class=\"main-content__main-bar__talk-box__content\">\n        <div class=\"main-content__main-bar__talk-box__content__info\">\n            <div class=\"left-info\">\n                <div class=\"left-info__img\">\n                    <img src=\"images/".concat(message.image, "\" alt=\"\u30E6\u30FC\u30B6\u30FC\u306E\u30A2\u30A4\u30B3\u30F3\">\n                </div>\n                <div class=\"left-info__user-name\">\n                    <p>").concat(message.name, "</p>\n                </div>\n            </div>\n            <div class=\"right-info\">\n                <p class=\"right-info__registered-date\">").concat(message.created, "</p>\n            </div>\n        </div>\n        <div class=\"main-content__main-bar__talk-box__content__message\">\n            <div class=\"message-text\">\n                ").concat(message.text, "\n            </div>\n        </div>\n    </div>");
    return html;
  }

  ; // メッセージの読み込み

  var alertMessage = $('.alert-message');

  function reloadMessages(oldMessageId) {
    $('.loader').css('display', 'block');
    $.ajax({
      url: "",
      type: "GET",
      data: "",
      dataType: 'json'
    }).done(function (message) {
      setTimeout(function () {
        $('.loader').css('display', 'none');
      }, 3000);
      setTimeout(function () {
        var html = buildTalkMessage(message);
        talkBox.prepend(html);
        alertMessage.text('メッセージ読み込みに成功しました');
        alertMessage.css("display", "block");
      }, 3000);
      setTimeout(function () {
        alertMessage.css('display', 'none');
        alertMessage.text('');
      }, 5000);
    }).fail(function () {
      setTimeout(function () {
        $('.loader').css('display', 'none');
      }, 3000);
      setTimeout(function () {
        alertMessage.text('メッセージ読み込みに失敗しました');
        alertMessage.css("display", "block");
      }, 3000);
      setTimeout(function () {
        alertMessage.css('display', 'none');
        alertMessage.text('');
      }, 5000);
    });
  }

  ; // ボット form関係

  var botTalkBtn = $('.group-info__talk-room__bot-talk');
  var botTalkRoom = $('.main-content__bot-page__bot-talk'); // botルームボタンクリック挙動

  botTalkBtn.on('click', function () {
    loadMessage(0);
  }); // bot返答メッセージクリック挙動

  var howCheck = '';
  var whatLang = '';
  $('body').on('click', '.res-btn', function () {
    var resNumber = parseInt($(this).val());

    switch (resNumber) {
      case 1:
        howCheck = 'code';
        $('.res-btn').prop("disabled", true);
        loadMessage(1);
        break;

      case 2:
        howCheck = 'command';
        $('.res-btn').prop("disabled", true);
        loadMessage(2);
        break;

      case 3:
        howCheck = 'url';
        $('.res-btn').prop("disabled", true);
        loadMessage(3);
        break;

      case 4:
        whatLang = 'HTML';
        $('.res-btn').prop("disabled", true);
        loadMessage(4);
        break;

      case 5:
        whatLang = 'CSS';
        $('.res-btn').prop("disabled", true);
        loadMessage(5);
        break;

      case 6:
        whatLang = 'JavaScript';
        $('.res-btn').prop("disabled", true);
        loadMessage(6);
        break;

      case 7:
        whatLang = 'PHP';
        $('.res-btn').prop("disabled", true);
        loadMessage(7);
        break;

      case 8:
        whatLang = 'Java';
        $('.res-btn').prop("disabled", true);
        loadMessage(8);
        break;

      case 9:
        whatLang = 'Ruby';
        $('.res-btn').prop("disabled", true);
        loadMessage(9);
        break;

      case 10:
        whatLang = 'Python';
        $('.res-btn').prop("disabled", true);
        loadMessage(10);
        break;

      case 11:
        whatLang = 'C';
        $('.res-btn').prop("disabled", true);
        loadMessage(11);
        break;

      case 12:
        whatLang = 'SQL';
        $('.res-btn').prop("disabled", true);
        loadMessage(12);
        break;

      case 13:
        whatLang = 'AWS';
        $('.res-btn').prop("disabled", true);
        loadMessage(13);
        break;

      case 14:
        whatLang = 'MarkDown';
        $('.res-btn').prop("disabled", true);
        loadMessage(14);
        break;

      case 15:
        whatLang = 'その他';
        $('.res-btn').prop("disabled", true);
        loadMessage(15);
        break;

      case 16:
        $('.res-btn').prop("disabled", true);
        loadMessage(16);
        break;

      case 17:
        $('.res-btn').prop("disabled", true);
        loadMessage(17);
        break;

      default:
        howCheck = '';
        whatLang = '';
        break;
    }
  }); // メソッド一覧(ボット関係)
  // bot, 返答用メッセージの表示

  function loadMessage(resNumber) {
    var randomStart = Math.floor(Math.random() * 6 + 5) * 100; // 「500 〜 1000」の範囲で乱数

    var randomEnd = Math.floor(Math.random() * 3 + 1) * 1000; // 「1000 〜 3000」の範囲で乱数

    setTimeout(function () {
      botTalkRoom.append(buildBotMessage(resNumber));
      $('.main-content').scrollTop($('.main-content__bot-page')[0].scrollHeight);
    }, randomStart);
    setTimeout(function () {
      botTalkRoom.append(selectTalkItems(resNumber));
      $('.main-content').scrollTop($('.main-content__bot-page')[0].scrollHeight);
    }, randomEnd);
  } // botメッセージ


  function buildBotMessage(botMessageFlag) {
    var message = '';

    switch (botMessageFlag) {
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
        }

        message = changePTag("どの技術(言語)のコードが知りたいですか？");
        break;

      case 2:
        message = changePTag("どの技術(言語)のコマンドが知りたいですか？");
        break;

      case 3:
        message = changePTag("どの技術(言語)のリンクが見たいですか？");
        break;

      case 4:
        if ($('.bot-str-text:last').text().match(/コマンド/)) {
          var htmlCommand = changeCode("コマンドは見つかりませんでした");
          message = changePreTag(htmlCommand);
        } else if ($('.bot-str-text:last').text().match(/コード/)) {
          var htmlCode = changeCode("<html>\n\t<h1>HTML文章です</h1>\n\t<a href=\"http://apple.com\">タグです</a>\n</html>");
          message = changePreTag(htmlCode);
        } else {
          var htmlUrl = "http://www.htmq.com/html/indexm.shtml";
          message = changeATag(htmlUrl);
        }

        break;

      case 5:
        if ($('.bot-str-text:last').text().match(/コマンド/)) {
          var cssCommand = changeCode("コマンドは見つかりませんでした");
          message = changePreTag(cssCommand);
        } else if ($('.bot-str-text:last').text().match(/コード/)) {
          var cssCode = changeCode("h1 {\n\tcolor: #fff;\n\tfont-size: 14px;\n}");
          message = changePreTag(cssCode);
        } else {
          var cssUrl = "http://www.htmq.com/csskihon/";
          message = changeATag(cssUrl);
        }

        break;

      case 6:
        if ($('.bot-str-text:last').text().match(/コマンド/)) {
          var jsCommand = changeCode("コマンドは見つかりませんでした");
          message = changePreTag(jsCommand);
        } else if ($('.bot-str-text:last').text().match(/コード/)) {
          var jsCode = changeCode("const btn = $(\'#btn\');\nbtn.on(\'click\', function() {\n\talert(\'error\');\n});");
          message = changePreTag(jsCode);
        } else {
          var jsUrl = "http://semooh.jp/jquery/";
          message = changeATag(jsUrl);
        }

        break;

      case 7:
        if ($('.bot-str-text:last').text().match(/コマンド/)) {
          var phpCommand = changeCode("コマンドは見つかりませんでした");
          message = changePreTag(phpCommand);
        } else if ($('.bot-str-text:last').text().match(/コード/)) {
          var phpCode = changeCode("<\?php\nfunction calCircleArea($radius) {\n\t$pai = 3.14;\n\t$area = $radius * $radius * $pai;\n\treturn $area;\n}\n\?>");
          message = changePreTag(phpCode);
        } else {
          var phpUrl = "https://www.php.net/manual/ja/langref.php";
          message = changeATag(phpUrl);
        }

        break;

      case 8:
        if ($('.bot-str-text:last').text().match(/コマンド/)) {
          var javaCommand = changeCode("コマンドは見つかりませんでした");
          message = changePreTag(javaCommand);
        } else if ($('.bot-str-text:last').text().match(/コード/)) {
          var javaCode = changeCode("public void write(String text, String file) throws FileNotFoundException {\n\tPrintStream ps = new PrintStream(file);\n\tps.print(text);\n\tps.close();\n}");
          message = changePreTag(javaCode);
        } else {
          var javaUrl = "https://www.oracle.com/jp/java/technologies/javase/documentation/api-jsp.html";
          message = changeATag(javaUrl);
        }

        break;

      case 9:
        if ($('.bot-str-text:last').text().match(/コマンド/)) {
          var rubyCommand = changeCode("コマンドは見つかりませんでした");
          message = changePreTag(rubyCommand);
        } else if ($('.bot-str-text:last').text().match(/コード/)) {
          var rubyCode = changeCode("belongs_to :post\nbelongs_to :tag\nvalidates :post_id,presence:true\nvalidates :tag_id,presence:true");
          message = changePreTag(rubyCode);
        } else {
          var rubyUrl = "https://docs.ruby-lang.org/ja/";
          message = changeATag(rubyUrl);
        }

        break;

      case 10:
        if ($('.bot-str-text:last').text().match(/コマンド/)) {
          var pythonCommand = changeCode("コマンドは見つかりませんでした");
          message = changePreTag(pythonCommand);
        } else if ($('.bot-str-text:last').text().match(/コード/)) {
          var pythonCode = changeCode("import numpy as np\nfrom sklearn.svm import LinearSVC\nimport matplotlib.pyplot as plt\n\nauth = np.genfromtxt(\'CodeIQ_auth.txt\', delimiter=\' \')");
          message = changePreTag(pythonCode);
        } else {
          var pythonUrl = "https://docs.python.org/ja/3/";
          message = changeATag(pythonUrl);
        }

        break;

      case 11:
        if ($('.bot-str-text:last').text().match(/コマンド/)) {
          var cCommand = changeCode("コマンドは見つかりませんでした");
          message = changePreTag(cCommand);
        } else if ($('.bot-str-text:last').text().match(/コード/)) {
          var cCode = changeCode("void hello(void);\nint tasu(int, int);\n\nint main(void){\n\tint a, b;\n\ta = 1;\n\tb = 3;\n\n\thello();\n\tprintf(\"%d\n\", tasu(a,b));\n\treturn 0;\n}");
          message = changePreTag(cCode);
        } else {
          var cUrl = "https://docs.microsoft.com/ja-jp/cpp/c-language/c-language-reference?view=msvc-160";
          message = changeATag(cUrl);
        }

        break;

      case 12:
        if ($('.bot-str-text:last').text().match(/コマンド/)) {
          var sqlCommand = changeCode("コマンドは見つかりませんでした");
          message = changePreTag(sqlCommand);
        } else if ($('.bot-str-text:last').text().match(/コード/)) {
          var sqlCode = changeCode("ALTER TABLE users CHANGE user_id id INT;");
          message = changePreTag(sqlCode);
        } else {
          var sqlUrl = "https://dev.mysql.com/doc/refman/5.6/ja/";
          message = changeATag(sqlUrl);
        }

        break;

      case 13:
        if ($('.bot-str-text:last').text().match(/コマンド/)) {
          var awsCommand = changeCode("コマンドは見つかりませんでした");
          message = changePreTag(awsCommand);
        } else if ($('.bot-str-text:last').text().match(/コード/)) {
          var awsCode = changeCode("[ec2-user@ip-172-31-25-189 ~]$ sudo curl -sL https://rpm.nodesource.com/setup_6.x | sudo bash -");
          message = changePreTag(awsCode);
        } else {
          var awsUrl = "https://docs.aws.amazon.com/ja_jp/general/latest/gr/Welcome.html";
          message = changeATag(awsUrl);
        }

        break;

      case 14:
        if ($('.bot-str-text:last').text().match(/コマンド/)) {
          var markdownCommand = changeCode("コマンドは見つかりませんでした");
          message = changePreTag(markdownCommand);
        } else if ($('.bot-str-text:last').text().match(/コード/)) {
          var markdownCode = changeCode("## h1です\n[リンクです](https://apple.com)");
          message = changePreTag(markdownCode);
        } else {
          var markdownUrl = "https://cercopes-z.com/Markdown/";
          message = changeATag(markdownUrl);
        }

        break;

      case 15:
        if ($('.bot-str-text:last').text().match(/コマンド/)) {
          var _markdownCommand = changeCode("コマンドは見つかりませんでした");

          message = changePreTag(_markdownCommand);
        } else if ($('.bot-str-text:last').text().match(/コード/)) {
          var _markdownCode = changeCode("## h1です\n[リンクです](https://apple.com)");

          message = changePreTag(_markdownCode);
        } else {
          var _markdownUrl = "https://cercopes-z.com/Markdown/";
          message = changeATag(_markdownUrl);
        }

        break;

      default:
        message = changePTag('その他');
        break;
    }

    var html = "<div class=\"main-content__bot-page__bot-talk__talk-content\">\n          <div class=\"main-content__bot-page__bot-talk__talk-content__bot-info\">\n            <div class=\"left-bot-info\">\n              <div class=\"left-bot-info__img\">\n                <img src=\"images/bot-image.png\" alt=\"\u30DC\u30C3\u30C8\u306E\u30A2\u30A4\u30B3\u30F3\">\n              </div>\n              <div class=\"left-bot-info__bot-name\">\n                <p>\u30C1\u30E3\u30C3\u30C8\u30DC\u30C3\u30C8</p>\n              </div>\n            </div>\n          </div>\n          <div class=\"main-content__bot-page__bot-talk__talk-content__bot-message\">\n            <div class=\"bot-message-text\">\n              ".concat(message, "\n            </div>\n          </div>\n        </div>");
    return html;
  }

  ; // bot回答用メッセージ

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

    var html = "<div class=\"main-content__bot-page__bot-talk__talk-content\">\n          <div class=\"main-content__bot-page__bot-talk__talk-content__bot-info\">\n            <div class=\"left-bot-info reverse\">\n              <div class=\"left-bot-info__img reverse\">\n                <img src=\"images/no-image.png\" alt=\"\u30E6\u30FC\u30B6\u30FC\u306E\u30A2\u30A4\u30B3\u30F3\">\n              </div>\n              <div class=\"left-bot-info__bot-name reverse\">\n                <p>\u30E6\u30FC\u30B6\u30FC1</p>\n              </div>\n            </div>\n          </div>\n          <div class=\"main-content__bot-page__bot-talk__talk-content__bot-message\">\n            ".concat(selectItem(messages, outputTalk), "\n          </div>\n        </div>");
    return html;
  }

  ; // bot回答用メッセージの各アイテム

  function selectItem(messages, outputTalk) {
    var html = '';
    var i = outputTalk;
    messages.forEach(function (message) {
      html += "<div class=\"bot-message-text reverse\">\n            <button class=\"reverse res-btn\" value=\"".concat(i, "\">").concat(message, "</button>\n            <input type=\"hidden\" value=\"").concat(i, "\">\n          </div>");
      i++;
    });
    return html;
  }

  ; // 検索コードをpタグに変換

  function changePTag(message) {
    return '<p class="bot-str-text">' + message + '</p>';
  }

  ; // 検索コードをpreタグに変換

  function changePreTag(message) {
    return '<pre><code>' + message + '</code></pre>';
  }

  ; // 検索コードをpreタグに変換

  function changeATag(message) {
    return '<a href="' + message + '" target="_blank" class="bot-str-link"><pre><code>' + message + '</code></pre></a>';
  }

  ; // 検索コードを出力形式に変換

  function changeCode(code) {
    return code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  ;
});

/***/ }),

/***/ "./resources/js/sidebar.js":
/*!*********************************!*\
  !*** ./resources/js/sidebar.js ***!
  \*********************************/
/***/ (() => {

$(function () {
  var mainContent = $('.main-content');
  var sideContent = $('.side-content');
  var messageForm = $('.main-content__main-bar__form');
  var backBtn = $('.back-btn');
  var teamTalkBtn = $('.group-info__talk-room__team-talk');
  var botTalkBtn = $('.group-info__talk-room__bot-talk');
  var codeListBtn = $('.group-info__talk-room__code-list');
  var mainPage = $('.main-content__main-bar');
  var botPage = $('.main-content__bot-page');
  var botPageTalk = $('.main-content__bot-page__bot-talk');
  var codePage = $('.main-content__code-page');
  teamTalkBtn.on('click', function () {
    $('.main-content').scrollTop(mainPage[0].scrollHeight);
  }); // 画面がパソコンサイズ以上(1140px以上)の時の挙動

  if ($(window).width() >= 1140) {
    teamTalkBtn.on('click', function () {
      mainPage.css("display", "block");
      botPage.css("display", "none");
      codePage.css("display", "none");
      messageForm.removeClass('toggle');
      textCountDel();
      mainContent.css("height", mainContentHeightCheck());
      $('.main-content').scrollTop(mainPage[0].scrollHeight);
      botPageTalk.empty();
    });
    botTalkBtn.on('click', function () {
      mainPage.css("display", "none");
      botPage.css("display", "block");
      codePage.css("display", "none");
      textCountDel();
      mainContent.css("height", mainContentHeightCheck());
      botPageTalk.empty();
    });
    codeListBtn.on('click', function () {
      mainPage.css("display", "none");
      botPage.css("display", "none");
      codePage.css("display", "block");
      messageForm.addClass('toggle');
      textCountDel();
      mainContent.css("height", mainContentHeightCheck());
      botPageTalk.empty();
    });
  } // 画面がパソコンサイズ未満(1139px未満)の時の挙動


  if ($(window).width() < 1140) {
    mainContent.addClass('toggle');
    messageForm.addClass('toggle');
    teamTalkBtn.on('click', function () {
      sideContent.addClass('toggle');
      mainContent.removeClass('toggle');
      messageForm.removeClass('toggle');
      backBtn.css("display", "block");
      textCountDel();
      mainContent.css("height", mainContentHeightCheck());
      $('.main-content').scrollTop(mainPage[0].scrollHeight);
    });
    botTalkBtn.on('click', function () {
      sideContent.addClass('toggle');
      mainContent.removeClass('toggle');
      backBtn.css("display", "block");
      mainPage.css("display", "none");
      botPage.css("display", "block");
      textCountDel();
      mainContent.css("height", mainContentHeightCheck());
    });
    codeListBtn.on('click', function () {
      sideContent.addClass('toggle');
      mainContent.removeClass('toggle');
      messageForm.removeClass('toggle');
      backBtn.css("display", "block");
      mainPage.css("display", "none");
      codePage.css("display", "block");
      textCountDel();
      mainContent.css("height", mainContentHeightCheck());
    });
    backBtn.on('click', function () {
      mainPage.css("display", "block");
      botPage.css("display", "none");
      codePage.css("display", "none");
      mainContent.addClass('toggle');
      messageForm.addClass('toggle');
      sideContent.removeClass('toggle');
      backBtn.css("display", "none");
      textCountDel();
      mainContent.css("height", mainContentHeightCheck());
      botPageTalk.empty();
    });
  }

  function mainContentHeightCheck() {
    var botPageDisplay = botPage.css('display') == 'block';
    var codePageDisplay = codePage.css('display') == 'block';
    var heightCheck = 'calc(100vh - 105px)';

    if (botPageDisplay || codePageDisplay) {
      heightCheck = '100vh';
    }

    return heightCheck;
  }

  function textCountDel() {
    $('#message-count').text(1000);
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