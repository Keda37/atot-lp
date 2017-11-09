

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function checkSubmitButton(formInput) {
  var $form = formInput;
  

  is_agreed = $form.find('.agreement-check').is(':checked'),
  email = $form.find('.mail-input').val(),
  agreeCheck = $('.agreement-check', $form),
  agreeError = $('.agreement-check-error', $form);
  var errorInput = 0;

  $('.form-item__input[required]', $form).each(function() {
    var valueInput = $(this).val();
    var parentInput = $(this).parent();


    if (!valueInput) {
      parentInput.addClass('has-error');
      errorInput = errorInput + 1;
    } else {
      parentInput.removeClass('has-error'); 

      if ($(this).hasClass('mail-input')) {
        if(validateEmail(email)) {
          parentInput.removeClass('has-error'); 
        } else {
         parentInput.addClass('has-error');
       }
     }
   }
   return errorInput;
 })

  if(!agreeCheck.prop('checked')) {
    agreeError.css('display', 'block');
  } else {
    agreeError.css('display', 'none');
  }

  if(is_agreed && errorInput == 0) {
    return true;
  } else {
    return false;
  }
}







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

$('[data-mask-tel]').mask("8 (999) 999-99-99");


//////////////////////////////////////
// блок с формой
//////////////////////////////////////


// динамические заголовки для каждого шага
var stagetext1 = "Заявка на обучение";
var stagetext2 = "Заявка на обучение";
var stagetext3 = "Список сотрудников";

var stagetext4 = "Cпасибо!";

var stagetextul = "Реквизиты компании"



// кнопка получить скидку 10% 

$('.discount-block__button').click(function(e) {

   $('[data-stage-wrapper]').attr('data-stage-wrapper', '1'); // переключаем шаг у обертки для визуального оформления
  $('[data-stage-item="1"]').addClass('active-stage'); // делаем активным первый шаг
  $(this).fadeOut(100); // скрываем кнопку

 // показываем первое окно
 $('[data-fieldset="1"]').fadeIn(300); 

  // меняем значение заголовка
  $('.discount-block__title').text(stagetext1);

// показываем строку с цифрами
if ($('.discount-block__stage').is(':hidden'))  {
 $('.discount-block__stage').fadeIn(300);
}
});


$('[data-stage]').click(function(e) {
  e.preventDefault();

  // $('html,body').animate({scrollTop:$('.discount-block').offset().top+"px"},{duration:150});

  var formInput = $(this).parents('.application-form-wrapper');
  e.preventDefault();
  // if (checkSubmitButton(formInput)) {

// получаем значение шага
var stage = $(this).attr('data-stage');

// меняем заголовки в зависимости от шага
if (stage == 2) {
 $('.discount-block__title').text(stagetext2);
}
if (stage == 3) {
 $('.discount-block__title').text(stagetext3);
}
if (stage == 4) {
    // если это финальная часть то скрываем форму совсем и выводим сообщение о скидке
    $('.discount-block__title').text(stagetext4);
    $('.application-form').hide();
    $('.discount-block__stage').fadeOut(100);
  }


  if (stage == 2) {
    // переносим данные из первого окна формы в дивы на втором окне
    $('.discount-block__next-name').text($('.form-item__name').val());
    $('.discount-block__next-phone').text($('.form-item__phone').val());
    $('.discount-block__next-email').text($('.form-item__email').val());
  }

// переключаем шаг у обертки для визуального оформления
$('[data-stage-wrapper]').attr('data-stage-wrapper', stage);

  // переключаем цифру в шагах
  $('[data-stage-item].active-stage').removeClass('active-stage');
  $('[data-stage-item="'+stage+'"]').addClass('active-stage');

  // скрываем прошлую форму
  $('[data-fieldset]').fadeOut();
  // погазываем форму текущего шага
  $('[data-fieldset="'+stage+'"]').fadeIn(300);
// }
});





// клик по кнопке физического лица 

$('.discount-block__type-button--fl').click(function() {
  // делаем проверку чтобы нельзя было кликнуть по уже активному блоку
  if (!$(this).hasClass('active')) {
    // переключаем кнопки
    $('.discount-block__type-button.active').removeClass('active');
    $(this).addClass('active');

    // для физического лица переключаем кнопку сразу к 4 шагу
    $('[data-fieldset="2"] .form-item__submit').attr('data-stage', '4').val('Отправить');
// показываем блок со скидкой
$('.discount-block__final-text-discount').show();
}
});

// клик по кнопке юридического лица 
$('.discount-block__type-button--yl').click(function() {
  if (!$(this).hasClass('active')) {
    $('.discount-block__type-button.active').removeClass('active');
    $(this).addClass('active');
    // переключаемся как бы на вторую часть второго окна
    $('.discount-block__type').hide();
    $('.discount-block__next').hide();
    $('.discount-block__ul-type').fadeIn(300);
    // меняем заголовок
    $('.discount-block__title').text(stagetextul);
    // переводим кнопку на 3й уровень
    $('[data-fieldset="2"] .form-item__submit').attr('data-stage', '3').val('Далее');
    // показываем сразу блок с дистанционной заявкой
    if ($('.discount-block__ul-wrapper').is(':hidden')) {
      $('.discount-block__ul-wrapper').fadeIn(300);
    }
  }
});


// клик по выбору способа подачи заявления

$('[data-ul-type]').click(function() {
  if (!$(this).hasClass('active')) {
    // получаем атрибут для переключения обертки
    var ultype = $(this).attr('data-ul-type');
// переключаем кнопку
    $('[data-ul-type]').removeClass('active');
    $(this).addClass('active');
    // если каким-то чудом скрыт низ, показываем его
    if ($('.discount-block__ul-wrapper').is(':hidden')) {
      $('.discount-block__ul-wrapper').fadeIn(300);
    }
    // показываем дистанциооный или традиционный блоки
    $('[data-ul-wrapper]').hide();
    $('[data-ul-wrapper="'+ultype+'"]').fadeIn(300);

    if (ultype == 'traditional') {
      // если традиционный блок, то кнопку переключаем к 4 шагу, убираем скидку
      $('[data-fieldset="2"] .form-item__submit').attr('data-stage', '4').val('Отправить');
      $('.discount-block__final-text-discount').hide();
    } else {
      $('[data-fieldset="2"] .form-item__submit').attr('data-stage', '3').val('Далее');
      $('.discount-block__final-text-discount').show();
    }
  }
});

// проверка на инпут с файлом, если инпут заполнен, показываем имя файла

$('.discount-block__ul-traditional-upload-input').change(function() {
  if ($(this).val() != '') {
    $('.discount-block__ul-traditional-upload').addClass('full');
    $('.discount-block__ul-traditional-upload-text').text(document.getElementById('upload').files[0].name);
  } else {
    $('.discount-block__ul-traditional-upload').removeClass('full');
    $('.discount-block__ul-traditional-upload-text').text('Загрузить заполненный бланк');
  }
});


// кнопка назад 

$('.discount-block__back-button').click(function () {

  // получаем значение шага
  var stage = $('[data-stage-wrapper]').attr('data-stage-wrapper');
  var stageold = stage - 1;
  // если предыдущий шаг - первый, то проверяем, если это было юридическое лицо, то возвращаем ему к началу второго шага, если физическое, то переключаем на первый блок
  if (stageold == 1) {
    $('.discount-block__title').text(stagetext1);
    if ($('.discount-block__ul-type').is(":visible")) {

      stageold = stage;
      $('.discount-block__type-button.active').removeClass('active');
      $('.discount-block__ul-type').hide();
      $('.discount-block__ul-wrapper').hide();
      $('.discount-block__type').fadeIn(300);
      $('.discount-block__next').fadeIn(300);
    }
  }
  if (stageold == 2) {
   $('.discount-block__title').text(stagetextul);
 }

// скрываем старые формы, открываем предыдущие 
 $('[data-stage-wrapper]').attr('data-stage-wrapper', stageold);
 $('[data-stage-item].active-stage').removeClass('active-stage');
 $('[data-stage-item="'+stageold+'"]').addClass('active-stage');
 $('[data-fieldset]').fadeOut(100);
 $('[data-fieldset="'+stageold+'"]').fadeIn(300);

});



// скролл сразу ко второму шагу с кнопки калькулятора 
$('.form-data-stage').click(function (e) {
  var formInput = $(this).parents('form');
  e.preventDefault();
  // проверка на заполненность формы
  if (checkSubmitButton(formInput)) {

    // передаем значения из первой формы в поля формы на первом шаге и добавляем эти же значения во второй шаг

   $('.form-item__name').val($('.form-item__name-calc').val());
   $('.form-item__phone').val($('.form-item__name-phone').val());
   $('.form-item__email').val($('.form-item__name-email').val());

   $('.discount-block__next-name').text($('.form-item__name').val());
   $('.discount-block__next-phone').text($('.form-item__phone').val());
   $('.discount-block__next-email').text($('.form-item__email').val());


   $('html,body').animate({scrollTop:$('.discount-block').offset().top+"px"},{duration:1E3});

   // смотрим на кол-во человек в калькуляторе и заранее подставляем это значение в третий шаг сотрудников

   var countmember = $('.calculator__human-number').val();
   $('.discount-block__member-wrapper').empty(); // удаляем все
   $('.discount-block__member-wrapper').append(addMember(countmember)); // вставляем нужное кол-во


 }
});


function addMember(countmember) {
  // цикл сделан для возможности смены кол-ва добавления за один раз

 for (var i = 0; i < countmember; i++) {
  $('.discount-block__member-wrapper').append('<li class="discount-block__member-item"><input type="text" class="form-item__input form-item__member-name fullname" placeholder="ФИО"/><input type="text" class="form-item__input form-item__member-post" placeholder="Должность"/><div href="#" class="form-item__remove">X</div></li>');

$(".discount-block__member-wrapper input[type='text']").each(function() {
  $(this).suggestions = $("body").suggestions;
    $(this).suggestions({
      token: "a1625ca1d062aa90f768acb14fe198cbe916527c",
        type: "NAME",
        count: 5
});});
}
}

// Кнопка добавления сотрудника 

$('.discount-block__member-add').click(function() {
  addMember(1); // добавляем одного сотрудника, можно поменять
});


// удаление сотрудника 
$('html').on('click','.form-item__remove', function () {         
  $(this).parent('.discount-block__member-item').remove();
});

// Анимация инпутов, сделана чуть сложнее, т.к. часть инпутов стала динамической
$('html').on('change focusin','.form-item__input', function () {         
  $(this).addClass('active');
});

$('html').on('change focusout','.form-item__input', function () {         
  var field = $(this).val();
  var fieldtrim = $.trim(field);
  if (fieldtrim == '') {
    $(this).removeClass('active');
    $(this).val("");
  }
});


///////////////////////////////////////////////
//  Окончание блока с формой
/////////////////////////////////////////////

/////////////////////////////////////////////////
// подключение дадаты
/////////////////////////////////////////////////

// обязательно сменить ключ АПИ на свой иначе не будет работать



// подключение фио к блокам с фио
 $(".fullname").suggestions({
        token: "a1625ca1d062aa90f768acb14fe198cbe916527c",
        type: "NAME",
        count: 5
    });


$("#inn").change(function(e) {
  var promise = suggestINN(e.target.value);
  promise
  .done(function(response) {
    showParty(response.suggestions)
    console.log(response);
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.log(textStatus);
    console.log(errorThrown);
  });
});

$("#bik").change(function(e) {
  var promise = suggestBIK(e.target.value);
  promise
  .done(function(response) {
    showBank(response.suggestions)
    console.log(response);
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.log(textStatus);
    console.log(errorThrown);
  });
});

function suggestINN(query) {
  var serviceUrl = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party",
  token = "a1625ca1d062aa90f768acb14fe198cbe916527c"; // поменять на свой!!!!
  var request = {
    "query": query
  };
  var params = {
    type: "POST",
    contentType: "application/json",
    headers: {
      "Authorization": "Token " + token
    },
    data: JSON.stringify(request)
  }

  return $.ajax(serviceUrl, params);
}

function suggestBIK(query) {
  var serviceUrl = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/bank",
  token = "a1625ca1d062aa90f768acb14fe198cbe916527c"; // поменять!!!!!
  var request = {
    "query": query
  };
  var params = {
    type: "POST",
    contentType: "application/json",
    headers: {
      "Authorization": "Token " + token
    },
    data: JSON.stringify(request)
  }

  return $.ajax(serviceUrl, params);
}

function clearParty() {
  $("#name-org").val("");
  $("#kpp").val("");
  $("#legal-adress").val("");
}

function clearBank() {
  $("#bank").val("");
  $("#kpp").val("");
  $("#correspondent-acc").val("");
}

function showParty(suggestions) {
  clearParty();
  if (suggestions.length === 0) return;
  var party = suggestions[0].data;
  $("#kpp").val(party.kpp).addClass('active');
  $("#name-org").val(party.name.full_with_opf).addClass('active');
  $("#legal-adress").val(party.address.value).addClass('active');
}

function showBank(suggestions) {
  clearBank();
  if (suggestions.length === 0) return;
  var bank = suggestions[0].data;
  $("#bank").val(bank.address.unrestricted_value).addClass('active');
  $("#correspondent-acc").val(bank.correspondent_account).addClass('active');
}

//////////////////////////////////////
// конец дадаты
//////////////////////////////////

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



$('.modal__button').click(function(e) {
  e.preventDefault();
  $('.modal').addClass('active');
  setTimeout(function () {
    $('.modal').addClass('in');
  }, 100)
});

// отправка формы, с кнопки отправить заявку, проверка на валидацию, открытие модального окна в конце
$('.form__sumbit').click(function(e) {

  var formInput = $(this).parents('form');
  e.preventDefault();
  if (checkSubmitButton(formInput)) {
    $('.modal form').hide();
    $('.modal__title').html("Cпасибо,<br>Ваша заявка принята");
    $('.form-item__submit.modal-close').show();
  }
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








