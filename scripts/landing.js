var points = document.getElementsByClassName('point');

function revealPoint(i) {
    points[i].style.opacity = 1;
    points[i].style.transform = "scaleX(1) translateY(0)";
    points[i].style.msTransform = "scaleX(1) translateY(0)";
    points[i].style.WebkitTransform = "scaleX(1) translateY(0)";
};

function reavealPoints() {
    for (var i = 0; i < points.length; i++) {
        revealPoint(i);
    }
};

var animatePoints = function(i) {
    reavealPoints();
};

window.onload = function() {

    if (window.innerHeight > 950) {
        forEach(points.length, animatePoints);
    }

    window.addEventListener('scroll', function(event) {
        if (points[0].getBoundingClientRect().top <= 700) {
            forEach(points.length, animatePoints);
        }
    });

};





