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
            arrowHeight: 20
        }, options);
        
        var defaultCSS = {
            'height' : options.height,
            'width' : options.width
        }
        
        var arrowCSS = {
            'height' : options.arrowHeight,
            'width' : options.thumbWidth
        };
        
        return this.each(function() {

            var $this = $(this);
            var kids = $this.find('li');

            
            kids.css(defaultCSS);

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
            $.each(kids, function(count, item) {
                textToInsert[i++] = '<li><a>';
                textToInsert[i++] = item.innerHTML;
                textToInsert[i++] = '</a></li>';
            });
            ul.append(textToInsert.join(''));

            // thumbnail slider
            faux.css('height', options.height - options.arrowHeight);
            faux.css('padding-top', options.arrowHeight);
            
            $('div.g-thumbs > a').css(arrowCSS).bind('click', function(event) {
                alert( $(this).attr('class'));
                // start figure out animation here...
                // how much to move? (based on height + margin of image)
                // width direction (based on class?)
            });
            
            // thumbnail styles
            $('.g-thumbs img').css('width', options.thumbWidth);
            $(this).addClass(options.thumbSide);

            // display large images onclick
            $('.g-thumbs li').bind('click', function() {
                var index = $('.g-thumbs li').index(this);
                kids.css('display', 'none');
                kids.eq(index).css('display', 'block');
                // fade in for new image...
            });

        }); 
    };  
})(jQuery);










