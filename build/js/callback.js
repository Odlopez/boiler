'use strict';

(function () {
  var SLIDER_DURATION = 500;
  var dataForm = window.dataForm;
  var choices = {
    first: {
      image: '../img/bear.png',
      text: 'Водка и балалайка'
    },
    second: {
      image: '../img/bush.png',
      text: 'Кабинет ботаники и маленький японец'
    },
    third: {
      image: '../img/deer.png',
      text: 'Север и лемминги'
    },
    fourth: {
      image: '../img/deadpool.png',
      text: 'Красное трико и чимичанги!'
    }
  };
  var srcImages = {
    'to-360': 'first',
    'from-360-to-1': 'first',
    'from-1-to-3': 'second',
    'from-3-to-5': 'second',
    'from-5-to-10': 'third',
    'from-10': 'third',
    'separate-building': 'fourth',
    'inside': 'fourth',
    'extension': 'second',
    'roof': 'third',
    'change-location': 'first',
    'separate-building': 'first',
    'inside': 'fourth',
    'extension': 'third',
    'roof': 'second',
    'change-location': 'fourth'
  };
  var form = document.querySelector('.quiz-form');
  var totalChoice = document.querySelector('.total__choice');

  var ejectTranslate = function () {
    var previousPage = 'page_' + (dataForm[dataForm.activePage].index - 1);

    dataForm[previousPage].element.classList.remove('quiz-form__wrap--active');
    form.style.transform = 'translateX(0)';
  };

  var slideForm = function (element, progress) {
    var width = dataForm[dataForm.activePage].element.offsetWidth;

     element.style.transform = 'translateX(' + (width * progress * -1) + 'px)';
  };

  var linearTimingFunction = function (step) {
    return step;
  };

  var pageCallback = function (e) {
    var parent = dataForm[dataForm.activePage];

    if (e.target.classList.contains('quiz-form__input')) {
      parent.inputs.forEach(function (it, index) {
        if (it.checked) {
          dataForm.choise = srcImages[it.id] || dataForm.choise;

          parent.texts[index] ? parent.texts[index].classList.add('info__text--active') : null;
          parent.svgs[index] ? parent.svgs[index].classList.add('info__svg--active') : null;
          parent.element.querySelector('.quiz-form__img').style.backgroundImage = 'url("' + choices[dataForm.choise].image + '")';
        } else {
          parent.texts[index] ? parent.texts[index].classList.remove('info__text--active') : null;
          parent.svgs[index] ? parent.svgs[index].classList.remove('info__svg--active') : null;
        }
      });
    } else if (e.target.classList.contains('quiz-form__button')) {
      dataForm.activePage = 'page_' + (parent.index + 1);
      parent = dataForm[dataForm.activePage];

      dataForm[dataForm.activePage].element.classList.add('quiz-form__wrap--active');

      var progressLevel = parent.element.querySelector('.progress__level');
      progressLevel ? progressLevel.style.width = (parent.index + 1) / 7 * 100 + '%' : null;

      parent.element.querySelector('.quiz-form__img').style.backgroundImage = 'url("' + choices[dataForm.choise].image + '")';

      totalChoice.textContent = choices[dataForm.choise].text;

      window.animation(form, slideForm, SLIDER_DURATION, linearTimingFunction, ejectTranslate);
    }
  };

  form.addEventListener('click', pageCallback);
})();
