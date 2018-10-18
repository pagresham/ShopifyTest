(function($) {
	$.fn.extend({
		
		paginate: function(options) {
			var settings = $.extend({
				url: '', // next page URL
				nextSelector: '.pagination [rel=next]',
				paginateSelector: '.pagination',
				itemSelector: '.paginated > div',
				loadingSelector: '#loading',
				alertSelector: 'div[role=alert]', // Displayed when no items found
				scrollOffset: 800, // Offset for edge detection on scren
				autoFill: true, // Automatically fill page with 
				empty: false // remove existing items from container
			}, options);

			var $container = $(this),
				$loading = $(settings.loadingSelector),
				$next = $(settings.nextSelector),
				url = settings.url;

			// Auto-detect next URL
			if( !url.length ) {
				url = $next.attr('href');
			}

			if( url.length && !$loading.is(':visible') ) {
				$.ajax({
					type: 'GET',
					url: url,
					beforeSend: function() {

						if(settings.empty) {
							$(settings.itemSelector).remove()
						}
						$(settings.alertSelector).remove();
						$(settings.paginateSelector).hide();
						$loading.show();
					},
					success: function(data) {
						var items = $(data).find( settings.itemSelector );

						// Hide loading indicator
						$loading.hide();

						if(items.length) {

							if($(settings.itemSelector).length) {
								items.insertAfter( $( settings.itemSelector ).last() );
							} else {
								items.prependTo($container);
							}

							// Update nextpage URL
							if(settings.nextSelector.length) {
								nextPage = $(data).find(settings.nextSelector).last().attr('href');
								
								if(typeof nextPage !== "undefined" && nextPage.length) {
									$(settings.nextSelector).attr('href', nextPage).show();

									// Autofill to bottom of screen
									if(settings.autoFill && $container.isOnScreen({ edge: 'bottom', offset: settings.scrollOffset }) ) {
										$container.paginate($.extend(settings, {url: nextPage, empty: false}));
									}
								} else {
									$(settings.nextSelector).attr('href','').addClass('disabled').prop('disabled', true);
									$(settings.paginateSelector).hide();
								}
							}

						} else {
							$container.append( $(data).find( settings.alertSelector ) );
							$(settings.paginateSelector).hide();
						}
						
						
					},
				dataType: "html"
				});
			}
			
		},

		// Determine if edge of object is on screen
		isOnScreen: function(options) {
			var settings = $.extend({
				edge: 'bottom',
				offset: 0
			}, options);

			var $this = $(this);

			if( settings.edge == 'bottom' ) {
				return ($this.offset().top + $this.height() - settings.offset) < ($(document).scrollTop() + $(window).height());
			}

			// Unsupported edge test
			return -1;
		}
	});

})(jQuery);