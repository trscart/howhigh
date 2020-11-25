document.addEventListener("DOMContentLoaded", function () {
    console.log("Hello Developer")

    $("form").submit(function(){
        fbq('track', 'CompleteRegistration');
    })

    // animazione navbar scroll
    $(window).scroll(function () {
        if ($(window).scrollTop() > 0) { // nav-item change on scroll
            $('.hh_navbar').addClass("hh_navbar_scrolled")
        } else {
            $('.hh_navbar').removeClass("hh_navbar_scrolled")
        }
    });
})