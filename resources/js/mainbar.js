$(function() {
  $('.main-content').scrollTop($('.main-content__main-bar')[0].scrollHeight);

  const mainContent = $('.main-content');
  const mainBar = $('.main-content__main-bar');
  const messageContent = $('.main-content__main-bar__talk-box__content');
  const photoBtn = $('#message-photo-btn');
  const photoCheck = $('#message-photo-check');
  const tagBtn = $('#tag-btn');
  const tagCheck = $('#message-tag-check');
  const talkSendBtn = $('#talk-send');
  const talkBox = $('.main-content__main-bar__talk-box');

  // フォーム共通設定
  $('.form-reload').on('click', function() {
    formReset();
  });



  // トークルーム formボタン関係
  // 画像選択ボタン
  photoBtn.change(function() {
    photoCheck.css("display", "inline-block");
  });
  
  // タグ選択ボタン
  $('.fa-tags').on('click', function() {
    tagBtn.css("display", "block");
  });

  // タグ選択時
  tagBtn.change(function() {
    if ($('option:selected').val() == 0) {
      tagCheck.css("display", "none");
    } else {
      $('.save-message').hide();
      tagCheck.css("display", "inline-block");
    }
    tagBtn.css("display", "none");
  });
  
  // トークルーム 文字数カウント・フォームテキストチェック
  $('#form-text').on('input', function() {
    let textCount = $(this).val().length;
    messageCount(textCount);
    if (techTextCheck($(this).val())) {
      $(this).next('p').show();
    } else {
      $(this).next('p').hide();
    }
  });
  
  // 文字数カウントの表示・非表示
  $('#form-text').focusin(function() {
    $('.text-count').css('display', 'block');
  });
  $('#form-text').focusout(function() {
    $('.text-count').css('display', 'none');
  });

  // トークルーム form送信
  talkSendBtn.on('click', function(e) {
    e.preventDefault();
    $.ajax({
      url: "",
      type: "POST",
      data: "",
      dataType: 'json'
    })
    .done(function(message) {
      const html = buildTalkMessage(message);
      talkBox.append(html);
      $('.main-content').scrollTop($('.main-content__main-bar')[0].scrollHeight);
      formReset();
      talkSendBtn.prop('disabled', false);
    })
    .fail(function() {
      alert('メッセージを送信できませんでした')
    });
  });

  // トークルーム message読み込み
  mainContent.scroll(function() {
    let topDistance = mainContent.scrollTop();
    if (topDistance == 0 && mainBar.css('display') == 'block') {
      let oldMessageId = (messageContent.first().find('input')).val();
      reloadMessages(oldMessageId);
    }
  });

  // メソッド一覧
  // 投稿時フォームのリセット
  function formReset() {
    $('form')[0].reset();
    photoCheck.css("display", "none");
    tagCheck.css("display", "none");
  }

  // form文字数確認
  function messageCount(textCount) {
    $('#message-count').text(1000 - textCount);
  }

  // form入力テキストチェック(code,url)
  function techTextCheck(text) {
    let urlResult = /(ftp|https?):\/\/\S+\.\S+/.test(text);
    let codeResult = /(<[\w\d ]+>.+<\/[\w\d ]{1,100}>|{.+}.+{.+}|{.*{.*}.*}|(.*{.+}.*))/.test(text);
    let techSaveFlag = false;
    if (urlResult || codeResult) {
      techSaveFlag = true;
    } else {
      techSaveFlag = false;
    }
    return techSaveFlag;
  }

  // メッセージの表示
  function buildTalkMessage(message) {
    const html =
    `<div class="main-content__main-bar__talk-box__content">
        <div class="main-content__main-bar__talk-box__content__info">
            <div class="left-info">
                <div class="left-info__img">
                    <img src="images/${message.image}" alt="ユーザーのアイコン">
                </div>
                <div class="left-info__user-name">
                    <p>${message.name}</p>
                </div>
            </div>
            <div class="right-info">
                <p class="right-info__registered-date">${message.created}</p>
            </div>
        </div>
        <div class="main-content__main-bar__talk-box__content__message">
            <div class="message-text">
                ${message.text}
            </div>
        </div>
    </div>`
    return html;
  };
  
  // メッセージの読み込み
  const alertMessage = $('.alert-message');
  function reloadMessages(oldMessageId) {
    $('.loader').css('display', 'block');
    $.ajax({
      url: "",
      type: "GET",
      data: "",
      dataType: 'json'
    })
    .done(function(message) {
      setTimeout(function() {
        $('.loader').css('display', 'none');
      }, 3000);
      setTimeout(function() {
        const html = buildTalkMessage(message);
        talkBox.prepend(html);
        alertMessage.text('メッセージ読み込みに成功しました');
        alertMessage.css("display", "block");
      }, 3000);
      setTimeout(function() {
        alertMessage.css('display', 'none');
        alertMessage.text('');
      }, 5000);
    })
    .fail(function() {
      setTimeout(function() {
        $('.loader').css('display', 'none');
      }, 3000);
      setTimeout(function() {
        alertMessage.text('メッセージ読み込みに失敗しました');
        alertMessage.css("display", "block");
      }, 3000);
      setTimeout(function() {
        alertMessage.css('display', 'none');
        alertMessage.text('');
      }, 5000);
    });
  };






    // ボット form関係
    const botTalkBtn = $('.group-info__talk-room__bot-talk');
    const botTalkRoom = $('.main-content__bot-page__bot-talk');
  
    // botルームボタンクリック挙動
    botTalkBtn.on('click', function() {
      loadMessage(0);
    });
      
    // bot返答メッセージクリック挙動
    let howCheck = '';
    let whatLang = '';
    $('body').on('click', '.res-btn', function() {
      let resNumber = parseInt($(this).val());
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
    });
  
    // メソッド一覧(ボット関係)
    // bot, 返答用メッセージの表示
    function loadMessage(resNumber) {
      var randomStart = Math.floor((Math.random() * 6 ) + 5) * 100; // 「500 〜 1000」の範囲で乱数
      var randomEnd = Math.floor((Math.random() * 3) + 1) * 1000; // 「1000 〜 3000」の範囲で乱数
      setTimeout(function() {
        botTalkRoom.append(buildBotMessage(resNumber));
        $('.main-content').scrollTop($('.main-content__bot-page')[0].scrollHeight);
      }, randomStart);
      setTimeout(function() {
        botTalkRoom.append(selectTalkItems(resNumber));
        $('.main-content').scrollTop($('.main-content__bot-page')[0].scrollHeight);
      }, randomEnd);
    }
  
    // botメッセージ
    function buildBotMessage(botMessageFlag) {
      let message = '';
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
            const htmlCommand = changeCode("コマンドは見つかりませんでした");
            message = changePreTag(htmlCommand);
          } else if ($('.bot-str-text:last').text().match(/コード/)) {
            const htmlCode = changeCode("<html>\n\t<h1>HTML文章です</h1>\n\t<a href=\"http://apple.com\">タグです</a>\n</html>");
            message = changePreTag(htmlCode);
          } else {
            const htmlUrl = "http://www.htmq.com/html/indexm.shtml";
            message = changeATag(htmlUrl);
          }
          break;
        case 5:
          if ($('.bot-str-text:last').text().match(/コマンド/)) {
            const cssCommand = changeCode("コマンドは見つかりませんでした");
            message = changePreTag(cssCommand);
          } else if ($('.bot-str-text:last').text().match(/コード/)) {
            const cssCode = changeCode("h1 {\n\tcolor: #fff;\n\tfont-size: 14px;\n}");
            message = changePreTag(cssCode);
          } else {
            const cssUrl = "http://www.htmq.com/csskihon/";
            message = changeATag(cssUrl);
          }
          break;
        case 6:
          if ($('.bot-str-text:last').text().match(/コマンド/)) {
            const jsCommand = changeCode("コマンドは見つかりませんでした");
            message = changePreTag(jsCommand);
          } else if ($('.bot-str-text:last').text().match(/コード/)) {
            const jsCode = changeCode("const btn = $(\'#btn\');\nbtn.on(\'click\', function() {\n\talert(\'error\');\n});");
            message = changePreTag(jsCode);
          } else {
            const jsUrl = "http://semooh.jp/jquery/";
            message = changeATag(jsUrl);
          }
          break;
        case 7:
          if ($('.bot-str-text:last').text().match(/コマンド/)) {
            const phpCommand = changeCode("コマンドは見つかりませんでした");
            message = changePreTag(phpCommand);
          } else if ($('.bot-str-text:last').text().match(/コード/)) {
            const phpCode = changeCode("<\?php\nfunction calCircleArea($radius) {\n\t$pai = 3.14;\n\t$area = $radius * $radius * $pai;\n\treturn $area;\n}\n\?>");
            message = changePreTag(phpCode);
          } else {
            const phpUrl = "https://www.php.net/manual/ja/langref.php";
            message = changeATag(phpUrl);
          }
          break;
        case 8:
          if ($('.bot-str-text:last').text().match(/コマンド/)) {
            const javaCommand = changeCode("コマンドは見つかりませんでした");
            message = changePreTag(javaCommand);
          } else if ($('.bot-str-text:last').text().match(/コード/)) {
            const javaCode = changeCode("public void write(String text, String file) throws FileNotFoundException {\n\tPrintStream ps = new PrintStream(file);\n\tps.print(text);\n\tps.close();\n}");
            message = changePreTag(javaCode);
          } else {
            const javaUrl = "https://www.oracle.com/jp/java/technologies/javase/documentation/api-jsp.html";
            message = changeATag(javaUrl);
          }
          break;
        case 9:
          if ($('.bot-str-text:last').text().match(/コマンド/)) {
            const rubyCommand = changeCode("コマンドは見つかりませんでした");
            message = changePreTag(rubyCommand);
          } else if ($('.bot-str-text:last').text().match(/コード/)) {
            const rubyCode = changeCode("belongs_to :post\nbelongs_to :tag\nvalidates :post_id,presence:true\nvalidates :tag_id,presence:true");
            message = changePreTag(rubyCode);
          } else {
            const rubyUrl = "https://docs.ruby-lang.org/ja/";
            message = changeATag(rubyUrl);
          }
          break;
        case 10:
          if ($('.bot-str-text:last').text().match(/コマンド/)) {
            const pythonCommand = changeCode("コマンドは見つかりませんでした");
            message = changePreTag(pythonCommand);
          } else if ($('.bot-str-text:last').text().match(/コード/)) {
            const pythonCode = changeCode("import numpy as np\nfrom sklearn.svm import LinearSVC\nimport matplotlib.pyplot as plt\n\nauth = np.genfromtxt(\'CodeIQ_auth.txt\', delimiter=\' \')");
            message = changePreTag(pythonCode);
          } else {
            const pythonUrl = "https://docs.python.org/ja/3/";
            message = changeATag(pythonUrl);
          }
          break;
        case 11:
          if ($('.bot-str-text:last').text().match(/コマンド/)) {
            const cCommand = changeCode("コマンドは見つかりませんでした");
            message = changePreTag(cCommand);
          } else if ($('.bot-str-text:last').text().match(/コード/)) {
            const cCode = changeCode("void hello(void);\nint tasu(int, int);\n\nint main(void){\n\tint a, b;\n\ta = 1;\n\tb = 3;\n\n\thello();\n\tprintf(\"%d\n\", tasu(a,b));\n\treturn 0;\n}");
            message = changePreTag(cCode);
          } else {
            const cUrl = "https://docs.microsoft.com/ja-jp/cpp/c-language/c-language-reference?view=msvc-160";
            message = changeATag(cUrl);
          }
          break;
        case 12:
          if ($('.bot-str-text:last').text().match(/コマンド/)) {
            const sqlCommand = changeCode("コマンドは見つかりませんでした");
            message = changePreTag(sqlCommand);
          } else if ($('.bot-str-text:last').text().match(/コード/)) {
            const sqlCode = changeCode("ALTER TABLE users CHANGE user_id id INT;");
            message = changePreTag(sqlCode);
          } else {
            const sqlUrl = "https://dev.mysql.com/doc/refman/5.6/ja/";
            message = changeATag(sqlUrl);
          }
          break;
        case 13:
          if ($('.bot-str-text:last').text().match(/コマンド/)) {
            const awsCommand = changeCode("コマンドは見つかりませんでした");
            message = changePreTag(awsCommand);
          } else if ($('.bot-str-text:last').text().match(/コード/)) {
            const awsCode = changeCode("[ec2-user@ip-172-31-25-189 ~]$ sudo curl -sL https://rpm.nodesource.com/setup_6.x | sudo bash -");
            message = changePreTag(awsCode);
          } else {
            const awsUrl = "https://docs.aws.amazon.com/ja_jp/general/latest/gr/Welcome.html";
            message = changeATag(awsUrl);
          }
          break;
        case 14:
          if ($('.bot-str-text:last').text().match(/コマンド/)) {
            const markdownCommand = changeCode("コマンドは見つかりませんでした");
            message = changePreTag(markdownCommand);
          } else if ($('.bot-str-text:last').text().match(/コード/)) {
            const markdownCode = changeCode("## h1です\n[リンクです](https://apple.com)");
            message = changePreTag(markdownCode);
          } else {
            const markdownUrl = "https://cercopes-z.com/Markdown/";
            message = changeATag(markdownUrl);
          }
          break;
        case 15:
          if ($('.bot-str-text:last').text().match(/コマンド/)) {
            const markdownCommand = changeCode("コマンドは見つかりませんでした");
            message = changePreTag(markdownCommand);
          } else if ($('.bot-str-text:last').text().match(/コード/)) {
            const markdownCode = changeCode("## h1です\n[リンクです](https://apple.com)");
            message = changePreTag(markdownCode);
          } else {
            const markdownUrl = "https://cercopes-z.com/Markdown/";
            message = changeATag(markdownUrl);
          }
          break;
        default:
          message = changePTag('その他');
          break;
      }
      const html =
        `<div class="main-content__bot-page__bot-talk__talk-content">
          <div class="main-content__bot-page__bot-talk__talk-content__bot-info">
            <div class="left-bot-info">
              <div class="left-bot-info__img">
                <img src="images/bot-image.png" alt="ボットのアイコン">
              </div>
              <div class="left-bot-info__bot-name">
                <p>チャットボット</p>
              </div>
            </div>
          </div>
          <div class="main-content__bot-page__bot-talk__talk-content__bot-message">
            <div class="bot-message-text">
              ${message}
            </div>
          </div>
        </div>`
      return html;
    };
  
    // bot回答用メッセージ
    function selectTalkItems(botMessageFlag) {
      let messages = [];
      let outputTalk = 0;
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
          break
        default:
          message = 'その他';
          break;
      }
      const html =
        `<div class="main-content__bot-page__bot-talk__talk-content">
          <div class="main-content__bot-page__bot-talk__talk-content__bot-info">
            <div class="left-bot-info reverse">
              <div class="left-bot-info__img reverse">
                <img src="images/no-image.png" alt="ユーザーのアイコン">
              </div>
              <div class="left-bot-info__bot-name reverse">
                <p>ユーザー1</p>
              </div>
            </div>
          </div>
          <div class="main-content__bot-page__bot-talk__talk-content__bot-message">
            ${selectItem(messages, outputTalk)}
          </div>
        </div>`
        return html;
      };
      
      // bot回答用メッセージの各アイテム
    function selectItem(messages, outputTalk) {
      let html = '';
      let i = outputTalk;
      messages.forEach(message => {
        html +=
          `<div class="bot-message-text reverse">
            <button class="reverse res-btn" value="${i}">${message}</button>
            <input type="hidden" value="${i}">
          </div>`;
        i++;
      });
      return html;
    };
  
    // 検索コードをpタグに変換
    function changePTag(message) {
      return '<p class="bot-str-text">' + message + '</p>';
    };
    
    // 検索コードをpreタグに変換
    function changePreTag(message) {
      return '<pre><code>' + message + '</code></pre>';
    };

    // 検索コードをpreタグに変換
    function changeATag(message) {
      return '<a href="' + message + '" target="_blank" class="bot-str-link"><pre><code>' + message + '</code></pre></a>';
    };
  
    // 検索コードを出力形式に変換
    function changeCode(code) {
      return code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    };
});