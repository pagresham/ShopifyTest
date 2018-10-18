
var StampedFn = (function (window, document) {
    var DEFAULT_ENDPOINT = '//stamped.io/api',
        SECURE_ENDPOINT = 'https://stamped.io/api',
        script_tags = document.getElementsByTagName('script'),
        origin = window.location.hostname,
        script,
        $, params, initOptions;
    var direction;
    var position = 0;
    var indexSlide = 0;
    var photosUploadArr = [];
    var isLoading = false;
    var debug = false;
    var optApiKey, opt

    String.prototype.format = function () {
        var formatted = this;
        for (var i = 0; i < arguments.length; i++) {
            var regexp = new RegExp('\\{' + i + '\\}', 'gi');
            formatted = formatted.replace(regexp, arguments[i]);
        }
        return formatted;
    };
    // elements a
    var stampedMainWidget, stampedBadgeElements = [];

    function _init() {
        var location = window.location,
            i;
        $ = window.jQuery;
        if (/msie/.test(window.navigator.userAgent.toLowerCase())) {
            $.support.cors = true;
            i = location.hash.indexOf('?');
            params = (i !== -1) ? location.hash.substring(i) : '';
        } else {
            params = location.search;
        }
        //reward = get_param('reward', params);
        //is_referral = get_param('referral', params);
        // load required js / css files
        //$('head').append('<link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');
        // lightbox
        $('head').append('<style>/*** Featherlight - ultra slim jQuery lightbox* Version 1.5.0 - http://noelboss.github.io/featherlight/** Copyright 2016, NoÃ«l Raoul Bossart (http://www.noelboss.com)* MIT Licensed.**/ @media all{.featherlight{display:none;position:fixed;top:0;right:0;bottom:0;left:0;z-index:2147483647;text-align:center;white-space:nowrap;cursor:pointer;background:#333;background:rgba(0,0,0,0)}.featherlight:last-of-type{background:rgba(0,0,0,.8)}.featherlight:before{content:"";display:inline-block;height:100%;vertical-align:middle;margin-right:-.25em}.featherlight .featherlight-content{position:relative;text-align:left;vertical-align:middle;display:inline-block;overflow:auto;padding:25px 25px 0;border-bottom:25px solid transparent;margin-left:5%;margin-right:5%;max-height:95%;background:#fff;cursor:auto;white-space:normal}.featherlight .featherlight-inner{display:block}.featherlight .featherlight-close-icon{position:absolute;z-index:9999;top:0;right:0;line-height:25px;width:25px;cursor:pointer;text-align:center;font-family:Arial,sans-serif;background:#fff;background:rgba(255,255,255,.3);color:#000}.featherlight .featherlight-image{width:100%}.featherlight-iframe .featherlight-content{border-bottom:0;padding:0}.featherlight iframe{border:0}.featherlight *{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}} @media only screen and (max-width:1024px){.featherlight .featherlight-content{margin-left:10px;margin-right:10px;max-height:98%;padding:10px 10px 0;border-bottom:10px solid transparent}} @media all{.featherlight .featherlight-content{padding:0;border:none;min-width:inherit}.featherlight .featherlight-image{max-width:100%;border:20px solid #fff; max-width: 100%;max-height: 100%;width: auto;}}@media only screen and (max-width:1024px){.featherlight .featherlight-content{padding:0;border:none}}</style>'); //  .featherlight .featherlight-image {height: 60vh !important;width: auto !important;}
        $('head').append('<style>@media all{.featherlight-next,.featherlight-previous{display:block;position:absolute;top:25px;right:25px;bottom:25px;left:80%;cursor:pointer;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background:rgba(0,0,0,0)}.featherlight-previous{left:25px;right:80%}.featherlight-next:hover,.featherlight-previous:hover{background:rgba(255,255,255,.25)}.featherlight-next span,.featherlight-previous span{display:none;position:absolute;top:50%;left:5%;width:82%;text-align:center;font-size:30px;line-height:80px;margin-top:-40px;color:#fff;font-family:arial;font-style:normal;font-weight:400}.featherlight-next span{right:5%;left:auto}.featherlight-next:hover span,.featherlight-previous:hover span{display:inline-block}.featherlight-loading .featherlight-next,.featherlight-loading .featherlight-previous{display:none}}@media only screen and (max-device-width:1024px){.featherlight-next:hover,.featherlight-previous:hover{background:0 0}.featherlight-next span,.featherlight-previous span{display:block}}@media only screen and (max-width:1024px){.featherlight-next,.featherlight-previous{top:10px;right:10px;left:85%}.featherlight-previous{left:10px;right:85%}.featherlight-next span,.featherlight-previous span{margin-top:-30px;font-size:40px}}</style>');

        !function (e) { "use strict"; function t(e, n) { if (!(this instanceof t)) { var r = new t(e, n); return r.open(), r } this.id = t.id++ , this.setup(e, n), this.chainCallbacks(t._callbackChain) } if ("undefined" == typeof e) return void ("console" in window && window.console.info("Too much lightness, Featherlight needs jQuery.")); var n = [], r = function (t) { return n = e.grep(n, function (e) { return e !== t && e.$instance.closest("body").length > 0 }) }, i = function (e, t) { var n = {}, r = new RegExp("^" + t + "([A-Z])(.*)"); for (var i in e) { var a = i.match(r); if (a) { var o = (a[1] + a[2].replace(/([A-Z])/g, "-$1")).toLowerCase(); n[o] = e[i] } } return n }, a = { keyup: "onKeyUp", resize: "onResize" }, o = function (n) { e.each(t.opened().reverse(), function () { return n.isDefaultPrevented() || !1 !== this[a[n.type]](n) ? void 0 : (n.preventDefault(), n.stopPropagation(), !1) }) }, s = function (n) { if (n !== t._globalHandlerInstalled) { t._globalHandlerInstalled = n; var r = e.map(a, function (e, n) { return n + "." + t.prototype.namespace }).join(" "); e(window)[n ? "on" : "off"](r, o) } }; t.prototype = { constructor: t, namespace: "featherlight", targetAttr: "data-featherlight", variant: null, resetCss: !1, background: null, openTrigger: "click", closeTrigger: "click", filter: null, root: "body", openSpeed: 250, closeSpeed: 250, closeOnClick: "background", closeOnEsc: !0, closeIcon: "&#10005;", loading: "", persist: !1, otherClose: null, beforeOpen: e.noop, beforeContent: e.noop, beforeClose: e.noop, afterOpen: e.noop, afterContent: e.noop, afterClose: e.noop, onKeyUp: e.noop, onResize: e.noop, type: null, contentFilters: ["jquery", "image", "html", "ajax", "iframe", "text"], setup: function (t, n) { "object" != typeof t || t instanceof e != 0 || n || (n = t, t = void 0); var r = e.extend(this, n, { target: t }), i = r.resetCss ? r.namespace + "-reset" : r.namespace, a = e(r.background || ['<div class="' + i + "-loading " + i + '">', '<div class="' + i + '-content">', '<span class="' + i + "-close-icon " + r.namespace + '-close">', r.closeIcon, "</span>", '<div class="' + r.namespace + '-inner">' + r.loading + "</div>", "</div>", "</div>"].join("")), o = "." + r.namespace + "-close" + (r.otherClose ? "," + r.otherClose : ""); return r.$instance = a.clone().addClass(r.variant), r.$instance.on(r.closeTrigger + "." + r.namespace, function (t) { var n = e(t.target); ("background" === r.closeOnClick && n.is("." + r.namespace) || "anywhere" === r.closeOnClick || n.closest(o).length) && (r.close(t), t.preventDefault()) }), this }, getContent: function () { if (this.persist !== !1 && this.$content) return this.$content; var t = this, n = this.constructor.contentFilters, r = function (e) { return t.$currentTarget && t.$currentTarget.attr(e) }, i = r(t.targetAttr), a = t.target || i || "", o = n[t.type]; if (!o && a in n && (o = n[a], a = t.target && i), a = a || r("href") || "", !o) for (var s in n) t[s] && (o = n[s], a = t[s]); if (!o) { var c = a; if (a = null, e.each(t.contentFilters, function () { return o = n[this], o.test && (a = o.test(c)), !a && o.regex && c.match && c.match(o.regex) && (a = c), !a }), !a) return "console" in window && window.console.error("Featherlight: no content filter found " + (c ? ' for "' + c + '"' : " (no target specified)")), !1 } return o.process.call(t, a) }, setContent: function (t) { var n = this; return (t.is("iframe") || e("iframe", t).length > 0) && n.$instance.addClass(n.namespace + "-iframe"), n.$instance.removeClass(n.namespace + "-loading"), n.$instance.find("." + n.namespace + "-inner").not(t).slice(1).remove().end().replaceWith(e.contains(n.$instance[0], t[0]) ? "" : t), n.$content = t.addClass(n.namespace + "-inner"), n }, open: function (t) { var r = this; if (r.$instance.hide().appendTo(r.root), !(t && t.isDefaultPrevented() || r.beforeOpen(t) === !1)) { t && t.preventDefault(); var i = r.getContent(); if (i) return n.push(r), s(!0), r.$instance.fadeIn(r.openSpeed), r.beforeContent(t), e.when(i).always(function (e) { r.setContent(e), r.afterContent(t) }).then(r.$instance.promise()).done(function () { r.afterOpen(t) }) } return r.$instance.detach(), e.Deferred().reject().promise() }, close: function (t) { var n = this, i = e.Deferred(); return n.beforeClose(t) === !1 ? i.reject() : (0 === r(n).length && s(!1), n.$instance.fadeOut(n.closeSpeed, function () { n.$instance.detach(), n.afterClose(t), i.resolve() })), i.promise() }, resize: function (e, t) { if (e && t) { this.$content.css("width", "").css("height", ""); var n = Math.max(e / (parseInt(this.$content.parent().css("width"), 10) - 1), t / (parseInt(this.$content.parent().css("height"), 10) - 1)); n > 1 && (n = t / Math.floor(t / n), this.$content.css("width", "" + e / n + "px").css("height", "" + t / n + "px")) } }, chainCallbacks: function (t) { for (var n in t) this[n] = e.proxy(t[n], this, e.proxy(this[n], this)) } }, e.extend(t, { id: 0, autoBind: "[data-featherlight]", defaults: t.prototype, contentFilters: { jquery: { regex: /^[#.]\w/, test: function (t) { return t instanceof e && t }, process: function (t) { return this.persist !== !1 ? e(t) : e(t).clone(!0) } }, image: { regex: /\.(png|jpg|jpeg|gif|tiff|bmp|svg)(\?\S*)?$/i, process: function (t) { var n = this, r = e.Deferred(), i = new Image, a = e('<img src="' + t + '" alt="" class="' + n.namespace + '-image" />'); return i.onload = function () { a.naturalWidth = i.width, a.naturalHeight = i.height, r.resolve(a) }, i.onerror = function () { r.reject(a) }, i.src = t, r.promise() } }, html: { regex: /^\s*<[\w!][^<]*>/, process: function (t) { return e(t) } }, ajax: { regex: /./, process: function (t) { var n = e.Deferred(), r = e("<div></div>").load(t, function (e, t) { "error" !== t && n.resolve(r.contents()), n.fail() }); return n.promise() } }, iframe: { process: function (t) { var n = new e.Deferred, r = e("<iframe/>").hide().attr("src", t).css(i(this, "iframe")).on("load", function () { n.resolve(r.show()) }).appendTo(this.$instance.find("." + this.namespace + "-content")); return n.promise() } }, text: { process: function (t) { return e("<div>", { text: t }) } } }, functionAttributes: ["beforeOpen", "afterOpen", "beforeContent", "afterContent", "beforeClose", "afterClose"], readElementConfig: function (t, n) { var r = this, i = new RegExp("^data-" + n + "-(.*)"), a = {}; return t && t.attributes && e.each(t.attributes, function () { var t = this.name.match(i); if (t) { var n = this.value, o = e.camelCase(t[1]); if (e.inArray(o, r.functionAttributes) >= 0) n = new Function(n); else try { n = e.parseJSON(n) } catch (s) { } a[o] = n } }), a }, extend: function (t, n) { var r = function () { this.constructor = t }; return r.prototype = this.prototype, t.prototype = new r, t.__super__ = this.prototype, e.extend(t, this, n), t.defaults = t.prototype, t }, attach: function (t, n, r) { var i = this; "object" != typeof n || n instanceof e != 0 || r || (r = n, n = void 0), r = e.extend({}, r); var a, o = r.namespace || i.defaults.namespace, s = e.extend({}, i.defaults, i.readElementConfig(t[0], o), r); return t.on(s.openTrigger + "." + s.namespace, s.filter, function (o) { var c = e.extend({ $source: t, $currentTarget: e(this) }, i.readElementConfig(t[0], s.namespace), i.readElementConfig(this, s.namespace), r), l = a || e(this).data("featherlight-persisted") || new i(n, c); "shared" === l.persist ? a = l : l.persist !== !1 && e(this).data("featherlight-persisted", l), c.$currentTarget.blur(), l.open(o) }), t }, current: function () { var e = this.opened(); return e[e.length - 1] || null }, opened: function () { var t = this; return r(), e.grep(n, function (e) { return e instanceof t }) }, close: function (e) { var t = this.current(); return t ? t.close(e) : void 0 }, _onReady: function () { var t = this; t.autoBind && (e(t.autoBind).each(function () { t.attach(e(this)) }), e(document).on("click", t.autoBind, function (n) { n.isDefaultPrevented() || "featherlight" === n.namespace || (n.preventDefault(), t.attach(e(n.currentTarget)), e(n.target).trigger("click.featherlight")) })) }, _callbackChain: { onKeyUp: function (t, n) { return 27 === n.keyCode ? (this.closeOnEsc && e.featherlight.close(n), !1) : t(n) }, onResize: function (e, t) { return this.resize(this.$content.naturalWidth, this.$content.naturalHeight), e(t) }, afterContent: function (e, t) { var n = e(t); return this.onResize(t), n } } }), e.featherlight = t, e.fn.featherlight = function (e, n) { return t.attach(this, e, n) }, e(document).ready(function () { t._onReady() }) }(jQuery), !function (e) { "use strict"; function t(n, r) { if (!(this instanceof t)) { var i = new t(e.extend({ $source: n, $currentTarget: n.first() }, r)); return i.open(), i } e.featherlight.apply(this, arguments), this.chainCallbacks(s) } var n = function (e) { window.console && window.console.warn && window.console.warn("FeatherlightGallery: " + e) }; if ("undefined" == typeof e) return n("Too much lightness, Featherlight needs jQuery."); if (!e.featherlight) return n("Load the featherlight plugin before the gallery plugin"); var r = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch, i = e.event && e.event.special.swipeleft && e, a = window.Hammer && function (e) { var t = new window.Hammer.Manager(e[0]); return t.add(new window.Hammer.Swipe), t }, o = r && (i || a); r && !o && n("No compatible swipe library detected; one must be included before featherlightGallery for swipe motions to navigate the galleries."); var s = { afterClose: function (e, t) { var n = this; return n.$instance.off("next." + n.namespace + " previous." + n.namespace), n._swiper && (n._swiper.off("swipeleft", n._swipeleft).off("swiperight", n._swiperight), n._swiper = null), e(t) }, beforeOpen: function (e, t) { var n = this; return n.$instance.on("next." + n.namespace + " previous." + n.namespace, function (e) { var t = "next" === e.type ? 1 : -1; n.navigateTo(n.currentNavigation() + t) }), o ? n._swiper = o(n.$instance).on("swipeleft", n._swipeleft = function () { n.$instance.trigger("next") }).on("swiperight", n._swiperight = function () { n.$instance.trigger("previous") }) : n.$instance.find("." + n.namespace + "-content").append(n.createNavigation("previous")).append(n.createNavigation("next")), e(t) }, beforeContent: function (e, t) { var n = this.currentNavigation(), r = this.slides().length; return this.$instance.toggleClass(this.namespace + "-first-slide", 0 === n).toggleClass(this.namespace + "-last-slide", n === r - 1), e(t) }, onKeyUp: function (e, t) { var n = { 37: "previous", 39: "next" }[t.keyCode]; return n ? (this.$instance.trigger(n), !1) : e(t) } }; e.featherlight.extend(t, { autoBind: "[data-featherlight-gallery]" }), e.extend(t.prototype, { previousIcon: "&#9664;", nextIcon: "&#9654;", galleryFadeIn: 100, galleryFadeOut: 300, slides: function () { return this.filter ? this.$source.find(this.filter) : this.$source }, images: function () { return n("images is deprecated, please use slides instead"), this.slides() }, currentNavigation: function () { return this.slides().index(this.$currentTarget) }, navigateTo: function (t) { var n = this, r = n.slides(), i = r.length, a = n.$instance.find("." + n.namespace + "-inner"); return t = (t % i + i) % i, n.$currentTarget = r.eq(t), n.beforeContent(), e.when(n.getContent(), a.fadeTo(n.galleryFadeOut, .2)).always(function (e) { n.setContent(e), n.afterContent(), e.fadeTo(n.galleryFadeIn, 1) }) }, createNavigation: function (t) { var n = this; return e('<span title="' + t + '" class="' + this.namespace + "-" + t + '"><span>' + this[t + "Icon"] + "</span></span>").click(function () { e(this).trigger(t + "." + n.namespace) }) } }), e.featherlightGallery = t, e.fn.featherlightGallery = function (e) { return t.attach(this, e) }, e(document).ready(function () { t._onReady() }) }(jQuery), jQuery.isReady ? ($ = window.jQuery, _start()) : $(document).ready(function () { $ = window.jQuery, _start() });
    };

    function _start() {
        // create all widget
        // check if div exists, if yes proceed to create the form 
        stampedMainWidget = $('#stamped-main-widget');
        // check if main widget already contains html, if not, create the widget by calling api
        if (!$.trim($('#stamped-main-widget').html())) {
            _createWidgetForm();
            $(document).on("stamped:reviews:loaded", function (event) {
                _createQuestionForm();
                _initCarouselHandler();
                _initPhotoUpload();
                _initTrimWords();
            });
        } else {
            // main widget already loaded
            _createQuestionForm();
            _initCarouselHandler();
            _initPhotoUpload();
            _initTrimWords();

            // FALLBACK: check for sort select, if not exists, create
            if (!$('.stamped-sort-select').length) {
                $('.stamped-tab-container').append('<select class="stamped-sort-select" onchange="StampedFn.sortReviews(this);"> <option value="recent">Most recent</option> <option value="highest-rating">Highest Rating</option> <option value="lowest-rating">Lowest Rating</option> <option value="most-votes">Most Votes</option> <option value="least-votes">Least Votes</option> </select>');
            }
        }
        _createBadges();
        _initSummaryRatingHandler();
        _initRatingHandler();
        _initTabsHander();
        _initVoteHandler();
        _initShareHandler();
        if ($('#stamped-reviews-widget').length > 0) {
            var review_url = SECURE_ENDPOINT + '/widget/reviews';
            $("[id=stamped-reviews-widget]").each(function (index) {
                _show_widget(review_url, $(this));
            });
        }
    }

    function _createWidgetForm() {
        _loadWidget();
    }

    function _createQuestionForm() {
        _loadQuestionsAndAnswers();
    }

    function _createBadges() {
        _loadBadges();
    }

    function _initTrimWords() {
        var numWords = $(stampedMainWidget).attr('data-limit-words');
        if (numWords && numWords > 0) {
            $('.stamped-review').each(function (index) {
                var _obj = $('.stamped-review-content-body:first, .stamped-review-reply .stamped-review-content-body:first', this);
                if (_obj.length) {
                    var txtOriginal = $(_obj).html();
                    var contentSpillage = txtOriginal.split(" ");
                    if (contentSpillage.length > numWords) {
                        txtTrimmed = contentSpillage.slice(0, numWords).join(" ") + "...";

                        $(_obj).html(txtTrimmed);
                        $(_obj).append('<a class="stamped-review-read-more" style="margin-left:10px; cursor:pointer;">read more</span>');
                        $(_obj).append('<span class="original-review" style="display:none !important;">' + txtOriginal + '</span>');
                    }
                }
            });
        }

        $('.stamped-review-content-body').on('click', '.stamped-review-read-more', function () {
            // remove link
            // replace text
            $(this).closest('.stamped-review-content-body').find('.stamped-review-read-more').hide();
            var txtOriginal = $(this).closest('.stamped-review-content-body').find('.original-review').html();

            $(this).closest('.stamped-review-content-body').html(txtOriginal);
        });
    }

    function _initShareHandler() {
        $(document).on('click', '.stamped-share-button,.stamped-share-icon', function () {
            var links = $(this).parent().find('.stamped-share-links');
            links.fadeToggle();
        });
    }

    function _initSummaryRatingHandler() {
        $(document).on('click', '.stamped-summary-ratings .summary-rating', function () {
            var $bar = $(this).find('.summary-rating-bar');
            var rating = $bar.attr('data-rating');
            var selected = $bar.hasClass('selected');

            $('.summary-rating-bar').each(function () {
                $(this).removeClass('selected');
            });

            $bar.addClass('selected');

            if (rating) {
                if (selected) {
                    pageReviews(1, null);
                } else {
                    pageReviews(1, rating);
                }
            }
        });
    }

    function _initRatingHandler() {
        $(document).on("mouseover mouseout", "form a.fa", function (e) {
            var n, i, r;
            n = e.currentTarget,
                r = $(n).attr("data-value"),
                i = $(n).parent(),
                "mouseover" === e.type ?
                    (i.find("a.fa:lt(" + r + ")").removeClass("fa-star-o").addClass("fa-star"),
                        i.find("a.fa:gt(" + (r - 1) + ")").removeClass("spr-icon-star-hover").addClass("fa-star-o")) : i.find("a.fa").removeClass("fa-star").addClass("fa-star-o")
        })
    }

    function _initPhotoUpload() {
        if (window.File && window.FileReader && window.FormData) {
            var $inputField = $('#stamped-file-uploader-input');
            $inputField.on('change', function (e) {
                var file = e.target.files[0];
                if (file) {
                    if (/^image\//i.test(file.type)) {
                        console.log('is image, begin upload');
                        // check file count
                        if (photosUploadArr.length > 3) {
                            console.log('max number of photos allowed');
                            return;
                        }
                        readFile(file);
                        $inputField.val('');
                    } else {
                        console.log('Not a valid image!');
                    }
                }
            });
        } else {
            console.log("File upload is not supported!");
        }

        function readFile(file) {
            var reader = new FileReader();
            reader.onloadend = function () {
                console.log('process file');
                processFile(reader.result, file.type);
            }
            reader.onerror = function () {
                console.log('There was an error reading the file!');
            }
            reader.readAsDataURL(file);
        }

        function processFile(dataURL, fileType) {
            var maxWidth = 2500;
            var maxHeight = 2500;
            var image = new Image();
            image.src = dataURL;
            image.onload = function () {
                var index = photosUploadArr.length;
                var width = image.width;
                var height = image.height;
                var shouldResize = (width > maxWidth) || (height > maxHeight);
                if (!shouldResize) {
                    // appending image to holder
                    $('.stamped-file-holder').append('<div class="stamped-file-photo" data-index="' + index + '"><i class="fa fa-spin fa-spinner" /><img src="' + dataURL + '" width="70" /></div>');
                    sendFile(dataURL, index);
                    return;
                }
                var newWidth;
                var newHeight;
                if (width > height) {
                    newHeight = height * (maxWidth / width);
                    newWidth = maxWidth;
                } else {
                    newWidth = width * (maxHeight / height);
                    newHeight = maxHeight;
                }
                var canvas = document.createElement('canvas');
                canvas.width = newWidth;
                canvas.height = newHeight;
                var context = canvas.getContext('2d');
                context.drawImage(this, 0, 0, newWidth, newHeight);
                dataURL = canvas.toDataURL(fileType);
                // appending image to holder
                $('.stamped-file-holder').append('<img src="' + dataURL + '" width="50" />');
                sendFile(dataURL, index);
            };
            image.onerror = function () {
                console.log('There was an error processing your file!');
            };
        }

        function sendFile(fileData, photoIndex) {
            var productId = stampedMainWidget.attr('data-product-id');
            var obj = {
                imagea: fileData.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, ""),
            }
            $.ajax({
                type: 'POST',
                url: '//stamped.io/api/widget/upload?' + $.param(stripNull({
                    productId: productId,
                    apiKey: initOptions.apiKey,
                    sId: initOptions.sId,
                    storeUrl: initOptions.storeUrl,
                })),
                data: JSON.stringify(obj),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    setTimeout(function () {
                        if (data) {
                            photosUploadArr.push(data);
                            completeUpload(data, photoIndex);
                        }
                    }, 1000)
                },
                error: function (data) {
                    var arrayLength = photosUploadArr.length;
                    if (data.responseText == '"max"') {
                        alert('Upload up to 3 images');
                    } else {
                        console.log('An error occured, please try again later.');
                    }
                }
            });
        }
        var completeUpload = function (imgUrl, photoIndex) {
            $('.stamped-file-photo:eq(' + photoIndex + ') .fa').remove();
            //if (imgUrl) {
            //    // remove spinner
            //    var wrapper = $('<div id="image-wrapper" data-url="' + imgUrl + '">');
            //    var imgDelete = $('<a id="btn-delete" data-url="' + imgUrl + '"><i class="fa fa-times" style="font-size: 19px;"></a>');
            //    var img = $('<img id="image" width="80">');
            //    img.attr('src', "//s3-us-west-2.amazonaws.com/stamped.io/uploads/photos/" + imgUrl);
            //    imgDelete.appendTo(wrapper);
            //    img.appendTo(wrapper);
            //}
            //var myStringArray = photosUploadArr;
            //var arrayLength = myStringArray.length;
            //if (arrayLength >= 3) {
            //    $('.stamped-file-uploader-input').addClass('hide');
            //}
        }
    }

    function _initCarouselHandler() {
        // stamped-summary-photos

        // check if photos more than 3, if yes, hide btn
        var countPhotos = $('.stamped-photos-carousel div[class="photo"]').length;
        $('.stamped-summary-photos .btn-slide-left').hide();
        $('.stamped-summary-photos .btn-slide-right').hide();
        if (countPhotos >= 3) {
            var direction;
            var position = 0;
            $('.stamped-summary-photos .btn-slide-right').show();
            $(document).on('click', '.stamped-summary-photos .btn-slide-right, .stamped-summary-photos .btn-slide-left', function () {
                if ($(this).attr('data-direction') == 'left') {
                    direction = 1;
                } else {
                    direction = -1;
                }
                if (direction == 1) {
                    if (indexSlide == 0) {
                        return;
                    }
                    indexSlide--;
                } else {
                    if (countPhotos - 2 < indexSlide) {
                        return;
                    }
                    indexSlide++;
                }
                var photo = ($('.stamped-photos-carousel div[class="photo"]:eq(' + (indexSlide + 2 - 1) + ')'));
                if (photo.length) {
                    position += photo.width() * direction;
                }
                $('.stamped-photos-carousel').css("left", (position));
                if (countPhotos - 2 <= indexSlide) {
                    $('.stamped-summary-photos .btn-slide-right').hide();
                } else if (indexSlide > 0) {
                    $('.stamped-summary-photos .btn-slide-right').show();
                    $('.stamped-summary-photos .btn-slide-left').show();
                } else if (indexSlide == 0) {
                    $('.stamped-summary-photos .btn-slide-left').hide();
                }
            });
        }
    }

    function _initVoteHandler() {
        $(document).on("click", "#shopry-rating-wrapper a.shopry-thumbs-up, #shopry-rating-wrapper a.shopry-thumbs-down, #shopry-rating-holder a.shopry-thumbs-up, #shopry-rating-holder a.shopry-thumbs-down, #stamped-rating-holder a.stamped-thumbs-up, #stamped-rating-holder a.stamped-thumbs-down", function (e) {
            var reviewId = $(this).attr('data-review-id');
            var rating = $(this).attr('data-rating');
            var productId = stampedMainWidget.attr('data-product-id');
            var ratingEle = $(this);
            ratingEle.parent().fadeTo("slow", 0.3);
            ratingEle.addClass('disable-link');
            $.ajax({
                type: 'POST',
                url: SECURE_ENDPOINT + '/reviews/vote',
                data: {
                    productId: productId,
                    reviewId: reviewId,
                    vote: rating,
                    apiKey: initOptions.apiKey,
                    sId: initOptions.sId,
                    storeUrl: initOptions.storeUrl
                },
                success: function (data) {
                    // check if user voted before
                    if (data == 1 || data == -1) {
                        var ratingTxt = ratingEle.find('.fa').html();
                        ratingTxt = ratingTxt.replace("&nbsp;", "").trim();
                        var currentRating = parseInt(ratingTxt);
                        ratingEle.find('.fa').html('&nbsp; ' + (currentRating + data));
                    }
                    ratingEle.parent().fadeTo("slow", 1);
                    ratingEle.removeClass('disable-link');
                }
            });
        })
    }

    function _initTabsHander() {
        $(document).on('click', '.stamped-tabs li', function (event) {
            _switchTab(this);
        });
    }

    function _loadWidget(page, sort, rating, skipAnimation) {
        if (stampedMainWidget.length && !isLoading) {
            var productId = stampedMainWidget.attr('data-product-id');
            var productIds = stampedMainWidget.attr('data-product-ids');
            var productName = stampedMainWidget.attr('data-name');
            var productType = stampedMainWidget.attr('data-product-type');
            var productSKU = stampedMainWidget.attr('data-product-sku');
            var userReference = stampedMainWidget.attr('data-user-reference');
            var take = stampedMainWidget.attr('data-take-reviews');

            if (debug == true) {
                console.log(richSnippet);
            }

            if (!sort) {
                sort = stampedMainWidget.attr('data-sort');
            }

            // check if placeholder exists
            if ($('#stamped-main-widget-placeholder').length) {
                $('#stamped-main-widget-placeholder').append(stampedMainWidget);
            }

            isLoading = true;
            // load the form and insert into the div
            $.ajax({
                type: 'GET',
                url: SECURE_ENDPOINT + '/widget?' + $.param(stripNull({
                    productId: productId,
                    productIds: productIds,
                    productName: productName,
                    productType: productType,
                    productSKU: productSKU,
                    userReference: userReference,
                    page: page || 1,
                    apiKey: initOptions.apiKey,
                    sId: initOptions.sId,
                    storeUrl: initOptions.storeUrl,
                    take: take || 5,
                    sort: sort,
                    rating: rating
                })),
                success: function (data) {
                    isLoading = false;

                    var richSnippet = $(stampedMainWidget).attr('data-rich-snippet');

                    var product = data.product;
                    var widget = data.widget;
                    if (!page && richSnippet != 'false') {
                        if (data.title) {
                            // create richsnippet
                            var richSnippet = {
                                "@context": "http://schema.org",
                                "@type": "Product",
                                "name": data.title,
                                "aggregateRating": {
                                    "@type": "AggregateRating",
                                    "ratingValue": data.rating,
                                    "reviewCount": data.count
                                }
                            }
                            if (data.count > 0) {
                                var script = document.createElement('script');
                                script.type = 'application/ld+json';
                                script.innerHTML = JSON.stringify(richSnippet);
                                document.getElementsByTagName('head')[0].appendChild(script);
                            }
                        }
                    }
                    // check whether product meta exists, if not, append
                    var productMetaExists = $('#stamped-main-widget .stamped-container').length;
                    // if qna element exists, copy and append (DO NOTE MOVE! MUST BE ABOVE THE REPLACING MAIN WIDGET CODE)
                    var qnaWrapper = $('.question-form-wrapper').clone();
                    var qnaWidget = $('.stamped-questions').clone();
                    if (!productMetaExists) {
                        stampedMainWidget.html(product);
                        $('.stamped-content', stampedMainWidget).html(widget);
                    } else {
                        $('.stamped-content', stampedMainWidget).html(widget);
                    }
                    if (qnaWrapper.length && !$('.stamped-questions-placeholder').length) {
                        qnaWrapper.insertAfter($('.stamped-tab-container', stampedMainWidget))
                    }
                    if (qnaWidget.length && !$('.stamped-questions-placeholder').length) {
                        $('.stamped-questions', stampedMainWidget).replaceWith(qnaWidget);
                    }
                    // check sort selection, select value
                    if (sort) {
                        if ($('.stamped-sort-select').length) {
                            $('.stamped-sort-select').val(sort);
                        }
                    }
                    // jump to the div with id
                    if (page && !skipAnimation)
                        jump('.stamped-tab-container');

                    $(document).trigger('stamped:reviews:loaded');
                },
                error: function (data) { }
            });
        }
    }

    function _loadQuestionsAndAnswers(page, productId) {
        stampedMainWidget = $('#stamped-main-widget');
        if (stampedMainWidget.length) {
            var productId = stampedMainWidget.attr('data-product-id');
            var take = stampedMainWidget.attr('data-take-questions') || 5;
            $.ajax({
                type: 'GET',
                url: '//stamped.io/api/widget/questions',
                data: {
                    productId: productId,
                    page: page || 1,
                    apiKey: initOptions.apiKey,
                    sId: initOptions.sId,
                    storeUrl: initOptions.storeUrl,
                    take: take || 5
                },
                success: function (data) {
                    // check if user premium or pro
                    if (data.a == true) {
                        // check if shopry-main-widget exists
                        if ($('.stamped-questions').length) {
                            // Create the Question Widget
                            var questionHtml, total, form, pages, avatar;
                            questionHtml = data.result;
                            total = data.t;
                            form = data.form;
                            pages = data.p;
                            avatar = data.avatar;
                            // change tab's count
                            var qtxt = $('#tab-questions').text();
                            var reviewTxt = qtxt.split(' ');

                            $('#tab-questions').html(reviewTxt[0] + ' (' + total + ')');
                            // those items that need to create only once
                            _createQuestionsAndAnswersWidget(form);

                            // load all the questions widget
                            var qaWrapper2 = $('<div class="stamped-questions">');
                            $('.stamped-questions').html('');
                            qaWrapper2.append(questionHtml);

                            // if avatar not null, find element and add
                            if (avatar) {
                                var avatarDiv = $('.stamped-review #stamped-review-avatar', qaWrapper2);
                                var imgAvatar = $('<img src="' + avatar + '" width="100">');
                                avatarDiv.html(imgAvatar);
                            }
                            // check if placeholder exists
                            var qnaPlaceholder = $('.stamped-questions-placeholder');
                            if (qnaPlaceholder.length) {
                                $('.stamped-questions', qnaPlaceholder).html('');
                                $('.stamped-questions', qnaPlaceholder).replaceWith(qaWrapper2);
                                if (!$('.stamped-questions', qnaPlaceholder).length) {
                                    $('.stamped-questions').appendTo(qnaPlaceholder);
                                    $('.stamped-questions').replaceWith(qaWrapper2);
                                }
                                $('.stamped-questions', qnaPlaceholder).show();
                                $('#tab-questions').hide();
                                $('.question-form-wrapper').prependTo(qnaPlaceholder);
                                $('.stamped-summary-actions-newquestion').prependTo(qnaPlaceholder);
                            } else {
                                $('.stamped-questions').replaceWith(qaWrapper2);
                                if (!page) {
                                    $('.stamped-questions').hide();
                                } else {
                                    $('.stamped-questions').show();
                                }
                            }
                            _createQuestionsAndAnswersPagination(total, page || 1, take);
                            // find the element .shopry-qna-widget
                            // copyWidgetQnAStandalone();
                            if (page) {
                                jump('#stamped-main-widget');
                            }
                            $(document).trigger("stamped:questions:loaded");
                        }
                    }
                }
            });
        }
    }

    function _createQuestionsAndAnswersWidget(form) {
        // create question widget only once
        if ($('.stamped-questions').length && !$('.question-form-wrapper').length) {
            // Create Q&A form
            var formElement = $('<div class="question-form-wrapper">').html(form);
            $('.new-review-form').before(formElement);
        }
    }

    function _createQuestionsAndAnswersPagination(total, currentPage, take) {
        var totalPage = total > 0 ? (total / take) < 1 ? 1 : Math.ceil(total / take) : 1;
        if (totalPage == 1) {
            return;
        }
        var paginationHtml = ('<div class="stamped-pagination" id="stamped-pagination-question"><div><span id="stamped-pagination-prev" class="stamped-pagination-prev"><a onclick="StampedFn.pageQuestions(this)" data-product-id="" data-page="' + (currentPage - 1) + '">&laquo; Previous</a></span><span id="pages"></span><span id="stamped-pagination-next" class="stamped-pagination-next"><a onclick="StampedFn.pageQuestions(this)" data-product-id="" data-page="' + (currentPage + 1) + '">Next &raquo;</a></span></div></div>');
        var divQuestionsAndAnswers = $('.stamped-questions');
        var qnaPlaceholder = $('.stamped-questions-placeholder');
        if (qnaPlaceholder.length) {
            divQuestionsAndAnswers = $('.stamped-questions', qnaPlaceholder);
        }
        var divPagination = $('.stamped-pagination', divQuestionsAndAnswers);
        if (divPagination.length) {
            divPagination.replaceWith(paginationHtml);
        } else {
            divQuestionsAndAnswers.append(paginationHtml);
        }
        divPagination = $('.stamped-pagination', divQuestionsAndAnswers);
        var total = totalPage;
        var currentPage = currentPage;
        var pages = [];
        pages.push(1);
        if (total <= 7) {
            for (i = 2; i < total; i++) {
                pages.push(i);
            }
            if (total == currentPage) {
                pages.push(currentPage);
            }
        }
        if (total >= 8) {
            var totalPrevPage = currentPage - 2;
            if (totalPrevPage >= 1) {
                if ((currentPage - 2) != 1)
                    pages.push(currentPage - 2);
                pages.push(currentPage - 1);
            }
            if (currentPage != 1)
                pages.push(currentPage);
            var totalNextPage = currentPage + 2;
            if (totalNextPage <= total) {
                pages.push(currentPage + 1);
                if (totalNextPage != total)
                    pages.push(currentPage + 2);
            }
        }
        if (currentPage == 1 || currentPage == 1) {
            $('#stamped-pagination-prev', divPagination).hide();
        } else {
            $('#stamped-pagination-prev', divPagination).show();
        }
        if (total == currentPage || total == 1) {
            $('#stamped-pagination-next', divPagination).hide();
        } else {
            $('#stamped-pagination-next', divPagination).show();
        }
        if (total != currentPage)
            pages.push(total);
        for (var i = 0; i < pages.length; i++) {
            var isCurrentPage = pages[i] == currentPage;
            if (isCurrentPage) {
                $('#pages', divPagination).append((' <span class="page active">' + pages[i] + '</span> '));
            } else {
                $('#pages', divPagination).append((' <span class="page"><a style="cursor:pointer;" onclick="StampedFn.pageQuestions(this)" data-product-id="" data-page="' + pages[i] + '">' + pages[i] + '</a></span> '));
            }
            if (pages[i] == 1) {
                if (total > 7 && currentPage >= 5) {
                    $('#pages', divPagination).append((' <span class="stamped-pagination-deco">&hellip;</span>'));
                }
            }
            if (i == (pages.length - 2) && (currentPage + 2) < total) {
                $('#pages', divPagination).append((' <span class="stamped-pagination-deco">&hellip;</span>'));
            }
        }
    }

    function _switchTab(obj, type) {
        // if qna placeholder exists, donâ€™t switch tab
        if ($('#stamped-questions-placeholder').length) {
            return;
        }

        $('.stamped-tabs #tab-reviews').removeClass('active');
        $('.stamped-tabs #tab-questions').removeClass('active');

        // check if reviews or questions and open the content
        if (type == "questions") {
            $('.stamped-tabs #tab-questions').addClass('active');
        } else if (type == "reviews") {
            $('.stamped-tabs #tab-reviews').addClass('active');
        }
        if (obj) {
            $(obj).addClass('active');
            type = $(obj).data('type');
        }
        if (type == "reviews") {
            $('.stamped-reviews').show();
            $('.stamped-questions').hide();
        } else if (type == "questions") {
            $('.stamped-reviews').hide();
            $('.stamped-questions').show();
        }
        // close forms
        $('.new-review-form').hide();
        $('.new-question-form').hide();
    }

    function _loadBadges() {
        var productIds;
        // check if div exists, if yes proceed to create the form 
        stampedBadgeElements = $(".stamped-product-reviews-badge[data-id]");
        if (stampedBadgeElements.length) {
            productIds = $.map(stampedBadgeElements, function (t) {
                if (!$.trim($(t).html()) || $(t).attr('data-type') || $(t).attr('data-product-type') || $(t).attr('data-product-sku')) {
                    return {
                        productId: $(t).attr("data-id"),
                        productType: $(t).attr("data-product-type"),
                        productSKU: $(t).attr("data-product-sku")
                    };
                }
            });
        }
        if ($('.stamped-product-reviews-badge[data-id].stamped-main-badge, .stamped-product-reviews-badge:first').length) {
            $(document).on('click', '.stamped-product-reviews-badge[data-id].stamped-main-badge, .stamped-product-reviews-badge:first', function () {
                if ($(this).attr('data-type') == 'qna') {
                    if ($('#stamped-questions-placeholder').length) {
                        jump('#stamped-questions-placeholder');
                    } else {
                        _switchTab(null, 'questions');
                        jump('#stamped-main-widget');
                    }
                    // check for badge questions count
                    if ($('.stamped-badge-caption[data-questions]').length) {
                        var count = $('.stamped-badge-caption[data-questions]').attr('data-questions');
                        if (count == "0") {
                            $('.new-question-form').show();
                        }
                    }
                } else {
					
					if ($(".reviewscroll").length) {
						var animation = $('#stamped-main-widget').attr('data-animation');

						if (animation == 'false') { } else {
							var mainheaderHeight = $('.navbar-toggleable').height(),
							subheaderHeight = $('.navbar-utility').height(),
							headerHeight = mainheaderHeight + subheaderHeight -20;
							var scrollContainer = $('html, body');
							var curElem = $("#review-anchor");
							scrollContainer.animate({
								scrollTop: curElem.offset().top - headerHeight
							}, (animation || 1000));
						}
					}
                }
            });
        }
        if (productIds && productIds.length) {
            $.ajax({
                type: 'POST',
                url: SECURE_ENDPOINT + '/widget/badges',
                data: {
                    productIds: productIds,
                    apiKey: initOptions.apiKey,
                    sId: initOptions.sId,
                    storeUrl: initOptions.storeUrl
                },
                success: function (data) {
                    stampedBadgeElements.each(function (e) {
                        var productId = $(this).attr('data-id');
                        var badgeType = $(this).attr('data-type');
                        var index = $.map(data, function (obj, idx) {
                            if (obj.productId == productId) {
                                return idx;
                            }
                        })[0];
                        if (index >= 0 && (!badgeType || badgeType == 'review')) {
                            $(this).html(data[index].badge);
                        } else if (index >= 0 && badgeType == 'qna') {
                            $(this).html(data[index].badgeqna);
                        }
                    });
                },
                error: function (data) { }
            });
        }
    }

    function _setThankYouShareLinks(data) {
        var reviewStarsTxt = repeat('â˜…', data.reviewRating);
        var shareLinkFacebook = 'https://www.facebook.com/dialog/feed?app_id=222664514734026&caption=' + reviewStarsTxt +
            '&description=' + encodeURIComponent(data.reviewMessage) +
            '&display=popup&link=' + encodeURIComponent(data.productUrl) +
            '&name=' + encodeURIComponent(data.reviewTitle) +
            '&redirect_uri=https://stamped.io/shares?productId=' + data.productId;
        var shareLinkTwitter = 'https://twitter.com/intent/tweet?text=' + data.reviewMessage.substr(0, 140) + '&url=' + encodeURIComponent(data.productUrl) + '&via=stampedhq';
        var shareLinkGoogle = 'https://plus.google.com/share?url=' + encodeURIComponent(data.productUrl);
        var messagesShareLinksDiv = $('.stamped-thank-you .stamped-share-links');
        $('.facebook', messagesShareLinksDiv).attr('href', shareLinkFacebook);
        $('.twitter', messagesShareLinksDiv).attr('href', shareLinkTwitter);
        $('.google', messagesShareLinksDiv).attr('href', shareLinkGoogle);
    }

    function _show_widget(endpoint, obj, page) {
        var ele = $(obj);
        var widgetType = ele.data('widget-type');
        var reviewId = ele.data('review-id');
        var reviewIds = ele.data('review-ids') ? ele.data('review-ids').toString().split(',') : null;
        var productId = ele.data('product-id');
        var productIds = ele.data('product-ids') ? ele.data('product-ids').toString().split(',') : null;
        var productCategory = ele.data('product-category');
        var productBrand = ele.data('product-brand');
        var limitWords = ele.data('limit-words');
        var random = ele.data('random');
        var showAvatar = ele.data('show-avatar');
        var take = ele.data('take');
        var isFillEmpty = ele.data('fill-empty');
        var minRating = ele.data('min-rating');
        var currentPage = page || 1;
        $.ajax({
            type: 'GET',
            url: endpoint + '?' + $.param(stripNull({
                type: widgetType,
                reviewId: reviewId,
                reviewIds: reviewIds,
                productId: productId,
                productIds: productIds,
                productCategory: productCategory,
                productBrand: productBrand,
                limitWords: limitWords,
                random: random,
                showAvatar: showAvatar,
                isFillEmpty: isFillEmpty,
                apiKey: initOptions.apiKey,
                sId: initOptions.sId,
                storeUrl: initOptions.storeUrl,
                page: page,
                skip: take,
                minRating: minRating,
            })),
            dataType: 'json',
            success: function (data, status, xhr) {
                if (data) {
                    var d = data.template;

                    if (widgetType != 'instagram-feed') {
                        // clear object
                        $(ele).html('');
                    }

                    if (widgetType == 'single') {
                        ele.append(d);
                        StampedWidgetSingleFn;
                        StampedWidgetSingleFn.init(data.data, ele, $);
                    } else if (widgetType == 'full-page') {
                        var isRichSnippet = ele.attr('data-rich-snippet');
                        var is_root = location.pathname == "/"; //Equals true if we're at the root
                        if (data.total > 0 && isRichSnippet == 'true' && !is_root) {
                            // create richsnippet
                            var richSnippet = {
                                "@context": "http://schema.org",
                                "@type": "Product",
                                "name": data.shop,
                                "aggregateRating": {
                                    "@type": "AggregateRating",
                                    "ratingValue": data.rating,
                                    "reviewCount": data.total
                                }
                            }
                            var script = document.createElement('script');
                            script.type = 'application/ld+json';
                            script.innerHTML = JSON.stringify(richSnippet);
                            document.getElementsByTagName('head')[0].appendChild(script);
                        }

                            ele.append(d);
                            StampedWidgetFullPageFn;
                            StampedWidgetFullPageFn.init(data, ele, $);

                    } else if (widgetType == 'people-highlight') {
                            ele.append(d);
                            StampedWidgetPeopleHighlightFn;
                            StampedWidgetPeopleHighlightFn.init(data, ele, $);
                    } else if (widgetType == 'drawer') {
                            ele.append(d);
                            StampedWidgetDrawerFn;
                            StampedWidgetDrawerFn.init(data, ele, $);
                    } else if (widgetType == 'carousel') {
                            ele.append(d);
                            StampedCarouselFn;
                            StampedCarouselFn.init(data, ele, $);
                    } else if (widgetType == 'carousel-photos') {
                            ele.append(d);
                            StampedCarouselPhotosFn;
                            StampedCarouselPhotosFn.init(data.data, ele, $);
                    } else if (widgetType == 'instagram-feed') {
                            if (!window.stampedInstagramDataArr) {
                                obj.append(d);
                            }

                            StampedInstagramFeedFn;
                            StampedInstagramFeedFn.init(data, ele, $);
                    } else if (widgetType == 'site-badge') {
                            ele.append(d);
                            StampedSiteBadgeFn;
                            StampedSiteBadgeFn.init(data, ele, $);
                    }
                }
            }
        });
    }
    // misc
    function stripNull(obj) {
        for (var i in obj) {
            if (obj[i] === null || obj[i] === "" || typeof obj[i] === 'undefined') delete obj[i];
        }
        return obj;
    }

    function serializeObject(t) {
        var o = {};
        var a = $(t).serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    function repeat(s, n) {
        var a = [],
            i = 0;
        for (; i < n;) a[i++] = s;
        return a.join('');
    }

    function jump(h) {
        if ($(h).length) {
            var animation = $('#stamped-main-widget').attr('data-animation');

            if (animation == 'false') { } else {
                var scrollContainer = $('html, body');
                var curElem = $(h);
                scrollContainer.animate({
                    scrollTop: curElem.offset().top - 1
                }, (animation || 1000));
            }
        }
    }
    if (!String.linkify) {
        String.prototype.linkify = function () {
            // http://, https://, ftp://
            var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
            // www. sans http:// or https://
            var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
            // Email addresses
            var emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;
            return this
                .replace(urlPattern, '<a href="$&">$&</a>')
                .replace(pseudoUrlPattern, '$1<a href="http://$2">$2</a>')
                .replace(emailAddressPattern, '<a href="mailto:$&">$&</a>');
        };
    }
    // public methods
    function toggleForm(type) {
        if (type == 'review') {

            _switchTab(null, 'reviews');
            var form = $('.new-review-form');
            var form2 = $('.new-question-form');
            form2.hide();

            if (form.is(':hidden')) {
                form.show();
            } else {
                form.hide();
            }
        } else if (type == 'question') {
            _switchTab(null, 'questions');
            var form = $('.new-question-form');
            var form2 = $('.new-review-form');
            form2.hide();
            if (form.is(':hidden')) {
                form.show();
            } else {
                form.hide();
            }
        }
    }

    function toggleFormEdit() {
        $('.edit-review-form', stampedMainWidget).toggle();
    }

    function setRating(t) {
        var e, n, i;
        e = $(t).parents("form"),
            i = $(t).attr("data-value"),
            n = $(t).parent(),
            e.find("input[name='reviewRating']").val(i),
            setStarRating(i, n)
    }

    function setStarRating(t, e) {
        e.find("a:lt(" + t + ")").removeClass("fa-star-o").addClass("fa-star-checked"),
            e.find("a:gt(" + (t - 1) + ")").removeClass("fa-star-checked").addClass("fa-star-o");
    }

    function submitForm(t) {
        // check whether update or create form
        var isEditForm = $(t).hasClass('edit-review-form');
        var method = "POST";
        var paramObj = null;
        if (isEditForm) {
            method = "PUT";
        }
        var e;
        e = serializeObject(t);
        if (!e.reviewRating && !isEditForm) {
            return;
        }
        if (!e.author) {
            return;
        }
        var productParams = {
            productName: stampedMainWidget.attr('data-name'),
            productId: stampedMainWidget.attr('data-product-id'),
            productSKU: stampedMainWidget.attr('data-product-sku'),
            productDescription: stampedMainWidget.attr('data-description'),
            productImageUrl: stampedMainWidget.attr('data-image-url'),
            productUrl: stampedMainWidget.attr('data-url'),
            reviewSource: 'widget',
            userReference: stampedMainWidget.attr('data-userReference')
        };
        e = $.extend(e, productParams);
        paramObj = e;
        e = $.param(e);
        e = e.replace(/%0D%0A/g, "%0A");
        $.ajax({
            url: "" + SECURE_ENDPOINT + "/reviews2?" + $.param(stripNull({
                apiKey: initOptions.apiKey,
                sId: initOptions.sId,
                storeUrl: initOptions.storeUrl,
                photos: photosUploadArr.join()
            })),
            type: method,
            data: e,
            beforeSend: function (t) {
                $(".stamped-button-primary", stampedMainWidget).attr("disabled", "disabled");
            },
            error: function (t) {
                $(document).trigger('stamped:reviews:submitError');
            },
            complete: function (t) {
                if ($("#stamped-main-widget").length) {
                    _setThankYouShareLinks(paramObj);
                    $('.stamped-user-review', stampedMainWidget).hide();
                    $('.stamped-thank-you', stampedMainWidget).show();
                    // hide forms
                    $('.new-review-form', stampedMainWidget).hide();
                    $('.edit-review-form', stampedMainWidget).hide();
                    // hide write a review button
                    $('.stamped-summary-actions-newreview').hide();
                    $(".stamped-button-primary", stampedMainWidget).removeAttr("disabled");
                    // jump to the div with id
                    jump('#stamped-main-widget');
                }

                $(document).trigger('stamped:reviews:submitted');
            }
        })
    }

    function submitQuestionForm() {
        // validate form
        // submits
        var questionForm = $('#new-question-form');
        var mainWidget = $('#stamped-main-widget');
        if (questionForm.length && mainWidget.length) {
            // get the form info via .json of the product page
            var name = mainWidget.data('name');
            var description = mainWidget.data('description');
            var sku = mainWidget.data('product-sku');
            var url = mainWidget.data('url');
            var imageUrl = mainWidget.data('image-url');
            var data = questionForm.serializeArray(); // convert form to array
            data.push({
                name: 'productName',
                value: name
            });
            data.push({
                name: 'productDescription',
                value: description
            });
            data.push({
                name: 'productSKU',
                value: sku
            });
            data.push({
                name: 'productUrl',
                value: url
            });
            data.push({
                name: 'productImageUrl',
                value: imageUrl
            });
            data.push({
                name: 'apiKey',
                value: initOptions.apiKey
            });
            data.push({
                name: 'sId',
                value: initOptions.sId
            });
            data.push({
                name: 'storeUrl',
                value: initOptions.storeUrl
            });

            // disable submit
            $('input[type="submit"]', questionForm).attr('disabled', 'disabled');

            $.ajax({
                type: 'POST',
                url: '//stamped.io/api/questions',
                data: $.param(data),
                crossDomain: true,
                success: function (data) {
                    // check if user voted before
                    if (data.a) {
                        // hide form
                        $('#new-question-form').hide();
                        // show thank you message
                        $('.stamped-form-message-success').show();
                        // clear form inputs
                        $("#new-question-form")[0].reset();

                        $('input[type="submit"]', questionForm).removeAttr('disabled');
                    }
                }
            });
        }
    }

    function init(opts) {
        initOptions = opts;
        if (!initOptions || !initOptions.apiKey) {
            return;
        }
        // initalize jQuery
        if (window.jQuery) {
            _init();
        } else {
            window.onload = function (e) {
                script = document.createElement('script');
                script.type = 'text/javascript';
                script.charset = 'UTF-8';
                script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js';
                document.body.appendChild(script);
                script.onload = script.onreadystatechange = _init;
            };
        }
    }

    function pageQuestions(obj) {
        var productId = stampedMainWidget.attr('data-product-id');
        var page = $(obj).data('page');
        _loadQuestionsAndAnswers(page, productId);
    }

    function pageReviews(page, rating) {
        var productId = stampedMainWidget.attr('data-product-id');
        // get sort value
        var sort;
        if ($('.stamped-sort-select').length) {
            sort = $('.stamped-sort-select').val();
        }
        _loadWidget(page, sort, rating);
    }

    function sortReviews(obj) {
        var productId = stampedMainWidget.attr('data-product-id');
        if (obj.value) {
            _loadWidget(1, obj.value, null, true);
        }
    }

    function pageWidget(obj) {
        var page = $(obj).data('page');
        var review_url = SECURE_ENDPOINT + '/widget/reviews';
        var widget = $(obj).closest('#stamped-reviews-widget');
        widget.attr('data-page', page);

        _show_widget(review_url, widget, page);
    }

    function getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    function loadStyle(href) {
        // avoid duplicates
        var ss = document.styleSheets;
        for (var i = 0, max = ss.length; i < max; i++) {
            if (ss[i] && ss[i].href) {
                if (ss[i].href.indexOf(href) > -1) {
                    return;
                }
            }
        }
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = href;
        head.appendChild(link);
    }

    function getAppKey() {
        $ = window.jQuery;
        jQuery.ajax({
            type: 'GET',
            url: '//stamped.io/api/shopify/getappkey',
            data: {
                shopShopifyDomain: Shopify.shop
            },
            success: function (data) {
                if (data) {
                    if (data.skip == true) {
                    } else {
                        appKey = data.apiKey;
                        // init widgets
                        init({
                            apiKey: appKey,
                            storeUrl: Shopify.shop
                        });
                    }
                }
            }
        });
    }
    loadStyle('//cdn-stamped-io.azureedge.net/files/widget.min.css');
    // check if shopify store
    if (typeof Shopify != 'undefined') {
        var skip = false;
        if (Shopify.shop) {
            // initalize jQuery
            var scriptTag = document.getElementById('stamped-script-widget');

            if (scriptTag != null) {
                var url = scriptTag.src;

                if (url.indexOf('skip=true') > -1) {
                    skip = true;
                }

                if (url.indexOf('debug=true') > -1) {
                    debug = true;
                }

                if (url.indexOf('apiKey') > -1) {
                    var appKey = getParameterByName('apiKey', url);
                    skip = true;

                    // init
                    init({
                        apiKey: appKey,
                        storeUrl: Shopify.shop
                    });
                }
            }
            if (!skip) {
                if (window.jQuery) {
                    getAppKey();
                } else {
                    window.onload = function (e) {
                        script = document.createElement('script');
                        script.type = 'text/javascript';
                        script.charset = 'UTF-8';
                        script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js';
                        document.body.appendChild(script);
                        script.onload = script.onreadystatechange = getAppKey;
                    };
                }
            }
        }
    }
    return {
        init: init,
        toggleForm: toggleForm,
        setRating: setRating,
        submitForm: submitForm,
        submitQuestionForm: submitQuestionForm,
        toggleFormEdit: toggleFormEdit,
        pageQuestions: pageQuestions,
        pageReviews: pageReviews,
        sortReviews: sortReviews,
        pageWidget: pageWidget,
        loadBadges: _createBadges
    }
}(window, document));