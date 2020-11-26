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

    // scroll al click sul triangolo
    $(".hh_scroll_down").click(function () {
        $('html, body').animate({
            scrollTop: $("#hh_scroll_to").offset().top - 100
        }, 1000);
    });

    // swiper recensioni
    if (!(window.location.href.indexOf("privacy") > 0)) {
        var swiper = new Swiper('.swiper-container', {
            loop: true,
            disableOnInteraction: true,
            spaceBetween: 80,
            autoHeight: true,
            autoplay: {
                delay: 5000,
            },

            pagination: {
                el: '.swiper-pagination',
                bulletActiveClass: "hh_swiper_bullets"
            },
        })
        $('.swiper-slide').on('mouseover', function () {
            swiper.autoplay.stop();
        });
        $('.swiper-slide').on('mouseout', function () {
            swiper.autoplay.start();
        });
    }

    //animazione collapse faqs
    let collapse_opened = true
    $(".hh_collapse_card").click(function (e) {
        e.stopPropagation()
        $(this).toggleClass("hh_border_purple");
        let id_num = $(this).attr("id").slice(-1)
        $("#hh_faq_icon" + id_num).toggleClass("hh_faq_icon_rotate");
        $("#hh_faq_title_collapse" + id_num).toggleClass("hh_color_purple");
        $("#hh_faq_icon" + id_num).toggleClass("hh_color_purple");
        if (collapse_opened) {
            $('#hh_faq_collapse' + id_num).collapse("show")
            collapse_opened = false
        } else {
            $('#hh_faq_collapse' + id_num).collapse("hide")
            collapse_opened = true
        }
    });
})