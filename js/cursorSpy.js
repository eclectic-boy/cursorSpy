(function ($) {

	$.widget( "main.cursorSpy", {
	 
		options: {
			isActive: true,
			head: 0,
			min: null,
			max: null,
			step: function(me, deg) {
				//me = widget
				//deg = angle for this step (real CSS value for rotation)
				//deg + me.options.head = angle for this step (computed angle related to the head -if defined-)
				//return false to prevent rotation for this step
				return deg;
			},
		},

		_create: function() {
			var me = this;

			me.element
				.css("display", "block")
				.css("position", "relative");

			$(document).on("mousemove", function(event) {
				if(me.options.isActive) {
					var offset = me.element.offset();
					var width = me.element.width();
					var height = me.element.height();
					var centerX = offset.left + (width / 2);
					var centerY = offset.top + (height / 2);
					var dx = event.pageX-centerX;
					var dy = event.pageY-centerY;
					var rad = Math.atan((dy)/(dx)) - Math.PI;
					if(dx < 0) {
						rad += Math.PI;
					}

					var deg = rad / Math.PI * 180 - 90;
					deg = (deg + 360) % 360;

					if(me.options.min != null && me.options.max != null && (deg < me.options.min || deg > me.options.max)) {
						return false;
					}

					if(me.options.step) {
						deg = me.options.step(me, deg);

						if(deg == false) {
							return false;
						}
					}

					deg = deg - me.options.head;

					me.element
						.css("-ms-transform", "rotate(" + deg + "deg)")
						.css("-webkit-transform", "rotate(" + deg + "deg)")
						.css("transform", "rotate(" + deg + "deg)");
				}
			});

			this._update();
		},
	 
		_setOption: function(key, value) {
			this.options[key] = value;
			this._update();
		},
	 
		_update: function() {},
	 
		_destroy: function() {},

		start: function() {
			this.options.isActive = true;
		},

		stop: function() {
			this.options.isActive = false;
		},
	 
	});

})(jQuery);