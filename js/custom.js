var cs = jQuery.noConflict();

cs(document).ready(function(){

    var 
        slider = cs("#blv-slider"),
        slider_text = cs("#blv-slider-text"),
        scrollDuration = 500,
        timeout = 3000,
        easingText = "easeOutQuad",
        easingSlide = "easeOutQuad";

    slider_text.carouFredSel({
        responsive: false,
        circular: true,
        infinite: false,
        direction:"up",
        align:"center",
        auto: {
            fx: "down",
            play: false,
            timeoutDuration: timeout,
            easing: easingText,
            queue:false
        },
        width:360,
        height:400,
        items: {
            visible: 1,
            minimum: 1,
            width:360,
            height:400
        },
        scroll: {
            fx: "directscroll",
            duration: scrollDuration,
            queue : false,
            pauseOnHover: "resume",
            easing: easingText
        }
    },{wrapper:{classname:"blv-slider-text-container"}, debug:false});

    slider.carouFredSel({
        responsive: false,
        circular: true,
        infinite: false,
        direction:"left",
        align:"center",
        auto: {
            fx: "cover",
            timeoutDuration: timeout,
            easing: easingSlide,
            queue:false
        },
        width:600,
        height:400,
        items: {
            visible: 1,
            minimum: 1,
            width:600,
            height:400
        },
        scroll: {
            fx: "directscroll",
            duration: scrollDuration,
            queue : false,
            pauseOnHover: "resume",
            easing: easingSlide,
            onBefore: function( data ) {
                
                var index = cs(this).triggerHandler( 'currentPosition' );

                if ( index == 0 ) {
                    index = cs(this).children().length;
                }
                slider_text.trigger("finish").trigger('slideTo', [ index, 'next' ]);
            }
        },
        pagination: {
            queue: false,
            container: cs("#blv-slider-pagination")
        },

    },{wrapper:{classname:"blv-slider-container"}, debug:false});

    cs('#blv-slider-pagination a')
        .unbind('click')
        .bind('click', function(e) {
            e.preventDefault();
            slider.trigger("finish").trigger( 'slideTo', [cs(this).index(), true, 'next'] );
        }
    );

    cs('#myTab a').click(function (e) {
         e.preventDefault();
         cs(this).tab('show');
         rePositionTab();
    });

    function rePositionTab(){
        var 
            tabBaseContainer = cs("#COMPANYNAME-body-inner-wrp"),
            right = (cs(window).outerWidth() - 960)/2;

        tabBaseContainer.css({"right":right+"px"});

    }

    cs(window).resize(function() {
        rePositionTab();
    });

    cs(window).load(function(){
        rePositionTab();
        cs(function () {
            cs('#myTab a').last().trigger('click').end().first().trigger('click');
        })
    });

});