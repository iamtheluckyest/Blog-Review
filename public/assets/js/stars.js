
/*$.fn.stars = function () {
    return */
    $(".rating[data-active='true']").each(function () {
        var rating = parseFloat($(this).attr("data-rating"));
        rating = (Math.round(rating * 2) / 2).toFixed(1);
        $(this).find("input[name='static-rating'][value='" + rating + "']").attr("checked", "checked");
    });
// };

/* $(function () {
    $('.rating').stars();
});*/
    