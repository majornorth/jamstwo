var points = document.getElementsByClassName('point');

var animatePoints = function(i) {
    (function revealPoint() {
        points[i].style.opacity = 1;
        points[i].style.transform = "scaleX(1) translateY(0)";
        points[i].style.msTransform = "scaleX(1) translateY(0)";
        points[i].style.WebkitTransform = "scaleX(1) translateY(0)";
    }());
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
