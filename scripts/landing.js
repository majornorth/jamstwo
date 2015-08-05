var points = document.getElementsByClassName('point');

function revealPoint() {
    $(this).css({
        opacity: 1,
        transform: 'scaleX(1) translateY(0)'
    });
};


function reavealPoints() {
    $.each($('.point'), revealPoint);
};

var animatePoints = function() {
    reavealPoints();
};

$(window).load(function() {

    if ($(window).height() > 950) {
        animatePoints();
    }

    $(window).scroll(function(event) {
        if ($(window).scrollTop() >= 500) {
            animatePoints();
        }
    });

});





