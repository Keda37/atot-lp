$(function () {


////////////////////////////////////////////////
  // калькулятор
////////////////////////////////////////////////


var onepricemember = 2500; // стоимость одного обучения
var consultexpert = 0; // стоимость консультации эксперта
var priceforsale = 15000; // стоимость до бесплатной доставки
var delivery = 1000; // стоимость доставки
var progressivesale = 0.02; // скидка при большом кол-ве обучаемых
var progressivmember = 10; // кол-во обучаемых для скидки

$(document).ready(function () {
  if ($('.calculator__human-number').val() == '' ) {
    $('.calculator__human-number').val(1);
  }
  calculator();
});

  var oldvalinput = $('.calculator__human-number').val(); // первоначальное значение поля

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

// если сумма уже больше опр.суммы, то доставка будет бесплатной. иначе прибавляем
if ( summ < priceforsale ) {
  summ = summ + delivery;
}



// выводим значение в блок с разбивкой по разрядам
$('.calculator__human-price').text(String(summ).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 '));
}

//////////////////////////////////////////
// Конец калькулятора 
/////////////////////////////////////////


//////////////////////////////////////
// блок с формой
//////////////////////////////////////

$('.button__next').click(function(e) {
  e.preventDefault();
  $('.discount-block__title').text('Заявка на обучение');
  $(this).fadeOut(300);
  $('.discount-block').addClass('discount-block--one-step');
  $('.discount-block__stage').fadeIn(300);
  $('.one-step').fadeIn(300);
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








