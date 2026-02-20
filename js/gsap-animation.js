(function ($) {
	"use strict";

	gsap.registerPlugin(ScrollTrigger, SplitText);
	gsap.config({
		nullTargetWarn: false,
		trialWarn: false
	});

	jQuery.fn.pbmit_is_bound = function(type) {
		if (this.data('events') !== undefined) {
			if (this.data('events')[type] === undefined || this.data('events')[type].length === 0) {
				return false;
			}
			return (-1 !== $.inArray(fn, this.data('events')[type]));
		} else {
			return false;
		}
	};

	/*----  Functions  ----*/
	function getpercentage(x, y, elm) { 
		elm.find('.pbmit-fid-inner').html(y + '/' + x);
		var cal = Math.round((y * 100) / x);
		return cal;
	}

	/*----  Sticky Header ----*/
	var pbmit_sticky_header = function() {
		if (jQuery('.pbmit-header-sticky-yes').length > 0) {
			var header_html = jQuery('#masthead .pbmit-main-header-area').html();
			jQuery('.pbmit-sticky-header').append(header_html);
			jQuery('.pbmit-sticky-header #menu-toggle').attr('id', 'menu-toggle2');
			jQuery('#menu-toggle2').on('click', function() {
				jQuery("#menu-toggle").trigger("click");
			});
			jQuery('.pbmit-sticky-header .main-navigation ul, .pbmit-sticky-header .main-navigation ul li, .pbmit-sticky-header .main-navigation ul li a').removeAttr('id');
			jQuery('.pbmit-sticky-header h1').each(function() {
				var thisele = jQuery(this);
				var thisele_class = jQuery(this).attr('class');
				thisele.replaceWith('<span class="' + thisele_class + '">' + jQuery(thisele).html() + '</span>');
			});
			// For infostak header
			if (jQuery('.pbmit-main-header-area').hasClass('pbmit-infostack-header')) { // check if infostack header
				// for header style 2
				jQuery(".pbmit-sticky-header .pbmit-header-menu-area").insertAfter(".pbmit-sticky-header .site-branding");
				jQuery('.pbmit-sticky-header .pbmit-header-info, .pbmit-sticky-header .pbmit-mobile-search, .pbmit-sticky-header .nav-menu-toggle').remove();
			}
		}
		pbmit_flotingbar();
	}

	var pbmit_sticky_header_class = function() {
		// Add sticky class
		if (jQuery('#wpadminbar').length > 0) {
			jQuery('#masthead').addClass('pbmit-adminbar-exists');
		}
		var offset_px = 300;
		if (jQuery('.pbmit-main-header-area').length > 0) {
			offset_px = jQuery('.pbmit-main-header-area').height() + offset_px;
		}
		// apply on document ready
		if (jQuery(window).scrollTop() > offset_px) {
			jQuery('#masthead').addClass('pbmit-fixed-header');
			jQuery('.pbmit-sticky-header .mega-menu.max-mega-menu.mega-menu-horizontal').attr("id", "mega-menu-pbminfotech-top");
		} else {
			jQuery('#masthead').removeClass('pbmit-fixed-header');
		}
		jQuery(window).scroll(function() {
			if (jQuery(window).scrollTop() > offset_px) {
				jQuery('#masthead').addClass('pbmit-fixed-header');
				jQuery('.pbmit-sticky-header .mega-menu.max-mega-menu.mega-menu-horizontal').attr("id", "mega-menu-pbminfotech-top");
			} else {
				jQuery('#masthead').removeClass('pbmit-fixed-header');
			}
		});
	}

	var pbmit_toggleSidebar = function() {
		jQuery('#menu-toggle').on('click', function() {
			jQuery("body:not(.mega-menu-pbminfotech-top) .pbmit-navbar > div, body:not(.mega-menu-pbminfotech-top)").toggleClass("active");
		})
		if (jQuery('.pbmit-navbar > div > .closepanel').length == 0) {
			jQuery('.pbmit-navbar > div').append('<span class="closepanel"><svg class="qodef-svg--close qodef-m" xmlns="http://www.w3.org/2000/svg" width="20.163" height="20.163" viewBox="0 0 26.163 26.163"><rect width="36" height="1" transform="translate(0.707) rotate(45)"></rect><rect width="36" height="1" transform="translate(0 25.456) rotate(-45)"></rect></svg></span>');
			jQuery('.pbmit-navbar > div > .closepanel, .mega-menu-pbminfotech-top .nav-menu-toggle').on('click', function() {
				jQuery(".pbmit-navbar > div, body, .mega-menu-wrap").toggleClass("active");
			});
			return false;
		}
	}
	var pbmit_flotingbar = function() {
		jQuery('.pbmit-nav-menu-toggle').on('click', function() {
			jQuery("body .floting-bar-wrap").toggleClass("active");
		})
		if (jQuery('.floting-bar-wrap .closepanel').length == 0) {
			jQuery('.floting-bar-wrap').append('<span class="closepanel"><svg class="qodef-svg--close qodef-m" xmlns="http://www.w3.org/2000/svg" width="26.163" height="26.163" viewBox="0 0 26.163 26.163"><rect width="36" height="1" transform="translate(0.707) rotate(45)"></rect><rect width="36" height="1" transform="translate(0 25.456) rotate(-45)"></rect></svg></span>');
			jQuery('.floting-bar-wrap .closepanel').on('click', function() {
				jQuery(".floting-bar-wrap").toggleClass("active");
			});
			return false;
		}
	}

	var pbmit_navbar = function() {
		if (!jQuery('ul#pbmit-top-menu > li > a[href="#"]').pbmit_is_bound('click')) {
			jQuery('ul#pbmit-top-menu > li > a[href="#"]').on('click', function() { return false; });
		}
		jQuery('.pbmit-navbar li:has(ul)').append("<span class='sub-menu-toggle'><i class='pbmit-base-icon-angle-right'></i></span>");
		jQuery('.pbmit-navbar li').on('mouseover', function() {
			if (jQuery(this).children("ul").length == 1) {
				var parent = jQuery(this);
				var child_menu = jQuery(this).children("ul");
				if (jQuery(parent).offset().left + jQuery(parent).width() + jQuery(child_menu).width() > jQuery(window).width()) {
					jQuery(child_menu).addClass('pbmit-nav-left');
				} else {
					jQuery(child_menu).removeClass('pbmit-nav-left');
				}
			}
		});
		jQuery('.sub-menu-toggle').on('click', function() {
			if (jQuery(this).siblings('.sub-menu, .children').hasClass('show')) {
				jQuery(this).siblings('.sub-menu, .children').removeClass('show');
				jQuery('i', jQuery(this)).removeClass('pbmit-base-icon-up-open-big').addClass('pbmit-base-icon-angle-right');
			} else {
				jQuery(this).siblings('.sub-menu, .children').addClass('show');
				jQuery('i', jQuery(this)).removeClass('pbmit-base-icon-angle-right').addClass('pbmit-base-icon-up-open-big');
			}
			return false;
		});
		jQuery('.nav-menu-toggle').on('click', function() {
			jQuery('.pbmit-navbar ul.menu > li > a').on('click', function() {
				if (jQuery(this).attr('href') == '#' && jQuery(this).siblings('ul.sub-menu, ul.children').length > 0) {
					jQuery(this).siblings('.sub-menu-toggle').trigger('click');
					return false;
				}
			});
		})
	}

	var pbmit_active_hover = function() {

		var pbmit_var = jQuery('.pbmit-element-service-style-2');

		if (!pbmit_var.length) {
			return;
		}

		pbmit_var.each(function() {
			var pbmit_Class = '.pbmit-hover-inner li';
			jQuery(this)
				.find(pbmit_Class).first()
				.addClass('pbmit-active');
			jQuery(this)
				.find(pbmit_Class)
				.on('mouseover', function() {
					jQuery(this).addClass('pbmit-active').siblings().removeClass('pbmit-active');
				});
		});
	}

	var pbmit_service_bg_hover = function() {
		if (typeof Swiper !== 'undefined') {
			var pbmit_hover = new Swiper(".pbmit-hover-image-faded", {
				speed: 6000,
				effect: 'fade',
			});
		}
		jQuery('.pbmit-main-hover-faded li').hover(function(e) {
			e.preventDefault();
			var myindex = jQuery(this).index();
			pbmit_hover.slideTo(myindex, 1000, false);
		});
	}

	var pbmit_thia_sticky = function() {
		if(typeof jQuery.fn.theiaStickySidebar == "function"){
			jQuery('.pbmit-sticky-sidebar').theiaStickySidebar({
				additionalMarginTop: 100
			});
			jQuery('.pbmit-sticky-column').theiaStickySidebar({
				additionalMarginTop: 180
			});
		}
	}

	function pbmit_portfolio_effect() {
		var $images = jQuery('.pbmit-portfolio-style-2');
		if ($images.length === 0) return;

		// Add "active" class on scroll down
		$images.each(function () {
			var $el = jQuery(this);
			new Waypoint({
				element: this,
				handler: function (direction) {
					if (direction === 'down') {
						$el.addClass('active');
					}
				},
				offset: '70%'
			});
		});

		// Animate inner wrapper on scroll (from y: 0 to y: 40)
		jQuery('.pbmit-portfolio-style-2 .pbmit-featured-wrapper').each(function () {
			var $imgWrapper = jQuery(this);
			new Waypoint({
				element: this,
				handler: function (direction) {
					if (direction === 'down') {
						$imgWrapper.css({
							transform: 'translateY(30px)',
							transition: 'transform 1.5s ease-out'
						});
					} else {
						$imgWrapper.css({
							transform: 'translateY(0)',
							transition: 'transform 1.5s ease-out'
						});
					}
				},
				offset: '20%'
			});
		});
	}

	/*---- Sortable ----*/
	var pbmit_sorting = function() {
		jQuery('.pbmit-sortable-yes:not(.pbmit-ajax-sortable-yes)').each(function() {
			var boxes = jQuery('.pbmit-element-posts-wrapper', this);
			var links = jQuery('.pbmit-sortable-list a', this);
			boxes.isotope({
				animationEngine: 'best-available',
				layoutMode: 'masonry',
				masonry: {
					horizontalOrder: true
				}
			});
			if( jQuery('body').hasClass('rtl') ){
				boxes.isotope({
					isOriginLeft: false,
					originLeft: false,
				});
			}
			links.on('click', function(e) {
				var selector = jQuery(this).data('sortby');
				if (selector != '*') {
					var selector = '.' + selector;
				}
				boxes.isotope({
					animationEngineString : 'best-available',
					filter: selector,
					itemSelector: '.pbmit-ele',
					layoutMode: 'masonry',
					masonry: {
						horizontalOrder: true
					}
				});
				if( jQuery('body').hasClass('rtl') ){
					boxes.isotope({
						isOriginLeft: false,
						originLeft: false,
					});
				}
				links.removeClass('pbmit-selected');
				jQuery(this).addClass('pbmit-selected');
				e.preventDefault();
			});
		});
	}

	/*----  Img Animation  ----*/
	var pbmit_img_animation = function() {
		const pbmit_img_class = jQuery('.pbmit-animation-style1, .pbmit-animation-style2, .pbmit-animation-style3, .pbmit-animation-style4, .pbmit-animation-style5, .pbmit-animation-style6, .pbmit-animation-style7');
		
		pbmit_img_class.each(function() {
		const each_box = jQuery(this);
		
		new Waypoint({
			element: this,
			handler: function(direction) {
			if (direction === 'down') {
				each_box.addClass('active');
			}
			},
			offset: '70%',
		});
		});
	}

	/* ====================================== */
	/* Add Animation
	/* ====================================== */
	function add_animation(threshold = 0.1) {
		const reveals = document.querySelectorAll(".animation");

		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add("loaded");
			} else {
				entry.target.classList.remove("loaded");
			}
			});
		}, { threshold });

		reveals.forEach(el => observer.observe(el));

		return observer;
	}

	ScrollTrigger.matchMedia({
		"(max-width: 1200px)": function() {
			ScrollTrigger.getAll().forEach(t => t.kill());
		}
	});

	// on load
	jQuery(window).on('load', function(){
		pbmit_sticky_header();
		pbmit_sticky_header_class();
		pbmit_toggleSidebar();
		pbmit_navbar();
		pbmit_active_hover();
		pbmit_service_bg_hover();
		pbmit_thia_sticky();
		pbmit_portfolio_effect();
		pbmit_sorting();
		pbmit_img_animation();
		add_animation();
		gsap.delayedCall(1, () =>
			ScrollTrigger.getAll().forEach((t) => {
				t.refresh();
			})
		);
	});
})($);