'use strict';

(function () {
  var formWraps = document.querySelectorAll('.quiz-form__wrap');

  var createDataForm = function (pages) {
    var self = this;
    self.activePage = 'page_0';
    self.choise = 'fourth';
    self.translate = 0;

    pages.forEach(function (it, index) {
      var name = 'page_' + index;
      var pageData = {};

      pageData.element = it;
      pageData.index = index;
      self[name] = pageData;

      pageData.__proto__ = Object.create(createDataForm.prototype);
    });
  };

  createDataForm.prototype.adds = function (property, className) {
    var self = this;
    this[property] = [];
    var elements = this.element.querySelectorAll('.' + className);

    elements.forEach(function (it) {
      self[property].push(it);
    });
  };

  var dataForm = new createDataForm(formWraps);

  for (var key in dataForm) {
    if (dataForm.hasOwnProperty(key) && key.includes('page_')) {
      dataForm[key].adds('inputs', 'quiz-form__input');
      dataForm[key].adds('texts', 'info__text');
      dataForm[key].adds('svgs', 'info__svg');
    }
  }

  window.dataForm = dataForm;
})();
