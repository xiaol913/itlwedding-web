$(document).ready(function () {
   var st_bar = $('.st-bar');

    st_bar.click(function () {
        console.log(this.id);
        switch(this.id){
            case('hotel'):
                $('#hotel').addClass('active');
                $('#place').removeClass('active');
                $('#server').removeClass('active');
                $('#know').removeClass('active');
                wed_item_show('hotel');
                break;
            case('place'):
                $('#hotel').removeClass('active');
                $('#place').addClass('active');
                $('#server').removeClass('active');
                $('#know').removeClass('active');
                wed_item_show('place');
                break;
            case('server'):
                $('#hotel').removeClass('active');
                $('#place').removeClass('active');
                $('#server').addClass('active');
                $('#know').removeClass('active');
                wed_item_show('server');
                break;
            case('know'):
                $('#hotel').removeClass('active');
                $('#place').removeClass('active');
                $('#server').removeClass('active');
                $('#know').addClass('active');
                wed_item_show('know');
                break;
        }
   });

    function wed_item_show(item) {
        switch(item){
            case('hotel'):
                $('#hotel-info').addClass('active');
                $('#place-info').removeClass('active');
                $('#server-info').removeClass('active');
                $('#know-info').removeClass('active');
                break;
            case('place'):
                $('#hotel-info').removeClass('active');
                $('#place-info').addClass('active');
                $('#server-info').removeClass('active');
                $('#know-info').removeClass('active');
                break;
            case('server'):
                $('#hotel-info').removeClass('active');
                $('#place-info').removeClass('active');
                $('#server-info').addClass('active');
                $('#know-info').removeClass('active');
                break;
            case('know'):
                $('#hotel-info').removeClass('active');
                $('#place-info').removeClass('active');
                $('#server-info').removeClass('active');
                $('#know-info').addClass('active');
                break;
        }
    }
});