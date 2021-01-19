$(function() {
  // 画像選択時のプレビュー
  $('#icon-img').on('change', function(e) {
    let reader = new FileReader();
    reader.onload = function(e) {
      $('#preview-icon-img').attr('src', e.target.result);
    }
    reader.readAsDataURL(e.target.files[0]);
  });

  $('#member-check-form').on('input', function() {
    let str= $(this).val();
    while(str.match(/[^A-Z^a-z\d\-]/)) {
      str = str.replace(/[^A-Z^a-z\d\-]/,"");
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
    const html =
      `<li class="register-members-member">
        <img src="images/no-image.png" alt="" class="register-member-img">
        <p class="register-member-name">ユーザー1</p>
      </li>`
    return html;
  };
});