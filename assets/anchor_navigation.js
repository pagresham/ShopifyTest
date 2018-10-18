
//jQuery(document).ready(function($){
//	var mainHeader = $('.site-header'),
//		headerHeight = mainHeader.height();
  
  //  $("a").click(function(e){
    //    if( $(this).attr("href").substr(0, 1) == "#" ){
      //      var currentthis = this;
    //        setTimeout(function(){
//                window.scrollTo( 0 , ($($(currentthis).attr("href")).offset().top) - ($(".site-header").outerHeight(true)));
//            }, 1000);
//        }
//    });
//});





jQuery(document).ready(function($){
  

	var mainHeader = $('.navbar-utility'),
		mainheaderHeight = mainHeader.height();
    var subHeader = $('.navbar-toggleable'),
		subheaderHeight = subHeader.height();

    headerHeight = mainheaderHeight + subheaderHeight + 20;
  
    function parseURLParams(url) {
      var queryStart = url.indexOf("#") + 1,
          query = url.slice(queryStart);

      if (query === url || query === "") return;
      
      return query;
    }
  
  	var url_sections = ["awards","reviews","specs","construction","graphic"];
	var urlParams = parseURLParams(window.location.href);

    if ( $.inArray(urlParams,url_sections) > -1 ) {
      window.onload = function() {
        setTimeout (function () {
          scrollTo(0,($("#"+urlParams).offset().top - headerHeight));
        }, 100); //100ms for example
      }
    }

    $(".specscroll").click(function(e){
      	jump("#specs");
    });
    
    $(".awardscroll").click(function(e){
      	jump("#awards");
    });
    
    $(".reviewscroll").click(function(e){
      	jump("#reviews");
    });


    function jump(h) {
        if ($(h).length) {
            var animation = $('#stamped-main-widget').attr('data-animation');

            if (animation == 'false') { } else {
                var scrollContainer = $('html, body');
                var curElem = $(h);
                scrollContainer.animate({
                    scrollTop: curElem.offset().top - headerHeight 
                }, (animation || 2000));
            }
        }
    }
});