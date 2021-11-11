"use strict";

var _optionsSlider;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//const { init } = require("browser-sync");
var gCarousel = {
  el: '.js-main-carousel',
  options: {
    slidesToShow: 1,
    slidesToScroll: 1,
    touchThreshold: 50,
    infinite: true,
    // fade: true,
    dots: true,
    arrows: false
  },
  init: function init() {
    if ($(this.el).length > 0) $(this.el).slick(this.options);
  }
};
var gBrands = {
  el: '.js-brands-carousel',
  options: {
    infinite: true,
    dots: false,
    arrows: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    touchThreshold: 50,
    swipeToSlide: true,
    responsive: [{
      breakpoint: 1280,
      settings: {
        slidesToShow: 6
      }
    }, {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5
      }
    }, {
      breakpoint: 768,
      settings: {
        centerMode: true,
        slidesToShow: 1,
        variableWidth: true,
        arrows: false
      }
    }]
  },
  init: function init() {
    if ($(this.el).length > 0) $(this.el).slick(this.options);
  }
};
var gProduct = {
  el: '.js-product-carousel:visible',
  options: {
    infinite: true,
    dots: false,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    touchThreshold: 50,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    }, {
      breakpoint: 768,
      settings: "unslick"
    }]
  },
  init: function init() {
    this.reactive();
    $(window).on('resize', this.reactive.bind(this));
  },
  reactive: function reactive() {
    var t = this;

    if ($(t.el).length > 0) {
      $(t.el).each(function () {
        if (!$(this).hasClass('slick-initialized')) {
          $(this).slick(t.options);
        }
      });
    }
  }
};
var gSlider = {
  elSlider: '.js-product-slider:visible',
  elGallery: '.js-product-gallery:visible',
  elTabletGallary: '.js-product-gallery-mobile',
  elGallerySlide: '.js-product-gallery-upblock-open',
  elCloseUpblockGallery: '.js-product-gallery-close',
  optionsSlider: (_optionsSlider = {
    infinite: false,
    dots: false,
    arrows: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    touchThreshold: 50
  }, _defineProperty(_optionsSlider, "infinite", false), _defineProperty(_optionsSlider, "vertical", true), _defineProperty(_optionsSlider, "verticalSwiping", true), _defineProperty(_optionsSlider, "focusOnSelect", true), _defineProperty(_optionsSlider, "asNavFor", ''), _optionsSlider),
  optionsGallery: {
    slidesToShow: 1,
    slidesToScroll: 1,
    touchThreshold: 50,
    infinite: false,
    dots: false,
    arrows: false,
    fade: true,
    asNavFor: ''
  },
  optionsTabletGallary: {
    slidesToShow: 1,
    slidesToScroll: 1,
    touchThreshold: 50,
    infinite: true,
    dots: false,
    // fade: true,
    arrows: true
  },
  init: function init() {
    this.optionsSlider.asNavFor = this.elGallery;
    this.optionsGallery.asNavFor = this.elSlider;
    if ($(this.elSlider).length > 0) $(this.elSlider).slick(this.optionsSlider);
    if ($(this.elGallery).length > 0) $(this.elGallery).slick(this.optionsGallery);
    if ($(this.elTabletGallary).length > 0) $(this.elTabletGallary).slick(this.optionsTabletGallary);
    $(document).on('click', this.elGallerySlide, this.openGalleryInUpblock);
  },
  openGalleryInUpblock: function openGalleryInUpblock() {
    Upblock.showId('gallery');
    var gallerryImgs = $(this).closest(gSlider.elGallery).find('img');
    var activeSlideIndex = $(this).attr("data-slick-index");
    var upblockGalleryItems = '';
    gallerryImgs.each(function () {
      upblockGalleryItems += "<div class=\"b-slider__item\">".concat(this.outerHTML, "</div>");
    });
    var galleryInPopup = $('#gallery').find(gSlider.elGallery);

    if (galleryInPopup.hasClass('slick-initialized')) {
      galleryInPopup.slick('unslick');
    }

    galleryInPopup.html(upblockGalleryItems);
    galleryInPopup.slick(this.optionsTabletGallary);
    galleryInPopup.slick('slickGoTo', parseInt(activeSlideIndex), true);
  }
};
var bHeader = {
  el: '.js-header',
  menu: '.js-mobile-menu',
  searchBtnOpen: '.js-header-search-open',
  searchBtnClose: '.js-header-search-close',
  init: function init() {
    var t = this;
    $(window).on('scroll', function () {
      t.pageMove();
    });
    $(t.menu).on('click', function () {
      t.openMenu();
    });
    t.pageMove();
    $(document).on('click', this.searchBtnOpen, this.openSearch.bind(this));
    $(document).on('click', this.searchBtnClose, this.openSearch.bind(this));
  },
  pageMove: function pageMove() {
    var dy = window.scrollY;

    if (dy > 30) {
      $(this.el).addClass('is-fixed');
    } else {
      $(this.el).removeClass('is-fixed');
    }
  },
  openMenu: function openMenu() {
    $(this.el).toggleClass('is-open');
    $(this.el).removeClass('is-search-opened');
  },
  openSearch: function openSearch() {
    $(this.el).toggleClass('is-search-opened');
    $(this.el).removeClass('is-open');
  }
};
var fieldSelect = {
  field: '.js-select-field',
  caption: '.js-select-caption',
  value: '.js-select-value',
  option: '.js-select-option',
  subm: 'js-form-submit',
  nav: 'js-nav-select',
  navItem: '.js-nav-item',
  init: function init() {
    var t = this;
    $(t.caption).on('click', function () {
      t.toggleOptions(this);
    });
    $(t.option).on('click', function () {
      t.selectOption(this);
    });
    $('body').on('click', function (event) {
      if (!event.target.closest(t.field)) t.hideAllOptions();
    });
  },
  toggleOptions: function toggleOptions(obj) {
    var t = this,
        p = $(obj).closest(t.field);
    $(t.field).not(p).removeClass('is-open');
    p.toggleClass('is-open');
  },
  hideAllOptions: function hideAllOptions() {
    var t = this;
    $(t.field).removeClass('is-open');
  },
  selectOption: function selectOption(obj) {
    var t = this,
        p = $(obj).closest(t.field);
    t.hideAllOptions();
    p.find(t.caption).html($(obj).html());
    p.find(t.value).val($(obj).data('val'));

    if ($(obj).hasClass(t.subm)) {
      // console.log('submit');
      p.find('form').submit();
    }

    if ($(p).hasClass(t.nav)) {
      $(t.navItem).removeClass('is-active');
      $(t.navItem + '[data-id="' + $(obj).data('val') + '"]').addClass('is-active');
    }
  }
};
var fieldSuggest = {
  field: '.js-suggest',
  options: '.js-suggest-options',
  item: '.js-suggest-item',
  itemEmpty: '.js-suggest-item-empty',
  val: '.js-suggest-val',
  caption: '.js-suggest-caption',
  buttonClear: '.js-suggest-clear',
  buttonSearch: '.js-suggest-search',
  init: function init() {
    var t = this;
    $(t.field + ' ' + t.caption).on('keyup', function () {
      t.toggleOptions(this);
    });
    $(t.buttonClear).on('click', function () {
      t.clearInput(this);
    });
    $(t.item).on('click', function () {
      t.selectOption(this);
    });
    /*$('body').on('click', function(event){
    	if(!event.target.closest(t.field)) t.hideAllOptions();
    })*/
  },
  toggleOptions: function toggleOptions(obj) {
    var t = this,
        p = $(obj).closest(t.field);

    if (obj.value != '') {
      $(t.field).not(p).removeClass('is-open');
      p.addClass('is-open');
      p.find(t.buttonClear).addClass('is-show');
      p.find(t.item).each(function () {
        if ($(this).html().trim().toLowerCase().indexOf($(obj).val().trim().toLowerCase()) != -1) {
          $(this).removeClass('is-hidden');
        } else {
          $(this).addClass('is-hidden');
        }
      });

      if (p.find(t.item + ':visible').length == 0) {
        $(t.itemEmpty).show();
      } else {
        $(t.itemEmpty).hide();
      }
    } else {
      t.hideAllOptions();
      p.find(t.buttonClear).removeClass('is-show');
    }
  },
  hideAllOptions: function hideAllOptions() {
    var t = this;
    $(t.field).removeClass('is-open');
  },
  clearInput: function clearInput(obj) {
    var t = this,
        p = $(obj).closest(t.field);
    p.find(t.caption).val('');
    p.find(t.buttonClear).removeClass('is-show');
    t.hideAllOptions();
  },
  selectOption: function selectOption(obj) {
    var t = this,
        p = $(obj).closest(t.field);
    t.hideAllOptions();
    p.find(t.caption).val($(obj).html());
    p.find(t.val).val($(obj).data('val'));
  }
};
var catalogFilter = {
  filterBlock: '.js-filter-block',
  filterCaption: '.js-filter-caption',
  catalogBlock: '.js-catalog-block',
  catalogCaption: '.js-catalog-caption',
  brandBlock: '.js-brand-search',
  brandList: '.js-brand-list',
  brandItem: '.js-brand-item',
  color: '.js-switch-color',
  priceInput: '.js-price-valid',
  filters: '.js-block-filters',
  filterButton: '.js-toggle-filter',
  categoryButton: '.js-toggle-category',
  categoryBlock: '.js-block-catalog-menu',
  filterBlockBtn: '.js-catalog-filter-btn',
  filterChoiceCount: '.js-filter-choice-count',
  filterChoiceRemove: '.js-filter-choice-close',
  filterClearBtn: '.js-filter-clear',
  rangePrice: '.js-range-price',
  init: function init() {
    var t = this,
        minPriceInput = $('[data-min]'),
        maxPriceInput = $('[data-max]');
    $(t.catalogCaption).on('click', function (e) {
      e.preventDefault();
      t.catalogOpen(this);
    });
    $(t.filterClearBtn).on('click', function (e) {
      e.preventDefault();
      t.filterClear();
    });
    $(t.filterCaption).on('click', function (e) {
      e.preventDefault();
      t.filterOpen(this);
    });
    $(t.brandBlock + ' input').on('keyup', function () {
      t.searchBrand(this);
    });
    $(t.priceInput + ' input').on('keyup', function () {
      t.priceValid(this);
    });
    $(t.filterButton).on('click', function () {
      t.toggleFilters();
    });
    $(t.categoryButton).on('click', function () {
      t.toggleCategory();
    });
    /*$(t.color).on('click',function(){ //color switcher
    	t.colorSwitch(this)
    })*/

    $(t.filterBlockBtn).on('click', function () {
      t.showFilterItems(this, 0);
    });
    $(t.filterChoiceRemove).on('click', function () {
      t.showFilterItems(this, 1);
      t.filterOpen(this, 0);
    });
    $(t.rangePrice).slider({
      range: true,
      min: minPriceInput.data('min'),
      max: maxPriceInput.data('max'),
      values: [minPriceInput.data('min'), maxPriceInput.data('max')],
      slide: function slide(event, ui) {
        minPriceInput.val(ui.values[0]);
        maxPriceInput.val(ui.values[1]);
      }
    });
    minPriceInput.change(function () {
      $(t.rangePrice).slider("values", 0, $(this).val());
    });
    maxPriceInput.change(function () {
      $(t.rangePrice).slider("values", 1, $(this).val());
    });
  },
  catalogOpen: function catalogOpen(obj) {
    var t = this;
    $(obj).closest(t.catalogBlock).toggleClass('is-open');
  },
  filterClear: function filterClear() {
    var t = this;
    $(t.filterCaption).removeClass('is-active');
    $(t.filterBlock + ' input[type="checkbox"]').prop('checked', false);
    $(t.filterBlock).find(t.filterChoiceCount).html('');
  },
  filterOpen: function filterOpen(obj, remove) {
    var t = this;

    if (!remove) {
      if (!$(obj).closest(t.filterBlock).hasClass('is-open')) {
        $(t.filterBlock).removeClass('is-open');
        $(obj).closest(t.filterBlock).addClass('is-open');
      } else {
        $(obj).closest(t.filterBlock).removeClass('is-open');
      }
    }
  },
  searchBrand: function searchBrand(obj) {
    var t = this,
        str = $(obj).val().trim().toLowerCase();
    $(obj).closest(t.filterBlock).find(t.brandItem).each(function () {
      if ($(this).find('.b-field__caption').html().trim().toLowerCase().indexOf(str) < 0) {
        $(this).addClass('is-hidden');
      } else {
        $(this).removeClass('is-hidden');
      }
    });
  },

  /*colorSwitch: function(obj){
  	var t = this;
  	$(obj.parentNode).find(t.color).removeClass('is-active');
  	$(obj).addClass('is-active');
  },*/
  priceValid: function priceValid(obj) {
    var regexp = /^[0-9@]+$/;

    if (regexp.test(obj.value) !== true) {
      obj.value = obj.value.replace(/[^0-9@]+/, '');
    }

    if (obj.dataset.min && parseInt(obj.value) < parseInt(obj.dataset.min)) obj.value = obj.dataset.min;
    if (obj.dataset.max && parseInt(obj.value) > parseInt(obj.dataset.max)) obj.value = obj.dataset.max;
  },
  toggleFilters: function toggleFilters(obj) {
    var t = this;
    $(t.filters).toggleClass('is-open');
  },
  toggleCategory: function toggleCategory(obj) {
    var t = this;
    $(t.categoryBlock).toggleClass('is-open');
  },
  showFilterItems: function showFilterItems(obj, remove) {
    var t = this;
    var checkInputs = $(obj).closest(t.filterBlock).find('input:checked');
    $(obj).closest(t.filterBlock).removeClass('is-open');

    if (checkInputs.length > 1) {
      $(obj).closest(t.filterBlock).find(t.filterChoiceCount).html(': ' + checkInputs.length);
      $(obj).closest(t.filterBlock).find(t.filterCaption).addClass('is-active');
    } else if (checkInputs.length == 1) {
      var inputText = checkInputs.next().text();
      $(obj).closest(t.filterBlock).find(t.filterChoiceCount).html(': ' + inputText);
      $(obj).closest(t.filterBlock).find(t.filterCaption).addClass('is-active one-choice');
    } else {
      $(obj).closest(t.filterBlock).find(t.filterChoiceCount).html('');
      $(obj).closest(t.filterBlock).find(t.filterCaption).removeClass('is-active one-choice');
    }

    if (remove) {
      $(obj).closest(t.filterBlock).find(t.filterChoiceCount).html('');
      $(obj).closest(t.filterBlock).find(t.filterCaption).removeClass('is-active one-choice');
      checkInputs.prop('checked', false);
    }
  }
};
var gStar = {
  box: '.js-stars',
  el: '.js-star',
  init: function init() {
    var t = this;
    $(t.el).on('click', function () {
      t.starSelect(this);
    });
  },
  starSelect: function starSelect(obj) {
    var t = this;
    if ($(obj).closest(t.box).hasClass('is-blocked')) return;
    $(obj).closest(t.box).find(t.el).removeClass('is-active');
    $(obj).addClass('is-active');
  }
};
var gProductProperties = {
  list: '.js-product-properties-list',
  btn: '.js-product-properties-btn-show',
  init: function init() {
    var t = this;
    $(t.btn).on('click', function () {
      $(this).removeClass('is-shown').siblings(t.list).removeClass('is-closed');
    });
  }
};
var gTabs = {
  parentTabs: '.js-tabs-parent',
  captionTab: '.js-tab-caption',
  blockTab: '.js-tab-block',
  init: function init() {
    var t = this;
    $(t.captionTab).on('click', function () {
      t.activeTab(this);
    });
  },
  activeTab: function activeTab(obj) {
    var t = this,
        p = $(obj).closest(t.parentTabs);
    p.find(t.captionTab).removeClass('is-active');
    $(obj).addClass('is-active');
    var idx = p.find(t.captionTab).index($(obj));
    p.find(t.blockTab).removeClass('is-active');
    p.find(t.blockTab).eq(idx).addClass('is-active');
    gProduct.reactive();
  }
};
var FormVal = {
  el: '.b-form-field.required',
  elName: '.b-form-field--name',
  elEmail: '.b-form-field--email',
  elPhone: '.js-phone-mask',
  elPassword: '.b-form-field--password',
  elPasswordRepeat: '.b-form-field--password-repeat',
  elSubmit: '.js-btn-submit',
  elContainer: '.js-val-container',
  init: function init() {
    var t = this;
    $(t.el + t.elName + ' input').on('keyup', function (e) {
      var regexp = /^[a-zA-Zа-яА-Я@]+$/;

      if (regexp.test(this.value) !== true) {
        this.value = this.value.replace(/[^a-zA-Zа-яА-Я@]+/, '');
      } else {
        $(this).closest(t.el).removeClass('is-error');
      } //t.validation();

    });
    $(t.el + t.elName + ' input').on('blur', function (e) {
      var regexp = /^[a-zA-Zа-яА-Я@]+$/;

      if (regexp.test(this.value) !== true) {
        $(this).closest(t.el).addClass('is-error').removeClass('is-done');
      } else {
        $(this).closest(t.el).removeClass('is-error').addClass('is-done');
      } //t.validation();

    });
    $(t.el + t.elEmail + ' input').on('blur', function (e) {
      var regexp = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;

      if (regexp.test(this.value) !== true) {
        $(this).closest(t.el).addClass('is-error').removeClass('is-done');
      } else {
        $(this).closest(t.el).removeClass('is-error').addClass('is-done');
      } //t.validation();

    });
    $(t.el + t.elPassword + ' input').on('blur', function (e) {
      /*var regexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
      if (regexp.test(this.value) !== true) {*/
      if (!$.trim(this.value)) {
        $(this).closest(t.el).addClass('is-error').removeClass('is-done');
      } else {
        $(this).closest(t.el).removeClass('is-error').addClass('is-done');
      } //t.validation();

    });
    $(t.el + t.elPassword + ' input').on('keyup', function (e) {
      $(this).closest(t.elContainer).find(t.el + t.elPasswordRepeat + ' input').val(''); //t.validation();
    });
    $(t.el + t.elPasswordRepeat + ' input').on('keyup', function (e) {
      var first_password = $(this).closest(t.elContainer).find(t.el + t.elPassword + ' input').val();

      if (this.value != first_password) {
        $(this).closest(t.el).addClass('is-error').removeClass('is-done');
      } else {
        $(this).closest(t.el).removeClass('is-error').addClass('is-done');
      } //t.validation();

    });
    $(t.elSubmit).click(function () {
      t.validation(this);
    });
    $(t.elPhone).find('input').mask('+7 (000) 000 00 00'); //vendor jquery.mask.min.js

    t.readyCheck();
  },
  readyCheck: function readyCheck() {
    var t = this,
        tmp;
    $(t.el).each(function () {
      tmp = $(this).find('input');

      if ($.trim(tmp.val()) && !$(this).hasClass('is-error')) {
        $(this).closest(t.el).addClass('is-done');
      }
    });
  },
  validation: function validation(obj) {
    var t = this,
        isError = false,
        tmp;
    $(obj).closest(t.elContainer).find(t.el).each(function () {
      tmp = $(this).find('input');

      if (!$.trim(tmp.val()) || $(this).hasClass('is-error')) {
        $(this).closest(t.el).addClass('is-error').removeClass('is-done');
        isError = true;
      }
    }); // if(!isError){
    // 	console.log('submit');
    // }else{
    // 	console.log('error');
    // }
  }
};
var Upblock = {
  el: '.js-upblock',
  elClose: '.js-upblock-close',
  init: function init() {
    var t = this;
    $(t.elClose).on('click', function () {
      t.close(this);
    });
    $(t.el).on('click', function (event) {
      if ($(event.target).hasClass('upblock')) t.close();
    });
    $(document).keyup(function (e) {
      if (e.key === "Escape") {
        $(t.el + '.is-open').last().removeClass('is-open');
      }
    });
  },
  showId: function showId(id) {
    var t = this;
    t.close();
    $('#' + id).addClass('is-open');
  },
  close: function close(obj) {
    var t = this;

    if (obj) {
      $(obj).closest(t.el).removeClass('is-open');
    } else {
      $(t.el).removeClass('is-open');
    }
  }
};
var gCounter = {
  el: '.js-counter',
  elMinus: '.js-counter-minus',
  elPlus: '.js-counter-plus',
  elInput: '.js-counter-count',
  basket: '.js-basket',
  basketCount: '.js-basket-count',
  baskerPrice: '.js-basket-price',
  baskerOldPrice: '.js-basket-oldprice',
  basketRemove: '.js-basket-remove',
  basketSum: '.js-basket-sum',
  basketDiscount: '.js-basket-discount',
  baskerEmpty: '.js-basket-empty',
  blockClass: '.is-blocked',
  init: function init() {
    var t = this;
    $(t.elMinus).on('click', function () {
      t.counterMinus(this);
    });
    $(t.elPlus).on('click', function () {
      t.counterPlus(this);
    });
    $(t.elInput).on('keyup blur', function () {
      t.fieldValidation(this);
    });
    $(t.basketRemove).on('click', function () {
      t.removeItem(this);
    });
    t.calc();
  },
  fieldValidation: function fieldValidation(obj) {
    var regexp = /^[0-9@]+$/;

    if ($.trim(obj.value) === '') {
      obj.value = 1;
    }

    if (regexp.test(obj.value) !== true) {
      obj.value = obj.value.replace(/[^0-9@]+/, '');
    }

    if (parseInt(obj.value) < 1) obj.value = 1;
    if (parseInt(obj.value) > 9999) obj.value = 9999;
    this.buttons(obj);
  },
  counterMinus: function counterMinus(obj) {
    var t = this,
        field = $(obj).closest(t.el).find(t.elInput)[0],
        i = 0;
    if ($(obj).closest(t.blockClass).length != 0) return false;
    t.fieldValidation(field);
    i = parseInt(field.value);
    i--;
    if (i < 1) i = 1;
    field.value = i;
    t.buttons(field);
  },
  counterPlus: function counterPlus(obj) {
    var t = this,
        field = $(obj).closest(t.el).find(t.elInput)[0],
        i = 0;
    if ($(obj).closest(t.blockClass).length != 0) return false;
    t.fieldValidation(field);
    i = parseInt(field.value);
    i++;
    if (i > 9999) i = 9999;
    field.value = i;
    t.buttons(field);
  },
  buttons: function buttons(obj) {
    var t = this,
        parent = $(obj).closest(t.el);

    if (obj.value <= 1) {
      parent.find(t.elMinus).addClass('is-disabled');
    } else {
      parent.find(t.elMinus).removeClass('is-disabled');
    }

    if (obj.value >= 9999) {
      parent.find(t.elPlus).addClass('is-disabled');
    } else {
      parent.find(t.elPlus).removeClass('is-disabled');
    }

    t.calc();
  },
  removeItem: function removeItem(obj) {
    var t = this;
    $(obj).closest(t.basket).addClass('is-hidden');
    t.calc();

    if ($(t.basket + ':visible').length == 0) {
      $(t.baskerEmpty).addClass('is-show');
      $(t.basketCount).html('');
    } else {
      $(t.basketCount).html('(' + $(t.basket + ':visible').length + ' шт)');
    }
  },
  calc: function calc() {
    var t = this,
        sum = 0,
        oldsum = 0,
        disc = 0;
    $(t.el + ':visible').each(function () {
      var price = parseFloat($(this).data('price')) * parseInt($(this).find(t.elInput).val()),
          oldprice = parseFloat($(this).data('oldprice')) * parseInt($(this).find(t.elInput).val());
      sum += price;
      oldsum += oldprice;
      price = new Intl.NumberFormat('ru-RU').format(price.toFixed(2));
      oldprice = new Intl.NumberFormat('ru-RU').format(oldprice.toFixed(2));
      $(this).closest(t.basket).find(t.baskerPrice).html('<span class="b-price_rub">o</span> ' + price);
      $(this).closest(t.basket).find(t.baskerOldPrice).html('<span class="b-price_rub">o</span> ' + oldprice);
    });
    disc = Math.abs(oldsum - sum);
    sum = new Intl.NumberFormat('ru-RU').format(sum.toFixed(2));
    disc = new Intl.NumberFormat('ru-RU').format(disc.toFixed(2));
    $(t.basketDiscount).html(disc + ' <span class="b-price_rub">o</span>');
    $(t.basketSum).html(sum + ' <span class="b-price_rub">o</span>');
  }
};
var gDelivery = {
  el: '.js-delivery',
  elType: '.js-delivery-type',
  elOption: '.js-delivery-option',
  init: function init() {
    var t = this;
    $(t.elType).on('change', function () {
      t.changeType(this);
    });
  },
  changeType: function changeType(obj) {
    var t = this,
        p = $(obj).closest(t.el);
    p.find(t.elOption).removeClass('is-show');
    p.find(t.elOption + '[data-type="' + $(obj).val() + '"]').addClass('is-show');
  }
};
var gLoginZone = {
  el: '.js-loginzone-menu',
  elTitle: '.js-loginzone-caption',
  init: function init() {
    var t = this;
    $(t.elTitle).on('click', function () {
      t.openMenu(this);
    });
  },
  openMenu: function openMenu(obj) {
    var t = this;
    $(obj).closest(t.el).toggleClass('is-open');
  }
};
var gProfile = {
  el: '.js-profile',
  elMenu: '.js-profile-menu',
  elBlock: '.js-profile-block',
  elOrders: '.js-profile-orders',
  elOrderItem: '.js-profile-order',
  init: function init() {
    var t = this;
    $(t.elOrderItem).on('click', function () {
      t.openOrder(this);
    });
    $(t.elMenu).on('click', function () {
      t.openBlock(this);
    });
  },
  openOrder: function openOrder(obj) {
    var t = this,
        p = $(obj).closest(t.elOrders);
    p.find(t.elOrderItem).not($(obj)).removeClass('is-open');
    $(obj).toggleClass('is-open');
  },
  openBlock: function openBlock(obj) {
    var t = this,
        p = $(obj).closest(t.el);
    p.find(t.elMenu).removeClass('is-active');
    $(obj).addClass('is-active');
    var idx = p.find(t.elMenu).index($(obj));
    p.find(t.elBlock).removeClass('is-show');
    p.find(t.elBlock).eq(idx).addClass('is-show');
  }
};
var jsSocial = {
  el: '.js-instagram:visible',
  elItem: '.js-instagram-item',
  init: function init() {
    this.loadData();
  },
  loadData: function loadData() {
    if ($(jsSocial.el).length != 0) {
      // https://www.instagram.com/cookhouserussia/?__a=1
      $.getJSON("/f/static/instagram.json", function (data) {
        if (data.graphql.user) {
          var st_array = data.graphql.user.edge_owner_to_timeline_media.edges;
          $(jsSocial.elItem).each(function (i) {
            $(this).html('<img src="' + st_array[i].node.display_url + '" alt="">');
            $(this)[0].href = 'https://www.instagram.com/p/' + st_array[i].node.shortcode + '/';
          });
        } // console.log(st_array);

      });
    }
  }
};
var gSteps = {
  el: '.js-step',
  elTitle: '.js-step-title',
  elMore: '.js-step-more',
  elBlock: '.js-step-hidden',
  init: function init() {
    var t = this;
    $(t.elTitle).on('click', function () {
      t.toggleBlock(this);
    });
    $(t.elMore).on('click', function () {
      t.moreBlock(this);
    });
  },
  toggleBlock: function toggleBlock(obj) {
    var t = this;
    $(obj).closest(t.el).toggleClass('is-open');
  },
  moreBlock: function moreBlock(obj) {
    var t = this;
    $(obj).closest(t.el).find(t.elBlock).show();
    $(obj).hide();
  }
}; // function shopMap(params) {
// 	if($('#shop-info-template').length==0) return;
// 	var $self = $('.js-shops');
// 	var $shopList = $self.find('.js-shops-list');
// 	var $input = $self.find('.js-shops-item');
// 	var source = $('#shop-info-template').html();
// 	var template = Handlebars.compile(source);
// 	var shops = shopsList;
// 	var map;
// 	var objectManager;
// 	var defaultCity = Object.keys(shopsList)[0];
// 	var waitingFor;
// 	function drawShopsList(shops) {
// 		// if (objectManager) {
// 		// 	//objectManager.removeAll();
// 		// 	$shopList.html(template({'shops': shops}));
// 		// 	var $shops = $self.find('.b-shops__item');
// 		// 	var $selected = $shops.first();
// 		// 	$selected.addClass('is-active');
// 		// 	positionMap($selected.data('long'), $selected.data('lat'));
// 		// 	$shops.on('click', function() {
// 		// 		var $obj = $(this);
// 		// 		var objects = {
// 		// 			"type": "FeatureCollection",
// 		// 			"features": shops.map(function(item) {
// 		// 				return {
// 		// 					"type": "Feature",
// 		// 					"id": item.gps.longitude,
// 		// 					"geometry": {
// 		// 						"type": "Point",
// 		// 						"coordinates": [item.gps.longitude, item.gps.latitude]
// 		// 					},
// 		// 					"properties": {
// 		// 						"balloonContent": item.name + '<br/>' + item.address + '<br/>' + item.phone + '<br/>' + item.workTime,
// 		// 						"clusterCaption": item.name
// 		// 					},
// 		// 					"options": {
// 		// 						'iconLayout': 'default#image',
// 		// 						'iconImageHref': item.gps.longitude == $obj.data('long') ? '/f/img/icon-map-logo-active.svg' : '/f/img/icon-map-logo.svg',
// 		// 						'iconImageSize': [35, 35],
// 		// 					}
// 		// 				}
// 		// 			})
// 		// 		}
// 		// 		// console.log(objects);
// 		// 		objectsManager(objects);
// 		// 		delete objects;
// 		// 		$shops.removeClass('is-active');
// 		// 		$obj.addClass('is-active');
// 		// 		positionMap($obj.data('long'), $obj.data('lat'));
// 		// 	});
// 		// } else {
// 		// 	waitingFor = shops;
// 		// }
// 	}
// 	function initMap () {
// 		map = new ymaps.Map('shop-map', {
// 			center: [55.76, 37.64],
// 			zoom: 10
// 		});
// 		objectManager = new ymaps.ObjectManager({
// 			clusterize: true,
// 			gridSize: 32
// 		});
// 		if (waitingFor) {
// 			drawShopsList(waitingFor);
// 		} else {
// 			drawShopsList(shops[defaultCity]);
// 		}
// 	}
// 	function objectsManager(obj) {
// 		objectManager.removeAll();
// 		map.geoObjects.add(obj);
// 	}
// 	function positionMap(longitude, latitude) {
// 		map.setCenter([longitude, latitude]);
// 		map.setZoom(14);
// 	}
// 	window.citySelect = function(city_id) {
// 		if (city_id == 'all') {
// 			var all_shops = [];
// 			for (var i in shops) {
// 				all_shops = all_shops.concat(shops[i])
// 			}
// 			drawShopsList(all_shops);
// 		} else {
// 			drawShopsList(shops[city_id]);
// 		}
// 	}
// 	$input.on('click', function() {
// 		citySelect($(this).data('id'));
// 	});
// 	ymaps.ready(initMap);
// }

function shopMap(params) {
  if ($('#shop-info-template').length == 0) return;
  var $self = $('.js-shops');
  var $shopList = $self.find('.js-shops-list');
  var $input = $self.find('.js-shops-item');
  var source = $('#shop-info-template').html();
  var template = Handlebars.compile(source);
  var shops = shopsList;
  var map;
  var objectManager;
  var defaultCity = Object.keys(shopsList)[0];
  var waitingFor;

  function drawShopsList(shops) {
    if (objectManager) {
      objectManager.removeAll();
      var objects = {
        "type": "FeatureCollection",
        "features": shops.map(function (item) {
          return {
            "type": "Feature",
            "id": item.gps.longitude,
            "geometry": {
              "type": "Point",
              "coordinates": [item.gps.longitude, item.gps.latitude]
            },
            "properties": {
              "balloonContent": item.name + '<br/>' + item.address + '<br/>' + item.phone + '<br/>' + item.workTime,
              "clusterCaption": item.name
            },
            "options": {
              'iconLayout': 'default#image',
              'iconImageHref': typeof item.icon !== 'undefined' && item.icon !== '' ? item.icon : 'img/icon-map-logo.svg',
              'iconImageSize': [35, 35]
            }
          };
        })
      };
      objectManager.add(objects);
      $shopList.html(template({
        'shops': shops
      }));
      var $shops = $self.find('.b-shops__item');
      var $selected = $shops.first();
      $selected.addClass('is-active');
      positionMap($selected.data('long'), $selected.data('lat'));
      $('.b-shop__location[data-address]').first().css('display', 'block');
      $shops.on('click', function () {
        var $obj = $(this);
        $shops.removeClass('is-active');
        $obj.addClass('is-active');
        positionMap($obj.data('long'), $obj.data('lat'));
        var addressInfo = $(this).data('address');
        $('.b-shop__location[data-address]').fadeOut();
        $('.b-shop__location[data-address=' + addressInfo + ']').fadeIn();
      });
    } else {
      waitingFor = shops;
    }
  }

  function initMap() {
    map = new ymaps.Map('shop-map', {
      center: [55.76, 37.64],
      zoom: 10
    });
    objectManager = new ymaps.ObjectManager({
      clusterize: true,
      gridSize: 32
    });
    map.geoObjects.add(objectManager);

    if (waitingFor) {
      drawShopsList(waitingFor);
    } else {
      drawShopsList(shops[defaultCity]);
    }
  }

  function positionMap(longitude, latitude) {
    map.setCenter([longitude, latitude]);
    map.setZoom(14);
  }

  window.citySelect = function (city_id) {
    if (city_id == 'all') {
      var all_shops = [];

      for (var i in shops) {
        all_shops = all_shops.concat(shops[i]);
      }

      drawShopsList(all_shops);
    } else {
      drawShopsList(shops[city_id]);
    }
  };

  $input.on('click', function () {
    citySelect($(this).data('id'));
  });
  ymaps.ready(initMap);
}

var PageUp = {
  btn: '.js-btn-page-up',
  init: function init() {
    if ($(PageUp.btn).length) {
      $(document).on('click', this.btn, this.scrollUp);
      $(window).scroll(this.showBtn);
    }
  },
  scrollUp: function scrollUp() {
    var iOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;

    if (iOS) {
      $('html, body', parent.document).animate({
        scrollTop: 0
      }, 400);
    } else {
      $('body,html').animate({
        scrollTop: 0
      }, 400);
    }
  },
  showBtn: function showBtn() {
    var btn = $(PageUp.btn);
    $(window).scrollTop() > 600 ? btn.addClass('is-shown') : btn.removeClass('is-shown');
  }
}; // const delItem = {
// 	var test = '.b-catalog-sort__choice',
// 	init: function() {
// 		$(".js-close").click(function(){
// 			$(this.test).remove();
// 		});
// 	}
// }

var delItem = {
  close: '.js-close',
  init: function init() {
    var t = this;
    $(t.close).on('click', function () {
      $(this).parent().remove();
    });
  }
};
var datePicker = {
  init: function init() {
    var $datepickerInput = $('.js-datepicker');
    $datepickerInput.datepicker({
      monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      dateFormat: 'dd.mm.yy',
      showOn: "button",
      buttonImage: $datepickerInput.data('icon'),
      buttonImageOnly: true,
      buttonText: "Select date"
    });
  }
};
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
var clearInput = {
  btn: '.js-clear-input',
  init: function init() {
    var t = this;
    $(t.btn).on('click', function () {
      $(this).parent().siblings('input').val('');
    });
  }
};
var tableOrderControl = {
  allInput: '.js-order-control-input',
  delItemsBtn: '.b-order-step-controls__link',
  orderInputs: '.js-order-input',
  orderItems: '.js-basket',
  init: function init() {
    var t = this;
    $(t.allInput).on('input', function () {
      console.log(1);

      if ($(this).is(':checked')) {
        $(t.orderInputs).attr('checked', true);
        console.log(1);
      } else {
        $(t.orderInputs).attr('checked', false);
        console.log(0);
      }
    });
    $(t.delItemsBtn).on('click', function (e) {
      e.preventDefault();
      $(t.orderInputs).each(function () {
        if ($(this).is(':checked')) {
          $(this).closest('.js-basket').remove();
        }
      });
    });
  }
};
$(function () {
  tableOrderControl.init();
  clearInput.init();
  bHeader.init(); // header scroll-menu / mobile-menu

  datePicker.init(); //datapicker
  //-datePickerOrder.init(); //datePickerOrder

  delItem.init();
  gCarousel.init(); // main page carousel

  gBrands.init(); // main page brands

  gProduct.init(); // main page bestseller

  gSlider.init(); // product page slider

  gProductProperties.init(); // product page properties list

  fieldSelect.init(); //field select

  fieldSuggest.init(); //field suggest

  catalogFilter.init(); //catalog filter / filter search / price validation

  gStar.init(); // element stars

  gTabs.init(); // element tabs

  gLoginZone.init(); // element auth menu

  FormVal.init(); // validation (popup reg)

  Upblock.init(); // popups

  gCounter.init(); // basket price counter

  gDelivery.init(); // order delivery changer

  gProfile.init(); // profile items

  jsSocial.init(); // about page instagram

  gSteps.init();
  PageUp.init(); // catalog page to start
});

window.onload = function () {
  // const val = 'done';
  // console.log(val);
  shopMap();
}; //CATALOG-----
// $(function() {
//     $(".catalog-menu__list__item").click(function() {
//         $(".catalog-menu__list__item").removeClass("active");
//         $(this).toggleClass("active");
//     })
// });
// $( ".catalog-menu__list__item a" ).on( "click", function(e) {
// 	e.preventDefault()
// 	$( this ).parent().toggleClass( "active" );
// });
// $(".b-about-page__offer__box").on( "click", function() {
// 	$( this ).children().toggleClass( "active" );
// });