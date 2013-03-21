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
  });
});