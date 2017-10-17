$(document).ready(function () {
    var trigger = $('.hamburger'),
        overlay = $('.overlay'),
        stbar1 = $('.st-bar-1'),
        stbar2 = $('.st-bar-2'),
        stbar3 = $('.st-bar-3'),
        stbar4 = $('.st-bar-4'),
        stscoll = $('.st-scroll');
        isClosed = false;

    trigger.click(function () {
        hamburger_cross();
    });

    stbar1.click(function () {
        stbar2.removeClass('active');
        stbar3.removeClass('active');
        stbar4.removeClass('active');
        stbar1.addClass('active');
        stscoll.removeClass('scroll-2');
        stscoll.removeClass('scroll-3');
        stscoll.removeClass('scroll-4');
        stscoll.addClass('scroll-1');
    });
    stbar2.click(function () {
        stbar1.removeClass('active');
        stbar3.removeClass('active');
        stbar4.removeClass('active');
        stbar2.addClass('active');
        stscoll.removeClass('scroll-1');
        stscoll.removeClass('scroll-3');
        stscoll.removeClass('scroll-4');
        stscoll.addClass('scroll-2');
    });
    stbar3.click(function () {
        stbar2.removeClass('active');
        stbar1.removeClass('active');
        stbar4.removeClass('active');
        stbar3.addClass('active');
        stscoll.removeClass('scroll-2');
        stscoll.removeClass('scroll-1');
        stscoll.removeClass('scroll-4');
        stscoll.addClass('scroll-3');
    });
    stbar4.click(function () {
        stbar2.removeClass('active');
        stbar3.removeClass('active');
        stbar1.removeClass('active');
        stbar4.addClass('active');
        stscoll.removeClass('scroll-2');
        stscoll.removeClass('scroll-3');
        stscoll.removeClass('scroll-1');
        stscoll.addClass('scroll-4');
    });

    function hamburger_cross() {

        if (isClosed == true) {
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
        } else {
            overlay.show();
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            isClosed = true;
        }
    }

    $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
    });
});
