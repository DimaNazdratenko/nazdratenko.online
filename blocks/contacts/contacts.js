$(function () {
    let title = $(".contacts_title"),
        item_link = $(".contacts_item_link"),
        item_text1 = $(".contacts_item_text1"),
        item_text2 = $(".contacts_item_text2");


    title.css("visibility", "visible")
        .animateCss("tada");

    setTimeout(function () {
        item_link.css("visibility", "visible")
            .animateCss("rollIn");

        item_text1.css("visibility", "visible")
            .animateCss("fadeInRight", animateDetail);
    }, 1000);

    function animateDetail() {
        item_text2.css("visibility", "visible")
            .animateCss("fadeInDown");
    }
});

