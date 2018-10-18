$(document).ready(function() {
  $(".extra-text>a").on('click',function(e) {
     e.preventDefault()
     $(".readmore").show();
     $(".extra-text").hide();
    $(".reduce-text").show();
  });
  $(".reduce-text>a").on('click',function(e) {
    e.preventDefault()
    $(".readmore").hide();
    $(".extra-text").show();
    $(".reduce-text").hide();
  });
}); 