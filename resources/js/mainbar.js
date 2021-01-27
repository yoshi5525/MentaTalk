$(function() {
  const sideContent = $('.side-content');                                 // サイドバー全体
  const teamTalkBtn = $('.group-info__talk-room__team-talk');             // チームトークボタン(サイドバー)
  const botTalkBtn = $('.group-info__talk-room__bot-talk');               // botトークボタン(サイドバー)
  const codeListBtn = $('.group-info__talk-room__code-list');             // codeトークボタン(サイドバー)
  const talkBtnList = $('.form-reload');                                  // チーム,bot,codeボタンのリスト
  const backBtn = $('.back-btn');                                         // 戻るボタン(トーク画面からサイドバーに)
  const mainContent = $('.main-content');                                 // トーク画面全体
  const mainBar = $('.main-content__main-bar');                           // チームトーク画面
  const talkBox = $('.main-content__main-bar__talk-box');                 // チームトークのメッセージ画面
  const messageContent = $('.main-content__main-bar__talk-box__content'); // メッセージブロック
  const messageForm = $('.main-content__main-bar__form');                 // チームトーク画面のフォーム
  const photoBtn = $('#message-photo-btn');                               // 投稿フォーム画像ボタン
  const tagBtn = $('#tag-btn');                                           // 投稿フォーム技術タグボタン
  const talkSendBtn = $('#talk-send');                                    // 投稿フォーム送信ボタン
  const photoCheck = $('#message-photo-check');                           // 投稿フォーム画像選択済みチェックマーク
  const tagCheck = $('#message-tag-check');                               // 投稿フォーム技術タグ選択済みチェックマーク
  const alertMessage = $('.alert-message');                               // データ取得の際のメッセージ表示
  const botPage = $('.main-content__bot-page');                           // 検索bot画面
  const botTalkRoom = $('.main-content__bot-page__bot-talk');             // 検索botのインナー
  const codePage = $('.main-content__code-page');                         // 登録コード一覧表示画面
  const codeTable = $('#code-table');                                     // 登録コード表示用テーブル


  // 画面がパソコンサイズ未満(1139px未満)の時のformを非表示に
  if ($(window).width() < 1140) {
    $('.main-content').addClass('toggle');
    $('.main-content__main-bar__form').addClass('toggle');
  }
  // 画面読み込み時に、チームトーク画面の最新メッセージを表示
  if (document.URL.match(/^http:\/\/127.0.0.1:8000$/) || document.URL.match(/^http:\/\/127.0.0.1:8000\/index$/)) {
    $('.main-content').scrollTop($('.main-content__main-bar')[0].scrollHeight);
  }


  // コードがDBに登録されていなかったら、Botボタンがクリックできないようにする
  if (typeof techs === 'undefined') {
    botTalkBtn.prop("disabled", true);
    codeListBtn.prop("disabled", true);
  } else {
    botTalkBtn.prop("disabled", false);
    codeListBtn.prop("disabled", false);
  }


  // DBよりメンバー情報を取得できたら、各ページにデータの反映を行う
  let openArrayNumber = 0;
  let openTeamId = 0;
  let memberTeamsLength;
  let talkContentCount = 0;
  if (typeof member !== 'undefined') {
    memberTeamsLength = member.teams.length;
    talkBtnList.on('click', function () {
      formReset();
      const openBtnId = $(this).data('btn-id');
      openArrayNumber = $(this).data('array-number');
      openTeamId = $(this).data('team-id');
      const clickBtnName = $(this).text();
      talkBox.empty();
      botTalkRoom.empty();
      codeTable.empty();
      for(let i = 0; i < memberTeamsLength; i++) {
        if (typeof messages !== 'undefined' && clickBtnName.match(/Talk/)) {
          if (messages[i][0] && messages[i][0].team_id === openTeamId) {
            $('#current-team-id').val(openTeamId);
            displayToggle(openBtnId);
            const messageLength = messages[i].length;
            for (let j = 0; j < messageLength; j++) {
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
  }


  // チームトークボタンをクリックすると、トーク画面の最新メッセージに自動スクロールする
  teamTalkBtn.on('click', function() {
    $('.main-content').scrollTop(mainBar[0].scrollHeight);
  });


  // 戻るボタン押下時、トークルームのリセット
  backBtn.on('click', function() {
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
  });


  // トークルームformの画像選択時にチェックを付ける
  photoBtn.change(function() {
    photoCheck.css("display", "inline-block");
  });
  // トークルームformのタグ選択ボタン押下時に選択肢一覧を表示する
  $('.fa-tags').on('click', function() {
    tagBtn.css("display", "block");
  });
  // // トークルームformのタグ選択時にチェックを付ける
  tagBtn.change(function() {
    if ($('option:selected').val() == 0) {
      tagCheck.css("display", "none");
    } else {
      $('.save-message').hide();
      tagCheck.css("display", "inline-block");
    }
    tagBtn.css("display", "none");
  });


  // トークルームの投稿フォーム文字数カウントとフォームテキストのチェック
  let ajaxTechKey = '';
  let ajaxTechValue = '';
  talkSendBtn.prop('disabled', true);
  $('#form-text').on('input', function() {
    let textCount = $(this).val().length;
    messageCount(textCount);
    // 文字が入力されていたら送信ボタンを押せるようにする
    if ($('#message-count').text() < 1000) {
      talkSendBtn.prop('disabled', false);
    } else {
      talkSendBtn.prop('disabled', true);
    }
    // タグが選択せれているかチェックし、メッセージを表示
    if (tagBtn.val() == 0 && techTextCheck($(this).val()) != false) {
      $(this).next('p').show();
    }
    // 入力文字にプログラミングに関する文字があるかチェック
    if (techTextCheck($(this).val()) === 'code') {
      ajaxTechKey = 'code';
      // let replaceText = $('#form-text').val().replace(/\r|\n|\r\n/g, '\/n').replace(/\s\s/g, '\t');
      // let inputCode = replaceText.match(/(<[\w\d ]+>[\s\S]+<\/[\w\d ]{1,100}>|{[\s\S]+}[\s\S]+{[\s\S]+}|{[\s\S]*{[\s\S]*}[\s\S]*}|([\s\S]*{[\s\S]+}[\s\S]*))/);
      let inputCode = $('#form-text').val().match(/(<[\w\d ]+>[\s\S]+<\/[\w\d ]{1,100}>|<\?[\s\S]+\?>|{[\s\S]+}[\s\S]+{[\s\S]+}|{[\s\S]*{[\s\S]*}[\s\S]*}|([\s\S]*{[\s\S]+}[\s\S]*))/);
      ajaxTechValue = inputCode[0];
    } else if (techTextCheck($(this).val()) === 'link') {
      ajaxTechKey = 'link';
      let inputLink = $('#form-text').val().match(/(ftp|https?):\/\/\S+\.\S+/);
      ajaxTechValue = inputLink[0];
    } else if (techTextCheck($(this).val()) === 'command') {
      ajaxTechKey = 'command';
      let inputCommand = $('#form-text').val().match(/`.+`/);
      ajaxTechValue = inputCommand[0];
    } else {
      $(this).next('p').hide();
      ajaxTechKey = '';
      ajaxTechValue = '';
    }
  });


  // テキストエリア操作時の文字数カウント表示・非表示
  $('#form-text').focusin(function() {
    $('.text-count').css('display', 'block');
  });
  $('#form-text').focusout(function() {
    $('.text-count').css('display', 'none');
  });


  // タグメッセージを閉じるボタンの挙動
  $('#save-message-close').on('click', function() {
    $('.save-message').css('opacity', '0');
  });


  // トークルームformの送信ボタンクリック時、データと投稿と表示
  talkSendBtn.on('click', function(e) {
    e.preventDefault();
    const currentMemberId = $('#current-member-id').val();
    const currentTeamId = $('#current-team-id').val();
    const messageData = $('#form-text').val();
    const selectLanguageId =$('#tag-btn').val();
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
                'techKey': ajaxTechKey,
              },
        dataType: 'json',
      })
      .done(function(newMessages) {
        let messageSaveFlag = false;
        let codeSaveFlag = false;
        // 新しく投稿したデータを、messages配列に追加する
        for (let i = 0; i < messages.length; i++) {
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
        const html = buildTalkMessage(newMessages[0][0]);
        talkBox.append(html);
        $('.main-content').scrollTop($('.main-content__main-bar')[0].scrollHeight);
        $('#message-count').text(1000);
        formReset();
        $('.save-message').hide();
        $('.save-message').css('opacity', '0');
        talkSendBtn.prop('disabled', false);
      })
      .fail(function() {
        alert('メッセージを送信できませんでした')
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
                'language_id': selectLanguageId,
                // 'tech': '',
              },
        dataType: 'json',
      })
      .done(function(newMessages) {
        let messageSaveFlag = false;
        let codeSaveFlag = false;
        // 新しく投稿したデータを、messages配列に追加する
        for (let i = 0; i < messages.length; i++) {
          if (messages[i][0] && messages[i][0].team_id === openTeamId && messageSaveFlag !== true) {
            messages[i].push(newMessages[0][0]);
            messageSaveFlag = true;
          }
        }
        if (messageSaveFlag === false) {
          messages.push(newMessages[0]);
          memberTeamsLength++;
        }
        const html = buildTalkMessage(newMessages[0][0]);
        talkBox.append(html);
        $('.main-content').scrollTop($('.main-content__main-bar')[0].scrollHeight);
        $('#message-count').text(1000);
        formReset();
        $('.save-message').hide();
        $('.save-message').css('opacity', '0');
        talkSendBtn.prop('disabled', false);
      })
      .fail(function() {
        alert('メッセージを送信できませんでした')
      });
    }
  });


  // 定期的に新しいメッセージが投稿されていないかチェックし、ビューに追加する
  setInterval(function(){
    if (talkContentCount > 0) {
      let lastMessageId = $('.main-content__main-bar__talk-box__content:last').data("message-id");
      if (lastMessageId > 0) {
        reloadMessages(lastMessageId, 'new message');
        lastMessageId = 0;
      }
    }
  },3000);


  // チームトークルームのメッセージデータの取得と表示(画面一番上にスクロールすることで発火)
  // mainContent.scroll(function() {
  //   let topDistance = mainContent.scrollTop();
  //   if (topDistance === 0 && mainBar.css('display') === 'block' && mainContent.css('position') !== 'absolute') {
  //     let oldMessageId = (messageContent.first().find('input')).val();
  //     reloadMessages(oldMessageId, 'add message');
  //   }
  // });


  // bot返答メッセージクリック時(回答する答えの構築)
  $('body').on('click', '.res-btn', function() {
    let resNumber = parseInt($(this).val()); // どの選択肢が選ばれたか回答番号を取得
    resAnswer(resNumber);
  });
  function resAnswer(resNumber) {
    let howCheck = '';
    // 直前にコード、コマンド、リンクのどれがやり取りされていたかチェック
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
  }



  // メソッド一覧
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
    }
    // 画面がパソコンサイズ未満(1139px未満)の時の挙動
    if ($(window).width() < 1140) {
      if (openedBtn === 'talk') {
        backBtn.css("display", "block");
        sideContent.addClass('toggle');
        mainContent.removeClass('toggle');
        messageForm.removeClass('toggle');
        textCountDel();
        mainContent.css("height", mainContentHeightCheck());
        $('.main-content').scrollTop(mainBar[0].scrollHeight);
        // talkBox.empty();
        botTalkRoom.empty();
        $('.add-code-list').empty();
      } else if ((openedBtn === 'bot')) {
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
  }


  // mainページの高さ調整(投稿フォームの有無で高さ調整)
  function mainContentHeightCheck() {
    let botPageDisplay = (botPage.css('display')) == 'block';
    let codePageDisplay = (codePage.css('display')) == 'block';
    let heightCheck = 'calc(100vh - 105px)';
    if (botPageDisplay || codePageDisplay) {
      heightCheck = '100vh';
    }
    return heightCheck;
  }


  // 新規メッセージの取得と取得時のローダー、メッセージの表示
  function reloadMessages(messageId, str) {
    if (str === 'new message') {
      $.ajax({
        type: 'GET',
        url: 'message/index',
        data: { 'new_message_id': messageId },
        dataType: 'json',
      })
      .done(function(newMessages) {
        if (newMessages.length > 0) {
          let newMessageFlag = true;
          for (let i = 0; i < newMessages.length; i++) {
            const html = buildTalkMessage(newMessages[i]);
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
            alertMessage.css("display", "block");
            // }, 3000);
            setTimeout(function() {
              alertMessage.css('display', 'none');
              alertMessage.text('');
            }, 5000);
          }
        }
      })
      .fail(function() {
        // setTimeout(function() {
          alertMessage.text('新しいメッセージをありません');
          alertMessage.css("display", "block");
        // }, 3000);
        setTimeout(function() {
          alertMessage.css('display', 'none');
          alertMessage.text('');
        }, 5000);
      });
    }
    // else if (str === 'add message')
    //   $('.loader').css('display', 'block');
    //   $.ajax({
    //     type: 'GET',
    //     url: 'message/index',
    //     data: '{ 'old_message_id: messageId }',
    //     dataType: 'json'
    //   })
    //   .done(function(newMessages) {
    //    if (newMessages.length > 0) {
    //       setTimeout(function() {
    //         $('.loader').css('display', 'none');
    //       }, 3000);
    //       setTimeout(function() {
    //         for (let i = 0; i < newMessages.length; i++) {
    //           const html = buildTalkMessage(newMessages[i]);
    //           talkBox.prepend(html);
    //         }
    //         alertMessage.text('メッセージ読み込みに成功しました');
    //         alertMessage.css("display", "block");
    //       }, 3000);
    //       setTimeout(function() {
    //         alertMessage.css('display', 'none');
    //         alertMessage.text('');
    //       }, 5000);
    //     }
    //   })
    //   .fail(function() {
    //     setTimeout(function() {
    //       $('.loader').css('display', 'none');
    //     }, 3000);
    //     setTimeout(function() {
    //       alertMessage.text('メッセージ読み込みに失敗しました');
    //       alertMessage.css("display", "block");
    //     }, 3000);
    //     setTimeout(function() {
    //       alertMessage.css('display', 'none');
    //       alertMessage.text('');
    //     }, 5000);
    //   });
    // }
  };


  // 新規メッセージのHTML構築
  function buildTalkMessage(message) {
    if (message.member_photo) {
      const html =
        `<div class="main-content__main-bar__talk-box__content" data-message-id="${message.id}">
            <div class="main-content__main-bar__talk-box__content__info">
                <div class="left-info">
                    <div class="left-info__img">
                        <img src="images/${message.member_photo}" alt="ユーザーのアイコン">
                    </div>
                    <div class="left-info__user-name">
                        <p data-author-id="${message.id}">${message.name}</p>
                    </div>
                </div>
                <div class="right-info">
                    <p class="right-info__registered-date">${message.registered_at}</p>
                </div>
            </div>
            <div class="main-content__main-bar__talk-box__content__message">
                <div class="message-text">
                    <pre>${changeCode(message.message)}</pre>
                </div>
            </div>
        </div>`
      return html;
    } else {
      const html =
        `<div class="main-content__main-bar__talk-box__content" data-message-id="${message.id}">
            <div class="main-content__main-bar__talk-box__content__info">
                <div class="left-info">
                    <div class="left-info__img">
                        <img src="images/no-image.png" alt="ユーザーのアイコン">
                    </div>
                    <div class="left-info__user-name">
                        <p data-author-id="${message.id}">${message.name}</p>
                    </div>
                </div>
                <div class="right-info">
                    <p class="right-info__registered-date">${message.registered_at}</p>
                </div>
            </div>
            <div class="main-content__main-bar__talk-box__content__message">
                <div class="message-text">
                    <pre>${changeCode(message.message)}</pre>
                </div>
            </div>
        </div>`
      return html;
    }
  };


  // form入力テキストチェック(code,urlが含まれているかを確認)
  let codeCheckFlag;
  let linkCheckFlag;
  let commandCheckFlag;
  function techTextCheck(text) {
    const codeCheckStr = /(<[\w\d ]+>[\s\S]+<\/[\w\d ]{1,100}>|<\?[\s\S]+\?>|{[\s\S]+}[\s\S]+{[\s\S]+}|{[\s\S]*{[\s\S]*}[\s\S]*}|([\s\S]*{[\s\S]+}[\s\S]*))/;
    const linkCheckStr = /(ftp|https?):\/\/\S+\.\S+/;
    const commandCheckStr = /`.+`/;
    codeCheckFlag = '';
    linkCheckFlag = '';
    commandCheckFlag = '';
    if (codeCheckStr.test(text)) {
      codeCheckFlag = 'code';
      return codeCheckFlag;
    }
    else if (linkCheckStr.test(text)) {
      linkCheckFlag = 'link';
      return linkCheckFlag;
    }
    else if (commandCheckStr.test(text)) {
      commandCheckFlag = 'command';
      return commandCheckFlag;
    }
    return false;
  }


  // 投稿時フォームの入力済み文字のリセット
  function formReset() {
    $('form')[0].reset();
    photoCheck.css("display", "none");
    tagCheck.css("display", "none");
  }


  // formの入力文字数算出
  function messageCount(textCount) {
    $('#message-count').text(1000 - textCount);
  }
  // トーク画面の入力文字数リセット
  function textCountDel() {
    $('#message-count').text(1000);
  }


  // 選択された回答番号を基にbot, 返答用メッセージの生成メソッド呼び出しと表示
  function loadMessage(resNumber, howCheck) {
    $('.res-btn').prop("disabled", true);
    const randomStart = Math.floor((Math.random() * 6 ) + 5) * 100; // 「500 〜 1000」の範囲で乱数(表示所要時間に使用)
    const randomEnd = Math.floor((Math.random() * 2) + 2) * 1000; // 「2000 〜 3000」の範囲で乱数(表示所要時間に使用)
    setTimeout(function() {
      botTalkRoom.append(buildBotMessage(resNumber, howCheck));
      $('.main-content').scrollTop($('.main-content__bot-page')[0].scrollHeight);
    }, randomStart);
    setTimeout(function() {
      botTalkRoom.append(selectTalkItems(resNumber));
      $('.main-content').scrollTop($('.main-content__bot-page')[0].scrollHeight);
    }, randomEnd);
  }


  // 選択された回答番号を基にbot返答メッセージの生成
  function buildBotMessage(resNumber, howCheck) {
    let message = '';
    let messages = [];
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
      for (let i = 0; i < messages.length; i++) {
        message += messages[i];
      }
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
  }


  // クリックされたボタンを基に、回答をDBより取得する
  function searchTechAnswer(howCheck, languageId) {
    if (typeof techs !== 'undefined') {
      let returnMessages = [];
      for (let h = 0; h < techs.length; h++) {
        if (howCheck === 'code' && techs[h][0] && techs[h][0].team_id === openTeamId) {
          for (let i = 0; i < techs[h].length; i++) {
            if (techs[h][i].code !== null && techs[h][i].language_id === languageId) {
              const message = changeCode(techs[h][i].code);
              returnMessages.push(changePreTag(message));
            }
          }
        } else if (howCheck === 'command' && techs[h][0] && techs[h][0].team_id === openTeamId) {
          for (let i = 0; i < techs[h].length; i++) {
            if (techs[h][i].command !== null && techs[h][i].language_id === languageId) {
              const message = changeCode(techs[h][i].command);
              returnMessages.push(changePreTag(message));
            }
          }
        } else if (howCheck === 'link' && techs[h][0] && techs[h][0].team_id === openTeamId) {
          for (let i = 0; i < techs[h].length; i++) {
            if (techs[h][i].link !== null && techs[h][i].language_id === languageId) {
              const message = changeCode(techs[h][i].link);
              returnMessages.push(changeATag(message));
            }
          }
        }
      }
      // 該当するデータが無かったときの処理
      if (returnMessages.length === 0) {
        const message = changeCode("該当するデータが見つかりませんでした");
        returnMessages.push(changePreTag(message));
      }
      return returnMessages;
    }
  }


  // bot回答メッセージの検索コードをpタグに変換
  function changePTag(message) {
    return '<p class="bot-str-text">' + message + '</p>';
  };
  // bot回答メッセージの検索コードをpreタグに変換
  function changePreTag(message) {
    return '<pre><code>' + message + '</code></pre>';
  };
  // bot回答メッセージの検索コードをaタグに変換
  function changeATag(message) {
    return '<a href="' + message + '" target="_blank" class="bot-str-link"><pre><code>' + message + '</code></pre></a>';
  };
  // bot回答コードを、HTMLの出力形式に変換
  function changeCode(code) {
    return code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };


  // ユーザー回答用メッセージの生成
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
    if (member.member_photo) {
      const html =
        `<div class="main-content__bot-page__bot-talk__talk-content">
          <div class="main-content__bot-page__bot-talk__talk-content__bot-info">
            <div class="left-bot-info reverse">
              <div class="left-bot-info__img reverse">
                <img src="images/${member.member_photo}" alt="ユーザーのアイコン">
              </div>
              <div class="left-bot-info__bot-name reverse">
                <p>${member.name}</p>
              </div>
            </div>
          </div>
          <div class="main-content__bot-page__bot-talk__talk-content__bot-message">
            ${selectItem(messages, outputTalk)}
          </div>
        </div>`
      return html;
    } else if (member) {
      const html =
        `<div class="main-content__bot-page__bot-talk__talk-content">
          <div class="main-content__bot-page__bot-talk__talk-content__bot-info">
            <div class="left-bot-info reverse">
              <div class="left-bot-info__img reverse">
                <img src="images/no-image.png" alt="ユーザーのアイコン">
              </div>
              <div class="left-bot-info__bot-name reverse">
                <p>${member.name}</p>
              </div>
            </div>
          </div>
          <div class="main-content__bot-page__bot-talk__talk-content__bot-message">
            ${selectItem(messages, outputTalk)}
          </div>
        </div>`
      return html;
    }
  };


  // ユーザー回答用メッセージの各回答を生成(繰り返し複数表示するボタン)
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


  // code一覧HTMLの生成
  function buildCodeHTML() {
    if (typeof techs !== 'undefined') {
      let trValues;
      for (let h = 0; h < techs.length; h++) {
        if (techs[h][0] && techs[h][0].team_id === openTeamId) {
          for (let i = 0; i < techs[h].length; i++) {
            if (techs[h][i].code !== null) {
              console.log(techs[h][i].code);
              const code = changeCode(techs[h][i].code);
              const preCode = changePreTag(code);
              const languageName = idChangeLanguageName(techs[h][i].language_id);
              const html =
                `<tr class="add-code-list">
                  <td>${techs[h][i].name}</td>
                  <td>${languageName + ' (コード)'}</td>
                  <td>${preCode}</td>
                </tr>`
              trValues += html;
            } else if (techs[h][i].command !== null) {
              const code = changeCode(techs[h][i].command);
              const pCode = changePTag(code);
              const languageName = idChangeLanguageName(techs[h][i].language_id);
              const html =
                `<tr class="add-code-list">
                  <td>${techs[h][i].name}</td>
                  <td>${languageName + ' (コマンド)'}</td>
                  <td>${pCode}</td>
                </tr>`
              trValues += html;
            } else if (techs[h][i].link !== null) {
              const code = changeCode(techs[h][i].link);
              const aCode = changeATag(code);
              const languageName = idChangeLanguageName(techs[h][i].language_id);
              const html =
                `<tr class="add-code-list">
                  <td>${techs[h][i].name}</td>
                  <td>${languageName + ' (リンク)'}</td>
                  <td>${aCode}</td>
                </tr>`
              trValues += html;
            }
          }
        }
      }
      return trValues;
    }
  }


  function idChangeLanguageName(id) {
    let languageName = ''
    switch(id) {
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