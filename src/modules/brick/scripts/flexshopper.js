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

    /* Shop by brand Slider */
    /*$('#shop-by-brand').owlCarousel({
      nav: true,
      items: 5,
      autoplay: false,
      dots: false,
      pagination: false,
      margin: 10,
      responsive: {
        0: {
          items: 2
        },
        480: {
          items: 2
        },
        641: {
          items: 3
        },
        768: {
          items: 4
        },
        980: {
          items: 5
        },
        1201: {
          items: 5
        },
        1451: {
          items: 5
        }
      },
      navText: ["<i class='icon-chevron-left icon-white'><</i>", "<i class='icon-chevron-right icon-white'>></i>"]
    });*/
  });

  /*reloadPatternCarousel();

  $(document).on('amscroll_refresh', function () {
    reloadPatternCarousel();
  });*/

  /*function reloadPatternCarousel() {
    /!* Category by pattern Slider *!/
    $('#cat-by-pattern').owlCarousel({
      nav: true,
      items: 5,
      autoplay: false,
      dots: false,
      pagination: false,
      margin: 20,
      responsive: {
        0: {
          items: 2
        },
        480: {
          items: 2
        },
        641: {
          items: 3
        },
        768: {
          items: 4
        },
        980: {
          items: 5
        },
        1201: {
          items: 5
        },
        1451: {
          items: 5
        }
      },
      navText: ["<i class='icon-chevron-left icon-white'><</i>", "<i class='icon-chevron-right icon-white'>></i>"]
    });

    if ($(window).width() < 980) {
      $('.sidebar .block .mobile_togglemenu').remove();
      $('.sidebar .block .block-title').append("<a class='mobile_togglemenu'>&nbsp;</a>");
      $('.sidebar .block .block-title').addClass('toggle');
      $('.sidebar .block .mobile_togglemenu').on('click', function () {
        $(this).parent().toggleClass('active').parent().find('.block-content').slideToggle('slow');
        $(this).parents('.block.filter').toggleClass('activeFilter');
      });
    }
  }*/

 /* mediaCheck({
    media: '(min-width: 768px)',
    // Switch to Desktop Version
    entry: function () {
      var headerLeft = $('.header-menu-outer .header-menu .header-left').detach();
      $('.tm_header').append(headerLeft);
      var headerCenter = $('.header-menu-outer .header-center').detach();
      $('.tm_header').append(headerCenter);
      var headerContact = $('.header-menu-outer .header-menu .header-account-mincart-wrapper .tel').detach();
      $('.tm-header-service .contactus').append(headerContact);
    },
    // Switch to Mobile Version
    exit: function () {
      var headerLeft = $('.tm_header .header-left').detach();
      $('.header-menu-outer .header-menu .header-nav').after(headerLeft);
      var headerCenter = $('.tm_header .header-center').detach();
      $('.header-menu-outer .header-menu').after(headerCenter);
      var headerContact = $('.tm-header-service .contactus .tel').detach();
      $('.header-menu-outer .header-menu .header-account-mincart-wrapper').append(headerContact);
    }
  });*/

}