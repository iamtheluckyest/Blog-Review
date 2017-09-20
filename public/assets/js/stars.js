// $.fn.stars = function () {
//     return $(this).each(function () {
//         // Get the value
//         var rating = parseFloat($(this).attr("data-rating"));
//         // Make sure that the value is in 0 - 5 range, multiply to get width
//         val = Math.round(val * 2) / 2;
//         var size = Math.max(0, (Math.min(5, val))) * 16;
//         // Create stars holder
//         var $span = $('<span />').width(size);
//         // Replace the numerical value with stars
//         $(this).html($span);
//     });
// }
// $(function () {
//     $('.rating').stars();
// });



// <fieldset class="rating" data-rating="{{blog.cumulative_rating}}">
//     <input type="radio" id="star5" name="rating" value="5.0" /><label class="full" for="star5"
//         title="Awesome - 5 stars"></label>
//     <input type="radio" id="star4half" name="rating" value="4.5" /><label class="half"
//         for="star4half" title="Pretty good - 4.5 stars"></label>
//     <input type="radio" id="star4" name="rating" value="4.0" /><label class="full" for="star4"
//         title="Pretty good - 4 stars"></label>
//     <input type="radio" id="star3half" name="rating" value="3.5" /><label class="half"
//         for="star3half" title="Meh - 3.5 stars"></label>
//     <input type="radio" id="star3" name="rating" value="3.0" /><label class="full" for="star3"
//         title="Meh - 3 stars"></label>
//     <input type="radio" id="star2half" name="rating" value="2.5" /><label class="half"
//         for="star2half" title="Kinda bad - 2.5 stars"></label>
//     <input type="radio" id="star2" name="rating" value="2.0" /><label class="full" for="star2"
//         title="Bad - 2 stars"></label>
//     <input type="radio" id="star1half" name="rating" value="1.5" /><label class="half"
//         for="star1half" title="Bad - 1.5 stars"></label>
//     <input type="radio" id="star1" name="rating" value="1.0" /><label class="full" for="star1"
//         title="Sucks big time - 1 star"></label>
//     <input type="radio" id="starhalf" name="rating" value="0.5" /><label class="half" for="starhalf"
//         title="Sucks big time - 0.5 stars"></label>
// </fieldset>