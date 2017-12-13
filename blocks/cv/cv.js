$.fn.extend({
    animateCss: function (animationName, callback) {
        debugger;
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

$(function () {
    let name = $(".cv_name"),
        separatorOdd = $(".cv_separator:odd"),
        separatorEven = $(".cv_separator:even"),
        text = $(".cv_text");

    name.css("visibility", "visible")
        .animateCss("tada");

    setTimeout(function () {
        separatorOdd.css("visibility", "visible")
            .animateCss("rollIn");
        separatorEven.css("visibility", "visible")
            .animateCss("rotateInUpRight");
        text.css("visibility", "visible")
            .animateCss("flip");
    }, 1000);
});
