'use strict';

(function () {
  var submit = document.querySelector('.quiz-form__submit');

  var onSubmitClick = function (e) {
    e.preventDefault();

    var self = window.location.href.slice(0, window.location.href.indexOf('quiz.html'));
    var URL = self + 'php/send.php';
    console.log(URL)
    var xhr = new XMLHttpRequest();
    var form = e.target.form;
    var data = new FormData(form);

    xhr.responseType = 'json';
    xhr.timeout = 20000;

    xhr.open('POST', URL, true);

    xhr.send(data);

    xhr.addEventListener('load', function (evt) {
      var target = evt.target;

      try {
        if (target.status === 200) {
          createMessage('Ваше сообщение отправлено!');
          form.reset();
        } else {
          createMessage('Ошибка. Статус: ' + evt.target.status);
        }
      } catch (err) {
        createMessage('Ошибка: ' + err.name);
      }
    });

    xhr.addEventListener('timeout', function () {
      createMessage('Время отправки сообщения превышено. Повторите, пожалуйста, еще раз.');
    });

    xhr.addEventListener('error', function () {
      createMessage('Произошла ошибка на сервере. Попробуйте еще раз, пожалуйста.');
    });
  };

  var createMessage = function (str) {
    var text = document.createElement('span');
    text.style = 'position: fixed; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.8); top:0; left:0; color: red; font-size: 40px; display: flex; justify-content: center; align-items: center; padding: 50px';

    text.textContent = str;

    document.body.appendChild(text);
  };

  submit.addEventListener('click', onSubmitClick);
})();
