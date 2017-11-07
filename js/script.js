$(function () {


////////////////////////////////////////////////
  // калькулятор
////////////////////////////////////////////////


var onepricemember = 2500; // стоимость одного обучения
var consultexpert = 0; // стоимость консультации эксперта
var progressivesale = 0.02; // скидка при большом кол-ве обучаемых
var progressivmember = 10; // кол-во обучаемых для скидки

var oldvalinput;

$(document).ready(function () {
  if ($('.calculator__human-number').val() == '' ) {
    $('.calculator__human-number').val(1);
  }

  oldvalinput = $('.calculator__human-number').val(); // первоначальное значение поля

  calculator();
});



// нажатие на кнопку минус
$('.calculator__human-min').click( function () {
  var $input = $('.calculator__human-number');
  if ($input.val() == '' || $input.val() < oldvalinput) {
    $input.val(oldvalinput);
  }
  var count = parseInt($input.val()) - 1;
  count = count <= oldvalinput ? oldvalinput : count;
  $input.val(count);
  calculator();
  return false;
});
// нажатие на кнопку плюс
$('.calculator__human-plus').click( function () {
  var $input = $('.calculator__human-number');
  if ($input.val() == '' || $input.val() < oldvalinput) {
    $input.val(oldvalinput);
  }
  $input.val(parseInt($input.val()) + 1);
  $input.change();
  calculator();
  return false;
});
// блокируем нажание клавиш . , и буквы e для поля input для удобного подсчета
$('.calculator__human-number').keydown(function(event) {
 if ( event.keyCode == 69 || event.keyCode == 110 || event.keyCode == 188 || event.keyCode == 189 || event.keyCode == 190 || event.keyCode == 191 ) {
  event.preventDefault();
}
});

// изменение поля вручную
$('.calculator__human-number').on('change keyup input click' , function() {
  var $input = $(this);
  if ($input.val() == '' || $input.val() < oldvalinput) {
    $input.val(oldvalinput);
  }
  calculator();
});

function calculator() {
  var member = $('.calculator__human-number').val(); // берем значение кол-ва
  var summ;

    // если не хватает народа до скидки то просто умножаем
    if (progressivmember >= member) {
      summ = member*onepricemember;
    } else {
      // если хватает, то считаем со скидкой
      var memberminus = member - progressivmember;
      var sale = onepricemember - (onepricemember*progressivesale);
      summ = progressivmember*onepricemember + sale*memberminus;
    }

// добавляем стоимость консультации эксперта
summ = summ + consultexpert;


// выводим значение в блок с разбивкой по разрядам
$('.calculator__human-price').text(String(summ).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 '));
}

//////////////////////////////////////////
// Конец калькулятора 
/////////////////////////////////////////

// маска в инпутах телефона

$('[data-mask-tel]').mask("9 (999) 999-99-99");


//////////////////////////////////////
// блок с формой
//////////////////////////////////////


var stagetext1 = "Заявка на обучение";
var stagetext2 = "Заявка на обучение";
var stagetext3 = "Cпасибо";

var stagetext4 = "Cпасибо!";


$('[data-stage]').click(function(e) {
  e.preventDefault();
  var stage = $(this).attr('data-stage');
  if ($('.discount-block__stage').is(':hidden'))  {
   $('.discount-block__stage').fadeIn(300);
 }

 if (stage == 1) {
   $('.discount-block__title').text(stagetext1);
 }
 if (stage == 2) {
   $('.discount-block__title').text(stagetext2);
 }
 if (stage == 4) {
   $('.discount-block__title').text(stagetext4);
   $('.application-form').hide();
   $('.discount-block__stage').fadeOut(100);
 }


 if (stage == 2) {
  $('.discount-block__next-name').text($('.form-item__name').val());
  $('.discount-block__next-phone').text($('.form-item__phone').val());
  $('.discount-block__next-email').text($('.form-item__email').val());
}

$('[data-stage-wrapper]').attr('data-stage-wrapper', stage);
$('[data-stage-item].active-stage').removeClass('active-stage');
$('[data-stage-item="'+stage+'"]').addClass('active-stage');
$('[data-fieldset]').fadeOut(100);
$('[data-fieldset="'+stage+'"]').fadeIn(300);


});


// клик по кнопке физического лица 

$('.discount-block__type-button--fl').click(function() {
  if (!$(this).hasClass('active')) {
    $('.discount-block__type-button.active').removeClass('active');
    $(this).addClass('active');
    $('[data-fieldset="2"] .form-item__submit').attr('data-stage', '4');
  }
});

// клик по кнопке юридического лица 
$('.discount-block__type-button--yl').click(function() {
  if (!$(this).hasClass('active')) {
    $('.discount-block__type-button.active').removeClass('active');
    $(this).addClass('active');
    $('[data-fieldset="2"] .form-item__submit').attr('data-stage', '3');
  }
});


// кнопка назад 

$('.discount-block__back-button').click(function () {
  var stage = $('[data-stage-wrapper]').attr('data-stage-wrapper');
  var stageold = stage - 1;
  if (stageold == 1) {
   $('.discount-block__title').text(stagetext1);
 }
 if (stageold == 2) {
   $('.discount-block__title').text(stagetext2);
 }
 $('[data-stage-wrapper]').attr('data-stage-wrapper', stageold);
 $('[data-stage-item].active-stage').removeClass('active-stage');
 $('[data-stage-item="'+stageold+'"]').addClass('active-stage');
 $('[data-fieldset]').fadeOut(100);
 $('[data-fieldset="'+stageold+'"]').fadeIn(300);

});



// скролл сразу ко второму шагу с кнопки калькулятора 
$('.form-data-stage').click(function (e) {
 e.preventDefault();

$('.form-item__name').val($('.form-item__name-calc').val());
$('.form-item__phone').val($('.form-item__name-phone').val());
$('.form-item__email').val($('.form-item__name-email').val());

 $('.discount-block__next-name').text($('.form-item__name').val());
 $('.discount-block__next-phone').text($('.form-item__phone').val());
 $('.discount-block__next-email').text($('.form-item__email').val());


 $('html,body').animate({scrollTop:$('.discount-block').offset().top+"px"},{duration:1E3});
});


///////////////////////////////////////////////
//  Окончание блока с формой
/////////////////////////////////////////////


$('.dropdown__item-top').click(function () {
  $(this).parent().toggleClass('active-dropdown');
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
  var field = $(this).val();
  var fieldtrim = $.trim(field);
  if (fieldtrim == '') {
    $(this).removeClass('active');
    $(this).val("");
  }
});

$('.modal__button').click(function(e) {
  e.preventDefault();
  $('.modal').addClass('active');
  setTimeout(function () {
    $('.modal').addClass('in');
  }, 100)
});

// отправка формы, поправить ТУТ 
$('.form__sumbit').click(function(e) {
  e.preventDefault();
  $('.modal form').hide();
  $('.modal__title').html("Cпасибо,<br>Ваша заявка принята");
  $('.form-item__submit.modal-close').show();
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








