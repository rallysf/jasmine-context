# jasmine-context

jasmine-context is a matcher library for Jasmine to allow assertions on whether a function has been applied
with a particular object as the `this` argument. You can optionally pass an array of arguments that must also match
a call to the function.

## Dependencies

* Jasmine >= 1.3.1
* jQuery >= 1.9

## Usage

```javascript
// without arguments
it("should call show", function () {
	spyOn($.fn, "show");
	$("#element").show();
	expect($.fn.show).toHaveBeenCalledInTheContextOf($("#element"));
});

// with arguments
it("should call show", function () {
	spyOn($.fn, "prop");
	$("#element").prop("disabled", true);
	expect($.fn.prop).toHaveBeenCalledInTheContextOf($("#element"), ["disabled", true]);
});
```

## Additional Contributors

* Danny Burkes
* [Andrew Hubbs](https://github.com/andrewhubbs/)
