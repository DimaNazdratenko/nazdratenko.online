$(function () {
    let name = $(".cv_name"),
        separatorOdd = $(".cv_separator:odd"),
        separatorEven = $(".cv_separator:even"),
        textOdd = $(".cv_text:odd"),
        textEven = $(".cv_text:even");

    name.css("visibility", "visible")
        .animateCss("tada");

    setTimeout(function () {
        separatorOdd.css("visibility", "visible")
            .animateCss("rollIn", removeDisableState);
        separatorEven.css("visibility", "visible")
            .animateCss("rotateInUpRight");
        textOdd.css("visibility", "visible")
            .animateCss("fadeInLeftBig");
        textEven.css("visibility", "visible")
            .animateCss("fadeInRightBig");
    }, 1000);
});

function removeDisableState() {
    $(".btn").removeClass("disabled")
}

$.fn.extend({
    animateCss: function (animationName, callback) {
        let animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);
            if (callback) {
                callback();
            }
        });
        return this;
    }
});
