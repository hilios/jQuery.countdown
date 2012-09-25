describe("jquery.countdown", function() {
  var $selector,
      callback = jasmine.createSpy('callback');
      
  function setCountdown() {
    var toDate = arguments.length == 0 ? new Date() : arguments[0];
    $selector.countdown(toDate, callback);
  }
  
  beforeEach(function() {
    $selector = $('<div id="clock" />').appendTo('body');  
  });
  
  afterEach(function() {
    $selector.remove();
    callback.reset();
  });
  
  it('should create the DOM used for the test', function() {
    var node = document.getElementById($selector.attr('id'));
    expect(node).toBeDefined();
    expect(node).not.toBeNull();
    expect($selector.length).toBe(1);
  });
  
  it('should create the countdown function on jquery namespace', function() {
    expect($.fn.countdown).toBeDefined();
  });
  
  it('should assign the countdown to a selector', function() {
    spyOn($.fn, "countdown")
  });
  
  describe('toDate conversion', function() {
    it('should accept `YYYY/MM/DD`', function() {
      setCountdown("2015/10/20");
      
      waitsFor(function() {
        return callback.callCount > 0;
      });
      
      runs(function() {
        expect(callback.mostRecentCall.args[0]["toDate"] instanceof Date).toBeTruthy();
        expect(callback.mostRecentCall.args[0]["toDate"].valueOf()).toBe(new Date(2015, 9, 20).valueOf());
      });
    });
    
    it('should accept `MM/DD/YYYY`', function() {
      setCountdown("10/20/2015");
      
      waitsFor(function() {
        return callback.callCount > 0;
      });
      
      runs(function() {
        expect(callback.mostRecentCall.args[0]["toDate"] instanceof Date).toBeTruthy();
        expect(callback.mostRecentCall.args[0]["toDate"].valueOf()).toBe(new Date(2015, 9, 20).valueOf());
      });
    });
    
    it('should accept `YYYY/MM/DD hh:mm:ss`', function() {
      setCountdown("2015/10/20 11:22:33");
      
      waitsFor(function() {
        return callback.callCount > 0;
      });
      
      runs(function() {
        expect(callback.mostRecentCall.args[0]["toDate"] instanceof Date).toBeTruthy();
        expect(callback.mostRecentCall.args[0]["toDate"].valueOf()).toBe(new Date(2015, 9, 20, 11, 22, 33).valueOf());
      });
    });
    
    it('should accept `MM/DD/YYYY hh:mm:ss`', function() {
      setCountdown("10/20/2015 11:22:33");
      
      waitsFor(function() {
        return callback.callCount > 0;
      });
      
      runs(function() {
        expect(callback.mostRecentCall.args[0]["toDate"] instanceof Date).toBeTruthy();
        expect(callback.mostRecentCall.args[0]["toDate"].valueOf()).toBe(new Date(2015, 9, 20, 11, 22, 33).valueOf());
      });
    });
    
    it('should accept the millisecond value', function() {
      var msec = Math.pow(10, 13);
      setCountdown(msec);
      
      waitsFor(function() {
        return callback.callCount > 0;
      });
      
      runs(function() {
        expect(callback.mostRecentCall.args[0]["toDate"] instanceof Date).toBeTruthy();
        expect(callback.mostRecentCall.args[0]["toDate"].valueOf()).toBe(new Date(msec).valueOf());
      });
    });
    
    it('should accept Date object', function() {
      var toDate = new Date(2015, 9, 20, 11, 22, 33);
      setCountdown(toDate);
      
      waitsFor(function() {
        return callback.callCount > 0;
      });
      
      runs(function() {
        expect(callback.mostRecentCall.args[0]["toDate"] instanceof Date).toBeTruthy();
        expect(callback.mostRecentCall.args[0]["toDate"].valueOf()).toBe(toDate.valueOf());
      });
    });
    
    it('should accept UTC time as well', function() {
      setCountdown("2015/10/20 11:22:33 UTC");
      
      waitsFor(function() {
        return callback.callCount > 0;
      });
      
      runs(function() {
        expect(callback.mostRecentCall.args[0]["toDate"] instanceof Date).toBeTruthy();
        expect(callback.mostRecentCall.args[0]["toDate"].valueOf()).toBe(Date.UTC(2015, 9, 20, 11, 22, 33).valueOf());
      });
    });
    
    it('should throw exception with bad formatted date string', function() {
      expect(function() { setCountdown("adc") }).toThrow();
    });
  });
  
  describe('event', function() {
    beforeEach(function() {
      setCountdown();

      waitsFor(function() {
        return callback.callCount > 0;
      });
    });
    
    it('should call the callback function with an event has argument', function() {
      runs(function() {
        expect(callback).toHaveBeenCalled();
        expect(callback.mostRecentCall.args.length).toBe(1);
        expect(callback.mostRecentCall.args[0] instanceof jQuery.Event).toBeTruthy();
      });
    });
    
    it('should have the `type` property', function() {
      runs(function() {
        expect(callback.mostRecentCall.args[0]["type"]).toBeDefined();
      });
    });
    
    it('should have the `value` property', function() {
      runs(function() {
        expect(callback.mostRecentCall.args[0]["value"]).toBeDefined();
      });
    });
    
    it('should have the `date` property', function() {
      runs(function() {
        expect(callback.mostRecentCall.args[0]["date"]).toBeDefined();
        expect(callback.mostRecentCall.args[0]["date"] instanceof Date).toBeTruthy();
      });
    });
    
    it('should have the `lasting` property', function() {
      runs(function() {
        expect(callback.mostRecentCall.args[0]["lasting"]).toBeDefined();
        expect(callback.mostRecentCall.args[0]["lasting"] instanceof Object).toBeTruthy();
        
        expect("seconds"  in callback.mostRecentCall.args[0]["lasting"]).toBeTruthy();
        expect("minutes"  in callback.mostRecentCall.args[0]["lasting"]).toBeTruthy();
        expect("hours"    in callback.mostRecentCall.args[0]["lasting"]).toBeTruthy();
        expect("days"     in callback.mostRecentCall.args[0]["lasting"]).toBeTruthy();
        expect("weeks"    in callback.mostRecentCall.args[0]["lasting"]).toBeTruthy();
        expect("daysLeft" in callback.mostRecentCall.args[0]["lasting"]).toBeTruthy();
      });
    });
  });
  
  describe('events handlers', function() {
    // Takes too long to execute!!!
    it('should call the `seconds` and `minutes` events', function() {
      var secondsOffset = 65;
      setCountdown(new Date(new Date().valueOf() + secondsOffset * 1000));
      
      waits(secondsOffset * 1000);
      
      runs(function() {
        expect(callback.argsForCall[0][0]["type"]).toBe("seconds");
        expect(callback.callCount).toBeGreaterThan(4); // Should read >= 5
        var secondsEventsOccured = 0,
            minutesEventsOccured = 0;
        for(var i = 0; i < callback.argsForCall.length; ++i) {
          switch(callback.argsForCall[i][0]["type"]) {
            case "seconds":
              ++secondsEventsOccured;
              break;
            case "minutes":
              ++minutesEventsOccured;
              break;
          }
        }
        expect(secondsEventsOccured).toBe(secondsOffset);
        expect(minutesEventsOccured).toBeGreaterThan(Math.floor(secondsOffset / 60));
      });
    });
    
    it('should call the `finished` event when countdown ends', function() {
      setCountdown();

      waitsFor(function() {
        return callback.callCount > 0;
      });
      
      runs(function() {
        expect(callback.mostRecentCall.args[0]["type"]).toBe("finished");
      });
    });
    
    describe('to prevent memory leak', function() {
      it('should remove the countdown when selector is removed and dispatch an `removed` event', function() {
        var twoSecondsFromNow = new Date().valueOf() + 2 * 1000;

        setCountdown(twoSecondsFromNow);
        $selector.remove();

        waits(3 * 1000);

        runs(function() {
          var removedEvent = 0;
          for(var i = 0; i < callback.argsForCall.length; ++i) {
            if(callback.argsForCall[i][0]["type"] == "removed") {
              ++removedEvent;
            }
          }
          expect(removedEvent).toBeGreaterThan(1);
        });
      });
    });
  });
});