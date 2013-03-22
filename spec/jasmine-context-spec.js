describe("Jasmine Context Matchers", function() {
  describe("toHaveBeenCalledInTheContextOf", function() {
    function MyFunctions(name) {
      var self = this;
      self.name = name;
      return self;
    }

    MyFunctions.prototype.hello = function (message) {};
    MyFunctions.prototype.noSpy = function () {};

    var foo;
    var bar;

    beforeEach(function() {
      foo = new MyFunctions("foo");
      bar = new MyFunctions("bar");
      spyOn(MyFunctions.prototype, "hello");
    });

    it("raises an exception if the method is not a spy", function () {
      expect(function () {
        expect(MyFunctions.prototype.noSpy).toHaveBeenCalledInTheContextOf(foo);
      }).toThrow();
    });

    it("raises an exception if the object passed is undefined", function () {
      expect(function () {
        expect(MyFunctions.prototype.hello).not.toHaveBeenCalledInTheContextOf(undefined);
      }).toThrow();
    });

    it("requires the context object to match", function() {
      foo.hello("world");
      expect(MyFunctions.prototype.hello).toHaveBeenCalledInTheContextOf(foo);
      expect(MyFunctions.prototype.hello).not.toHaveBeenCalledInTheContextOf(bar);
    });

    describe("with arguments", function () { 
      it("requires matching arguments", function() {
        foo.hello("world");
        bar.hello("dolly");
        expect(MyFunctions.prototype.hello).toHaveBeenCalledInTheContextOf(foo, ["world"]);
        expect(MyFunctions.prototype.hello).not.toHaveBeenCalledInTheContextOf(foo, ["dolly"]);
        expect(MyFunctions.prototype.hello).toHaveBeenCalledInTheContextOf(bar, ["dolly"]);
      });

      it("allows jasmine matchers", function() {
        foo.hello(function() { return "world"; });
        expect(MyFunctions.prototype.hello).toHaveBeenCalledInTheContextOf(foo, [jasmine.any(Function)]);
      });
    });

    describe("with jQuery objects", function () {
      beforeEach(function () {
        $("#spec-dom").html("<div class='multiple disjoint'></div><div id='element' class='multiple subset disjoint'></div><div class='multiple subset'></div>");
      });

      describe("single elements", function () {
        it("matches if the expected object is a DOM element", function () {
          spyOn($.fn, "hide");
          $("#element").hide();
          expect($.fn.hide).toHaveBeenCalledInTheContextOf($("#element")[0]);
        });

        it("matches if the expected object is a jQuery element", function () {
          spyOn($.fn, "hide");
          $("#element").hide();
          expect($.fn.hide).toHaveBeenCalledInTheContextOf($("#element"));
        });

        it("raises an exception if the jQuery object passed has no elements", function () {
          expect(function () {
            spyOn($.fn, "hide");
            $(".not-a-real-selector").hide();
            expect($.fn.hide).toHaveBeenCalledInTheContextOf($(".not-a-real-selector"));
          }).toThrow();
        });

        it("matches if the expected object is a jQuery element also matches the actual selector", function () {
          spyOn($.fn, "hide");
          $(".multiple").hide();
          expect($.fn.hide).toHaveBeenCalledInTheContextOf($("#element"));
          expect($.fn.hide).toHaveBeenCalledInTheContextOf($("#element")[0]);
        });
      });
      
      describe("multiple elements", function () {
        it("matches if the jQuery object selects a subset of elements", function () {
          spyOn($.fn, "hide");
          $(".multiple").hide();
          expect($.fn.hide).toHaveBeenCalledInTheContextOf($(".subset"));
        });

        it("doesn't match if the jQuery object selects a disjoint set of elements", function () {
          spyOn($.fn, "hide");
          $(".disjoint").hide();
          expect($.fn.hide).not.toHaveBeenCalledInTheContextOf($(".subset"));
        });

        it("doesn't match if the jQuery object selects a superset of elements", function () {
          spyOn($.fn, "hide");
          $(".subset").hide();
          expect($.fn.hide).not.toHaveBeenCalledInTheContextOf($(".multiple"));
        });
      });
    });
  });
});