$(function () {


  $('.dropdown__item-top').click(function () {
    $(this).parent().toggleClass('active-dropdown');
  });

  $('.traning-block__more-link').click(function () {
    var text = $(this).text();
    setTimeout(function () {
      $('.traning-block__more-link').text(text == "Подробнее" ? "Свернуть" : "Подробнее");
    }, 300);
    if (!$('.traning-block__more-text').hasClass('active-text')) {
      $('.traning-block__more-text').show();
      setTimeout(function () {
        $('.traning-block__more-text').toggleClass('active-text');
      }, 100);
    } else {
      $('.traning-block__more-text').toggleClass('active-text');
      setTimeout(function () {
        $('.traning-block__more-text').hide();
      }, 500);

    }
  });


  $('.button__form').click(function () {
    $('html,body').animate({scrollTop:$('#submit__application').offset().top+"px"},{duration:1E3});
  });

  $('.header__menu-link').click(function () {
    var scrollToElement = $(this).attr('href');
    $('html,body').animate({scrollTop:$(scrollToElement).offset().top+"px"},{duration:1E3});
    if (innerWidth <= 699) {
      $('.header__row-top').removeClass('active-header');
      $('body').removeClass('overflow-body');
    }
  });

  $('.form-item__input').click( function() {
    $(this).addClass('active');
  });

  $('.form-item__input').focusout(function() {
    var label = $(this).attr('placeholder');
    var field = $(this).val();
    var fieldtrim = $.trim(field);
    if (fieldtrim == '') {
      $(this).attr('placeholder', label);
      $(this).removeClass('active');
      $(this).val("");
    }
  });

  $('.form-item__submit').click(function(e) {
    e.preventDefault();
    $('.modal').addClass('active');
    setTimeout(function () {
      $('.modal').addClass('in');
    }, 100)
  });

  $('.modal-close').click(function() {
    $('.modal').removeClass('in');
    setTimeout(function () {
      $('.modal').removeClass('active');
    }, 250)
  });

  $('.header__menu-button').click(function() {
    $('.header__row-top').toggleClass('active-header');
    $('body').toggleClass('overflow-body')
  });

});


$(window).on('load resize', function() { 
  if (innerWidth > 699) {
    if ($(".header__about-row").hasClass('slick-slider')) {
      $(".header__about-row").slick('unslick');
    }
    if ($(".training__row").hasClass('slick-slider')) {
      $(".training__row").slick('unslick');
    }
    if ($(".traning-block__item-wrapper").hasClass('slick-slider')) {
      $(".traning-block__item-wrapper").slick('unslick');
    }
    if ($(".video-info__row").hasClass('slick-slider')) {
      $(".video-info__row").slick('unslick');
    }
    if ($(".profit__row").hasClass('slick-slider')) {
      $(".profit__row").slick('unslick');
    }
        if ($(".reviews__logo-row").hasClass('slick-slider')) {
      $(".reviews__logo-row").slick('unslick');
    }
  } else {
    $(".header__about-row").not('.slick-initialized').slick({
      variableWidth: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      centerMode: true,
    });
    $(".training__row").not('.slick-initialized').slick({
      variableWidth: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      centerMode: true,
    });
    $(".traning-block__item-wrapper").not('.slick-initialized').slick({
      variableWidth: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      centerMode: true,
    });
    $(".video-info__row").not('.slick-initialized').slick({
      variableWidth: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      centerMode: true,
    });
    $(".profit__row").not('.slick-initialized').slick({
      variableWidth: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      centerMode: true,
    });
        $(".reviews__logo-row").not('.slick-initialized').slick({
      variableWidth: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      centerMode: true,
    });
  }
});








