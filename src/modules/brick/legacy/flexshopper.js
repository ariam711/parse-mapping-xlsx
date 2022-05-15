import $ from 'jquery';

export const flexshopper = () => {
  /** All close on document click **/
  $(document).on('click', function (event) {
    /** Top Menu Close **/
    var $triggerMenu = $('.header-menu-wrapper');
    if ($triggerMenu !== event.target && !$triggerMenu.has(event.target).length) {
      $('.header-menu-wrapper').find('.menu-content-wrap').slideUp('');
      $('.menu-item .menu-title').removeClass('active');
    }

    /** PDP color option Close **/
    var $selectColorOptions = $('.color_option_wrapper');
    if ($selectColorOptions !== event.target && !$selectColorOptions.has(event.target).length) {
      $('.color_option_wrapper #select_color_options').hide();
      $('.color_option_wrapper #color_option_heading').removeClass('active');
      $('.color_option_wrapper #select_color_options').removeClass('open');
    }
  });

  $(document).ready(function () {
    /** Top Menu **/
    $('.menu-item .menu-title').bind('click', function (event) {
      event.stopPropagation();
      $('.menu-item').not($(this).parents('.menu-item')).find('.menu-content-wrap').slideUp('fast');
      $(this).parents('.menu-item').find('.menu-content-wrap').slideToggle('fast');
      $('.menu-item').not($(this).parents('.menu-item')).find('.menu-title').removeClass('active');
      $(this).toggleClass('active');
    });

    $('.menu-item .menu-content-wrap .menu-content-item-header').bind('click', function (event) {
      event.stopPropagation();
      $('.menu-content-item').not($(this).parents('.menu-content-item')).find('.submenu-item').removeClass('open');
      $(this).parents('.menu-content-item').find('.submenu-item').toggleClass('open');
      $('.menu-content-item')
        .not($(this).parents('.menu-content-item'))
        .find('.menu-content-item-header')
        .removeClass('active');
      $(this).toggleClass('active');
    });

    /** PDP color option open **/
    $('.color_option_wrapper #color_option_heading').bind('click', function () {
      $(this).toggleClass('active');
      $(this).find('.select-color-options').toggleClass('open');
      $(this).find('.select-color-options').toggle();
    });

    /** Go to previous page */
    $('.goback').click(function (event) {
      event.stopPropagation();
      window.history.back();
    });
  });
};
