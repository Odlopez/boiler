'use strict';

(function () {
  var SLIDER_DURATION = 500;
  var dataForm = window.dataForm;
  var choices = {
    first: {
      image: '../img/bear.png',
      text: 'Медведь и водка'
    },
    second: {
      image: '../img/bush.png',
      text: 'Дерево и молния'
    },
    third: {
      image: '../img/deer.png',
      text: 'Олень и север'
    },
    fourth: {
      image: '../img/deadpool.png',
      text: 'Красное трико!'
    }
  };
  var srcImages = {
    'to-360': '../img/bear.png',
    'from-360-to-1': '../img/bear.png',
    'from-1-to-3': '../img/bush.png',
    'from-3-to-5': '../img/bush.png',
    'from-5-to-10': '../img/deer.png',
    'from-10': '../img/deer.png',
    'separate-building': '../img/deadpool.png',
    'inside': '../img/deadpool.png',
    'extension': '../img/bush.png',
    'roof': '../img/deer.png',
    'change-location': '../img/bear.png',
    'separate-building': '../img/bear.png',
    'inside': '../img/deadpool.png',
    'extension': '../img/deer.png',
    'roof': '../img/bush.png',
    'change-location': '../img/deadpool.png'
  };
  var wrap = document.querySelector('.quiz-form__wrap');
  var form = document.querySelector('.quiz-form');

  var ejectTranslate = function () {
    dataForm.translate = +form.style.transform.slice(11, form.style.transform.indexOf('px'));
  };

  var slideForm = function (element, progress) {
    var width = wrap.offsetWidth;
    var start = dataForm.translate;

     element.style.transform = 'translateX(' + (start + (width * progress * -1)) + 'px)';
  };

  var linearTimingFunction = function (step) {
    return step;
  };

  var pageCallback = function (e) {
    var parent = dataForm[dataForm.activePage];

    if (e.target.classList.contains('quiz-form__input')) {
      parent.inputs.forEach(function (it, index) {
        if (it.checked) {
          var imageSource = srcImages[it.id] || dataForm.image;

          parent.texts[index] ? parent.texts[index].classList.add('info__text--active') : null;
          parent.svgs[index] ? parent.svgs[index].classList.add('info__svg--active') : null;
          parent.element.querySelector('.quiz-form__img').style.backgroundImage = 'url("' + imageSource + '")';

          dataForm.image = imageSource;
        } else {
          parent.texts[index] ? parent.texts[index].classList.remove('info__text--active') : null;
          parent.svgs[index] ? parent.svgs[index].classList.remove('info__svg--active') : null;
        }
      });
    } else if (e.target.classList.contains('quiz-form__button')) {
      dataForm.activePage = 'page_' + (parent.index + 1);
      parent = dataForm[dataForm.activePage];

      var progressLevel = parent.element.querySelector('.progress__level');
      progressLevel ? progressLevel.style.width = (parent.index + 1) / 7 * 100 + '%' : null;

      parent.element.querySelector('.quiz-form__img').style.backgroundImage = 'url("' + dataForm.image + '")';

      window.animation(form, slideForm, SLIDER_DURATION, linearTimingFunction, ejectTranslate);
    }
  };

  form.addEventListener('click', pageCallback);
})();
