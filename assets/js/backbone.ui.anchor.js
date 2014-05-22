/* Backbone UI: Anchor
 * Source: https://github.com/backbone-ui/anchor
 * Copyright © Makesites.org
 *
 * Initiated by Lyndel Thomas (@ryndel)
 * Distributed through [Makesites.org](http://makesites.org)
 * Released under the [MIT license](http://makesites.org/licenses/MIT)
 */

(function(window, $, _, Backbone, APP) {

	// support for Backbone APP() view if available...
	var isAPP = ( typeof APP !== "undefined" && typeof APP.View !== "undefined" );
	var View = ( isAPP ) ? APP.Easing : Backbone.Easing;

	var Anchor = View.extend({

		el: function(){ return $('<'+ this.options.tagName +' class="ui-anchor'+ this.options.className + ' ' + this.options.position + '">'+ this.options.text +'</'+ this.options.tagName +'>') },

		options : _.extend({}, View.prototype.options, {
			scroll : true,
			className : "",
			tagName : "a",
			text: "",
			scrollOffset : 0,
			target: false,
			targetOffset : 0,
			position: "bottom-right"
		}),

		events: {
			//"scroll" : "pageScroll", // this isn't triggered when you scroll the page...
			"click .scroll-link"  : "scrollToTarget",
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

		// Events

		scrollToTarget: function( e ) {
			e.preventDefault();
			// fallback to top
			var target = $(e.target).closest("a").attr("href");
			if( !target ) target = "body";

			this.transitionStart( target );
		},


		transitionData: function( target ){
			// variables
			var now = _.now();
			var scrollTop = this.targetEl.scrollTop;
			var offset = $( target ).offset();

			// record data
			// only support vertical tween (for now)
			return {
				start: now,
				end: now + (this.options.duration * 1000),
				easing: easing[this.options.ease],
				startPos: parseInt( scrollTop ),
				endPos: parseInt( offset.top ),
				pos: parseInt( scrollTop )
			}
		},

		transitionPos: function( pos ){
			if( !pos ){
				// get
				return this.targetEl.scrollTop;
			} else {
				//set
				this.targetEl.scrollTop = pos;
			}
		}

	});


	// Support module loaders
	if ( typeof module === "object" && module && typeof module.exports === "object" ) {
		// Expose as module.exports in loaders that implement CommonJS module pattern.
		module.exports = Anchor;
	} else {
		// Register as a named AMD module, used in Require.js
		if ( typeof define === "function" && define.amd ) {
			//define("backbone.ui.anchor", ['jquery''underscore', 'backbone'], function(){ return Anchor; });
		}
	}
	// If there is a window object, that at least has a document property
	if ( typeof window === "object" && typeof window.document === "object" ) {
		// update APP namespace
		if( isAPP ){
			APP.UI = APP.UI || {};
			APP.UI.Anchor = Anchor;
			// save namespace
			window.APP = APP;
		}
		// update Backbone namespace regardless
		Backbone.UI = Backbone.UI || {};
		Backbone.UI.Anchor = Anchor;
		window.Backbone = Backbone;
	}



})(this.window, this.$, this._, this.Backbone, this.APP);
