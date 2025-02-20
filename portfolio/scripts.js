$(document).ready(function() {
    $('#main-img').mouseover(function() {
        $(this).css('cursor', 'pointer');
    });

    $('#main-img').mouseout(function() {
        $(this).css('cursor', 'default');
    })
})