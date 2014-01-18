/* Backbone UI: Anchor
 * Source: https://github.com/backbone-ui/anchor
 * Copyright © Makesites.org
 *
 * Initiated by Lyndel Thomas (@ryndel)
 * Distributed through [Makesites.org](http://makesites.org)
 * Released under the [MIT license](http://makesites.org/licenses/MIT)
 */

(function($, _, Backbone) {

	// support for Backbone APP() view if available...
	var isAPP = ( typeof APP !== "undefined" && typeof APP.View !== "undefined" );
	var View = ( isAPP ) ? APP.View : Backbone.View;

	var Anchor = View.extend({

		el: function(){ return $('<'+ this.options.tagName +' class="ui-anchor'+ this.options.className + ' ' + this.options.position + '">'+ this.options.text +'</'+ this.options.tagName +'>') },

		options : {
			scroll : true,
			className : "",
			tagName : "a",
			text: "",
			scrollOffset : 0,
			target: false,
			targetOffset : 0,
			position: "bottom-right"
		},

		events: {
			"scroll" : "pageScroll", // this isn't triggered when you scroll the page...
			"click"  : "scrollToTarget"
		},

		initialize: function(options){
			$(this.el).appendTo('body');

			_.bindAll(this, 'render', 'pageScroll');

			this.options.scrollOffset = ( this.options.scrollOffset ) ? this.options.scrollOffset : $(window).height() ;

			$(window).scroll(this.pageScroll);
			// trigger on init
			this.pageScroll();
			// continue...
			return View.prototype.initialize.call(this, options);

		},

		// can this be replaced by a common.js monitor?
		pageScroll: function() {

			if ($(window).scrollTop() > this.options.scrollOffset) {

				$(this.el).addClass('ui-element-active');
			} else {
				$(this.el).removeClass('ui-element-active');
			}
		},

		scrollToTarget: function() {
			// fallback to top
			var scroll = (this.options.target ) ? $(this.options.target).offset().top: 0;
			scroll -= this.options.targetOffset;
			$("html, body").animate({scrollTop: scroll }, 1000);
		}

	});


	// fallbacks
	if( _.isUndefined( Backbone.UI ) ) Backbone.UI = {};
	Backbone.UI.Anchor = Anchor;

	// Support module loaders
	if ( typeof module === "object" && module && typeof module.exports === "object" ) {
		// Expose as module.exports in loaders that implement CommonJS module pattern.
		module.exports = Anchor;
	} else {
		// Register as a named AMD module, used in Require.js
		if ( typeof define === "function" && define.amd ) {
			//define( "backbone.ui.scrollchange", [], function () { return Anchor; } );
			//define( ['jquery', 'underscore', 'backbone'], function () { return Anchor; } );
			define( [], function () { return Anchor; } );
		}
	}
	// If there is a window object, that at least has a document property
	if ( typeof window === "object" && typeof window.document === "object" ) {
		window.Backbone = Backbone;
		// update APP namespace
		if( typeof APP != "undefined" && (_.isUndefined( APP.UI ) || _.isUndefined( APP.UI.Anchor ) ) ){
			APP.UI = APP.UI || {};
			APP.UI.Anchor = Backbone.UI.Anchor;
			window.APP = APP;
		}
	}



})(this.jQuery, this._, this.Backbone);