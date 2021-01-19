$(function() {
  const mainContent = $('.main-content');
  const sideContent = $('.side-content');
  const messageForm = $('.main-content__main-bar__form');
  const backBtn = $('.back-btn');
  const teamTalkBtn = $('.group-info__talk-room__team-talk')
  const botTalkBtn = $('.group-info__talk-room__bot-talk')
  const codeListBtn = $('.group-info__talk-room__code-list')
  const mainPage = $('.main-content__main-bar');
  const botPage = $('.main-content__bot-page');
  const botPageTalk = $('.main-content__bot-page__bot-talk');
  const codePage = $('.main-content__code-page');

  teamTalkBtn.on('click', function() {
    $('.main-content').scrollTop(mainPage[0].scrollHeight);
  });



  // 画面がパソコンサイズ以上(1140px以上)の時の挙動
  if ($(window).width() >= 1140) {
    teamTalkBtn.on('click', function() {
      mainPage.css("display", "block");
      botPage.css("display", "none");
      codePage.css("display", "none");
      messageForm.removeClass('toggle');
      textCountDel();
      mainContent.css("height", mainContentHeightCheck());
      $('.main-content').scrollTop(mainPage[0].scrollHeight);
      botPageTalk.empty();
    });
    
    botTalkBtn.on('click', function() {
      mainPage.css("display", "none");
      botPage.css("display", "block");
      codePage.css("display", "none");
      textCountDel();
      mainContent.css("height", mainContentHeightCheck());
      botPageTalk.empty();
    });
    
    codeListBtn.on('click', function() {
      mainPage.css("display", "none");
      botPage.css("display", "none");
      codePage.css("display", "block");
      messageForm.addClass('toggle');
      textCountDel();
      mainContent.css("height", mainContentHeightCheck());
      botPageTalk.empty();
    });
  }
  

  
  // 画面がパソコンサイズ未満(1139px未満)の時の挙動
  if ($(window).width() < 1140) {
    mainContent.addClass('toggle');
    messageForm.addClass('toggle');
    
    teamTalkBtn.on('click', function() {
      sideContent.addClass('toggle');
      mainContent.removeClass('toggle');
      messageForm.removeClass('toggle');
      backBtn.css("display", "block");
      textCountDel();
      mainContent.css("height", mainContentHeightCheck());
      $('.main-content').scrollTop(mainPage[0].scrollHeight);
    });
    
    botTalkBtn.on('click', function() {
      sideContent.addClass('toggle');
      mainContent.removeClass('toggle');
      backBtn.css("display", "block");
      mainPage.css("display", "none");
      botPage.css("display", "block");
      textCountDel();
      mainContent.css("height", mainContentHeightCheck());
    });
    
    codeListBtn.on('click', function() {
      sideContent.addClass('toggle');
      mainContent.removeClass('toggle');
      messageForm.removeClass('toggle');
      backBtn.css("display", "block");
      mainPage.css("display", "none");
      codePage.css("display", "block");
      textCountDel();
      mainContent.css("height", mainContentHeightCheck());
    });
    
    backBtn.on('click', function() {
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
    let botPageDisplay = (botPage.css('display')) == 'block';
    let codePageDisplay = (codePage.css('display')) == 'block';
    let heightCheck = 'calc(100vh - 105px)';
    if (botPageDisplay || codePageDisplay) {
      heightCheck = '100vh';
    }
    return heightCheck;
  }

  function textCountDel() {
    $('#message-count').text(1000);
  }
});