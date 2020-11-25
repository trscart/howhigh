document.addEventListener("DOMContentLoaded", function () {
    console.log("Hello Developer")

    $("form").submit(function () {
        fbq('track', 'CompleteRegistration');
    })

    // animazione navbar scroll
    $(window).scroll(function () {
        if ($(window).scrollTop() > 0) {
            $('.hh_navbar').addClass("hh_navbar_scrolled")
        } else {
            $('.hh_navbar').removeClass("hh_navbar_scrolled")
        }
    });

    // animazione banner
    let not_scrolled = true
    $(window).scroll(function () {
        if ($(window).scrollTop() > 800 && not_scrolled) {
            $('.hh_banner').css("bottom", "0")
            not_scrolled = false
        }
    });
    $("#hh_close_banner").click(function () {
        $('.hh_banner').css("bottom", "-200px")
    })
})