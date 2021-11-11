"use strict";

var datePickerOrder = {
  init: function init() {
    var $datepickerInput = $('.js-datepicker-order');
    $('.js-datepicker-order').datepicker({
      monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      dateFormat: 'dd.mm.yy',
      showOn: "button",
      buttonText: "Select date",
      buttonImage: $datepickerInput.data('icon'),
      beforeShow: function beforeShow(input, inst) {
        // $('#ui-datepicker-div').removeClass(function() {
        // 		return $('.js-datepicker-order').get(0).id; 
        // });
        $('#ui-datepicker-div').addClass('datepicker-order--style');
      }
    });
  }
};
$(function () {
  datePickerOrder.init(); //datePickerOrder
});