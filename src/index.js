document.addEventListener("DOMContentLoaded", function () {
    console.log("Hello Developer")

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
    if (!(window.location.href.indexOf("privacy") > 0) && !(window.location.href.indexOf("guida") > 0)) {
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

        // ultimi articoli blog
        $.ajax({
            url: "https://www.howhigh.it/blog/wp-json/wp/v2/posts",
            type: 'GET',
            contentType: 'application/json',
            success: function (res) {
                console.log(res)
                res.forEach(function (el, i) {
                    if (i < 3) {
                        let media_url
                        $.ajax({
                            url: "https://www.howhigh.it/blog/wp-json/wp/v2/media/" + el.featured_media,
                            type: 'GET',
                            contentType: 'application/json',
                            success: function (res) {
                                console.log(res)
                                media_url = res.source_url
                                $("#hh_blog_section").append(`
                                    <div class="col-md-4">
                                        <div class="hh_blog_card card text-center border-0 shadow mt-5 mt-md-0">
                                            <div class="card-body">
                                                <img src="` + media_url + `" alt="blog image" style="width: 100%">
                                                <p class="hh_h2">` + el.title.rendered + `</p>
                                                <a class="hh_p hh_color_purple" href="` + el.link + `">Leggi di più</a>
                                            </div>
                                        </div>
                                    </div>
                                `)
                            },
                            error: function (err) {
                                console.log(err)
                            }
                        })
                    }
                })

            },
            error: function (err) {
                console.log(err)
            }
        })
    }

    //animazione collapse faqs
    let collapsed = false
    let id_clicked
    $(".hh_collapse_card").click(function (e) {
        e.stopPropagation()
        if (collapsed && id_clicked == $(this).attr("id").slice(-1)) {
            $(this).removeClass("hh_border_purple");
            $("#hh_faq_icon" + id_clicked).removeClass("hh_faq_icon_rotate");
            $("#hh_faq_title_collapse" + id_clicked).removeClass("hh_color_purple");
            $("#hh_faq_icon" + id_clicked).removeClass("hh_color_purple");
            $('#hh_faq_collapse' + id_clicked).collapse("toggle")
            collapsed = false
        } else {
            collapsed = true
            $(".hh_collapse_card").removeClass("hh_border_purple");
            $(this).addClass("hh_border_purple");
            let id_num = $(this).attr("id").slice(-1)
            id_clicked = id_num
            $(".hh_faq_icon").removeClass("hh_faq_icon_rotate");
            $("#hh_faq_icon" + id_num).addClass("hh_faq_icon_rotate");
            $(".hh_faq_title").removeClass("hh_color_purple");
            $("#hh_faq_title_collapse" + id_num).addClass("hh_color_purple");
            $(".hh_faq_icon").removeClass("hh_color_purple");
            $("#hh_faq_icon" + id_num).addClass("hh_color_purple");
            $('#hh_faq_collapse' + id_num).collapse("toggle")
        }
    });

    $(".hh_input").focus(function () {
        $("label[for=" + $(this).attr("id") + "]").addClass("hh_color_purple")
    })
    $(".hh_input").focusout(function () {
        $("label[for=" + $(this).attr("id") + "]").removeClass("hh_color_purple")
    })

    // al submit della form di contatto, evento facebook
    $("#mc-embedded-subscribe-form").submit(function (e) {
        fbq('track', 'Purchase', { currency: "EUR", value: 0.00 });
    })

    // al submit della form di contatto, evento facebook
    /* window.addEventListener("klaviyoForms", function (e) {
        if (e.detail.type == 'submit' || e.detail.type == 'redirectedToUrl') {
            fbq('track', 'Purchase', { currency: "EUR", value: 0.00 });
        }
    }); */
})