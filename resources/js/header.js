$(function() {
  var menuIcon = $('.fa-ellipsis-h');
  var failIcon = $('.fa-times');
  var menuList = $('.header__inner__menus__nav-lists');

  menuIcon.on('click', function() {
    menuList.toggleClass('is-active');
    $(this).css("display", "none");
    failIcon.css("display", "block");
  });
  
  failIcon.on('click', function() {
    menuList.toggleClass('is-active');
    $(this).css("display", "none");
    menuIcon.css("display", "block");
  });
});