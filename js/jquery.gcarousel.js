/*
 * Title: gCarousel plugin
 * Author: Scott Gledhill
 * URL: gleddy.com
 * Description: Provides a method for creating a simple carousel with thumbnail navigation.
 *
 * Usage: $('#gallery').gcarousel();
 *
 * <ul id="gallery">
 *   <li><img src="image1.jpg" alt="" /></li>
 *   <li><img src="image2.jpg" alt="" /></li>
 *   <li><img src="image3.jpg" alt="" /></li>
 *   ... as many <li>'s as you want ...
 * </ul>
 * 
 *
 * options:
 * thumbSide: left, right, top, bottom
 * thumbShow: true, false
 */
 
(function($) {

    $.fn.gCarousel = function(options) {

        var options = $.extend({
            height: 300,
            width: 400,
            thumbSide: 'left',
            thumbWidth: 60,
            arrowHeight: 20,
            imageFade: 200
        }, options);
        
        var carouselCSS = {
            'height' : options.height,
            'width' : options.width
        }
        var arrowCSS = {
            'height' : options.arrowHeight,
            'width' : options.thumbWidth
        };
        var sliderCSS = {
            'height' : options.height - options.arrowHeight,
            'padding-top' : options.arrowHeight,
            'width' : '60px'
        }
        
        return this.each(function() {

            var $this = $(this); // wrapper
            var image = $this.find('li'); // large image
            
            image.css(carouselCSS);

            // generate thumbnails
            var faux = $('<div></div>').addClass('g-thumbs');
            var ul = $('<ul></ul>');
            var up = $('<a></a>').addClass('up');
            var down = $('<a></a>').addClass('down');
            
            $(this).prepend(faux);
            faux
                .prepend(ul)
                .prepend(up)
                .prepend(down);
            
            var textToInsert = [];
            var i = 0;
            $.each(image, function(count, item) {
                textToInsert[i++] = '<li><a>';
                textToInsert[i++] = item.innerHTML;
                textToInsert[i++] = '</a></li>';
            });
            ul.append(textToInsert.join(''));
            faux.css(sliderCSS);

            $('.g-thumbs img').css('width', options.thumbWidth);
            $(this).addClass(options.thumbSide);
            
            // animate thumbnails
            $('div.g-thumbs a.up, div.g-thumbs a.down').css(arrowCSS).bind('click', function(event) {
                
                var direction = $(this).attr('class');
                var increment = $('.g-thumbs li').outerHeight(true);
                var slider = $('.g-thumbs ul');
                var firstKid = $('.g-thumbs li:first-child');
                var lastKid = $('.g-thumbs li:last-child');
                var curPos = parseInt(slider.css('top'));
                
                // rewrite, append <li> then animate the cell height into the frame
                if (direction == 'up') {
                    slider.animate({
                        top: curPos - increment
                    }, 250, function() {
                        var kid = firstKid.detach();
                        slider.append(kid);
                        slider.css('top', options.arrowHeight);
                    });
                } else {
                    slider.animate({
                        top: curPos + increment
                    }, 250, function() {
                        var kid = lastKid.detach();
                        slider.prepend(kid);
                        slider.css('top', options.arrowHeight);
                    });
                }         
            });

            // onclick display large image
            $('.g-thumbs li').bind('click', function() {
                var index = $('.g-thumbs li').index(this);
                image.css('display', 'none');
                image.eq(index).fadeIn(options.imageFade).css('display', 'block');
                // fade in for new image...
            });

        }); 
    };  
})(jQuery);










