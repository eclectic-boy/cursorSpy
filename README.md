#cursorSpy

*cursorSpy* is a [jQuery widget](https://learn.jquery.com/plugins/stateful-plugins-with-widget-factory/) that can make able every DOM object (*spyObject*) to follow the cursor by rotating around its transform origin.


##Notes

The reference system is centered in the transform origin of the *spyObject* and the angles are measured clockwise starting from the North related to projections from the center.


#Usage

```html    
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
<script type="text/javascript" src="js/cursorSpy.min.js"></script>

<script type="text/javascript">
$(function() {
	$("#spy").cursorSpy(opts);
});
</script>

<div id="spy"></div>
```

#Options

An optional options object `opts` can be passed to the widget. Here follow the available options:

##`head`##
The angle of the head of the *spyObject* (i.e. the part of the *spyObject* that will follow the cursor). Default to 0 (=top);

##`min`##
The minimun angle (based on to the position of the cursor) below which the *spyObject* stops following the cursor. Default to `null`. `max` must be defined. Optional;

##`max`##
The maximum angle (based on to the position of the cursor) above which the *spyObject* stops following the cursor. Default to `null`. `min` must be defined. Optional;

##`step(me, deg)`##
A function which is called at every step (i.e. every time the *spyObject* moves). Optional.

This function can change the behaviour of the widget for the current step by changing the related angle hence the movement of the *spyObject*.
It receives the following parameters:

 - `me`: the widget itsel;
 - `deg`: the angle of the current step.

This function must return either a float number or `false`.
If a float number is returned it will be used as the angle for the current step.
If `false` is returned the movement for the current step is prevented.

```javascript
function step(me, deg) {
	//change deg here
	return deg;
}
```
In order to obtain the same `deg` angle but started from the head (if defined) you simply have to convert it as follows:

```javascript
deg_relative = deg + me.options.head;
```

#Methods

##`start`##

enables the widget.
```
$("#spy").cursorSpy("start");
```

##`stop`##

disable the widget.
```
$("#spy").cursorSpy("stop");
```

#Tips

The default transform origin for the *spyObject* is its centroid, for changing it you can use the CSS3 directive [`transform-origin`](http://www.w3schools.com/cssref/css3_pr_transform-origin.asp).