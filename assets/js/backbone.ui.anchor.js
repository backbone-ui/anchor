/*
 * Backbone UI: Anchor
 * Source: https://github.com/backbone-ui/anchor
 * Copyright © Makesites.org
 *
 * Initiated by Lyndel Thomas (@ryndel)
 * Distributed through [Makesites.org](http://makesites.org)
 * Released under the [MIT license](http://makesites.org/licenses/MIT)
 */

(function (lib) {

	//"use strict";

	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		var deps = ['jquery', 'underscore', 'backbone', 'backbone.easing']; // condition when backbone.app is part of the array?
		define('backbone.ui.anchor', deps, lib);
	} else if ( typeof module === "object" && module && typeof module.exports === "object" ){
		// Expose as module.exports in loaders that implement CommonJS module pattern.
		module.exports = lib;
	} else {
		// Browser globals
		var Query = window.jQuery || window.Zepto || window.vQuery;
		lib(Query, window._, window.Backbone, window.APP);
	}
}(function ($, _, Backbone, APP) {

	// support for Backbone APP() view if available...
	APP = APP || window.APP || null;
	var isAPP = ( APP !== null );
	var View = ( isAPP && typeof APP.Easing !== "undefined" ) ? APP.Easing : Backbone.Easing;

	// Shims
	// parent inheritance from Backbone.APP
	var parent=function(a,b){a=a||"",b=b||{},this.__inherit=this.__inherit||[];var c=this.__inherit[a]||this._parent||{},d=c.prototype||this.__proto__.constructor.__super__,e=d[a]||function(){delete this.__inherit[a]},f=b instanceof Array?b:[b];return this.__inherit[a]=d._parent||function(){},e.apply(this,f)};

	var Anchor = View.extend({

		name: "anchor",

		el: function(){ return $('<'+ this.options.tagName +' class="ui-anchor '+ this.options.className + ' ' + this.options.position + '">'+ this.options.text +'</'+ this.options.tagName +'>') },

		options : _.extend({}, View.prototype.options, {
			scroll : true,
			className : "",
			tagName : "a",
			text: "back to top",
			scrollEl: false,
			scrollLink: null,
			scrollOffset: 0,
			scrollUpdateHash: false,
			target: false,
			targetEl: false,
			targetOffset: 0,
			position: "bottom-right"
		}),

		events: {
			//"scroll" : "pageScroll", // this isn't triggered when you scroll the page...
			//"click .scroll-link": "scrollToTarget",
			//"click": "scrollToTarget" // duplicate event, pick one of the two with options...
		},

		initialize: function(options){
			options = options || {};
			// put this in render?
			if( options.text ) $(this.el).html(options.text);
			if( !options.el ){
				// create a new element
				$(this.el).appendTo('body');
			}
			_.bindAll(this, 'render', 'pageScroll', 'scrollToTarget');

			this.options.scrollOffset = ( this.options.scrollOffset ) ? this.options.scrollOffset : window.innerHeight;

			$(window).scroll(this.pageScroll);
			// trigger on init
			this.pageScroll();
			// setup events
			this.setupEvents( options );
			// continue...
			return this.parent('initialize', options);
		},

		setupEvents: function( options ){
			// variables
			scrollLink = options.scrollLink || this.options.scrollLink || null;
			// event trigger
			var $el = (scrollLink) ? $(this.el).find(scrollLink) : $(this.el);
			$el.on('click', _.bind(this.scrollToTarget, this) ); // bindAll fail
		},

		postRender: function(){
			// reset events...
			this.setupEvents( this.options );
			// continue...
			return this.parent('postRender', {});
		},

		// can this be replaced by a common.js monitor?
		pageScroll: function(){

			if ($(window).scrollTop() > this.options.scrollOffset) {
				$(this.el).addClass('ui-element-active');
			} else {
				$(this.el).removeClass('ui-element-active');
			}
		},

		// Events

		scrollToTarget: function( e ){
			e.preventDefault();
			// find target
			var $link = $(e.target).closest("a"),
				target;
			if(this.options.target){
				// target is a an attribute
				target = $link.attr( this.options.target );
			} else if(this.options.targetEl) {
				// goto a "fixed" element
				target = this.options.targetEl;
			} else {
				target = $link.attr("href");
			}
			// fallback to _top_
			if( !target ) target = "body";

			this.transitionStart( target );
		},

		transitionData: function( target ){
			// variables
			var now = _.now();
			var target = this.__target;
			var $scrollEl = this.__$scrollEl;
			var scrollTop = $scrollEl.scrollTop();
			var offset = $( target ).offset();

			// record data
			// only support vertical tween (for now)
			var data = {
				start: now,
				end: now + (this.options.duration * 1000),
				easing: this.tween(this.options.ease),
				startPos: Math.round( scrollTop ),
				endPos: Math.round( offset.top ),
				pos: Math.round( scrollTop )
			}
			this._transitionData = data;
			return data;
		},

		transitionPos: function( pos ){
			var $scrollEl = this.__$scrollEl;
			if( !pos ){
				// get
				var scroll = $scrollEl.scrollTop();
				// FIX: retina displays might return fractions...
				scroll = Math.round(scroll);
				return scroll;
			} else {
				//set
				$scrollEl.scrollTop(pos);
			}
		},

		transitionStart: function( target ){
			//save target reference
			this.__target = target;
			// scrollable target is either defined or
			this.__$scrollEl = (this.options.scrollEl) ? $(this.options.scrollEl) : $("body");
			return View.prototype.transitionStart.call(this, target);
		},

		transitionEnd: function(){
			var target = this.__target;
			// FIX: Remove any existing hash
			if( "body" == target && !_.isEmpty(window.location.hash) ){
				app.navigate("#", false);
				//window.location.hash = '';
			} else if(this.options.scrollUpdateHash) {
				// update hash URLs
				app.navigate(target, false);
			}
			return this.parent('transitionEnd', {});
		},

		// Helpers

		// call methods from the parent
		parent: View.prototype.parent || parent,

	});

	// update Backbone namespace regardless
	Backbone.UI = Backbone.UI ||{};
	Backbone.UI.Anchor = Anchor;
	if( isAPP ){
		APP.UI = APP.UI || {};
		APP.UI.Anchor = Anchor;
	}

	// If there is a window object, that at least has a document property
	/* FIX: APP is not the same as window.APP (extending easing...)
	if( typeof window === "object" && typeof window.document === "object" ){
		// update APP namespace
		if( isAPP ){
			window.APP = APP;
		}
		window.Backbone = Backbone;
	}
	*/
	// for module loaders:
	return Anchor;

}));
