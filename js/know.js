$(document).ready(function () {
    var title = $('.panel-heading'),
        content = $('.panel-body'),
        isClosed = false;

    title.click(function () {
        if (isClosed == true) {
            $(this).next().removeClass('hidden');
            isClosed = false;
        } else {
            $(this).next().addClass('hidden');
            isClosed = true;
        }
    });
});