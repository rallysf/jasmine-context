beforeEach(function () {
  this.addMatchers({
    toHaveBeenCalledInTheContextOf: function (expectedObject, expectedArgs) {
      var spy = this.actual;

      if (!jasmine.isSpy(spy)) {
        throw new Error('Expected a spy, but got ' + jasmine.pp(spy) + '.');
      }

      if (expectedObject === undefined) {
        throw new Error('Expected a context for ' + jasmine.pp(spy) + ', but got ' + jasmine.pp(expectedObject) + '.');
      }

      this.message = function () {
        if (expectedArgs === undefined) {
          return [
            "Expected spy " + this.actual.identity + " to have been called in the context of " + jasmine.pp(expectedObject),
            "Expected spy " + this.actual.identity + " not to have been called in the context of " + jasmine.pp(expectedObject)
          ];
        } else {
          return [
            "Expected spy " + this.actual.identity + " to have been called in the context of " + jasmine.pp(expectedObject) + " with arguments " + jasmine.pp(expectedArgs),
            "Expected spy " + this.actual.identity + " not to have been called in the context of " + jasmine.pp(expectedObject) + " with arguments " + jasmine.pp(expectedArgs)
          ];
        }
      };

      for (var i = 0; i < spy.calls.length; i++) {
        var objectMatches = spy.calls[i].object === expectedObject;
        var argsMatches = expectedArgs === undefined || this.env.equals_(spy.calls[i].args, expectedArgs);
        if (objectMatches && argsMatches) {
          return true;
        }
      }
      return false;
    }
  });
});