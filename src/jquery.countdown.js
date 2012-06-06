/*
 * jQuery The Final Countdown plugin v1.0.0 beta
 * http://github.com/hilios/jquery.countdown
 *
 * Copyright (c) 2011 Edson Hilios
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
(function($) {
  
  $.fn.countdown = function(toDate, callback) {
    var handlers = ['seconds', 'minutes', 'hours', 'days', 'weeks', 'daysLeft'];
    
    function delegate(scope, method) {
      return function() { return method.call(scope) }
    }
    
    return this.each(function() {
      // Convert
      if(!(toDate instanceof Date)) {
        if(String(toDate).match(/^[0-9]*$/)) {
          toDate = new Date(toDate);
        } else if( toDate.match(/([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})\s([0-9]{1,2})\:([0-9]{2})\:([0-9]{2})/) ||
            toDate.match(/([0-9]{2,4})\/([0-9]{1,2})\/([0-9]{1,2})\s([0-9]{1,2})\:([0-9]{2})\:([0-9]{2})/)
            ) {
          toDate = new Date(toDate);
        } else if(toDate.match(/([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})/) || 
                  toDate.match(/([0-9]{2,4})\/([0-9]{1,2})\/([0-9]{1,2})/)
                  ) {
          toDate = new Date(toDate)
        } else {
          throw new Error("Doesn't seen to be a valid date object or string")
        }
      }
      
      var $this = $(this),
          values = {},
          lasting = {},
          interval = $this.data('countdownInterval'),
          currentDate = new Date(),
          secondsLeft = Math.floor((toDate.valueOf() - currentDate.valueOf()) / 1000);
      
      function triggerEvents() {
        secondsLeft--;
        if(secondsLeft < 0) {
          secondsLeft = 0;
        }
        lasting = {
          seconds : secondsLeft % 60,
          minutes : Math.floor(secondsLeft / 60) % 60,
          hours   : Math.floor(secondsLeft / 60 / 60) % 24,
          days    : Math.floor(secondsLeft / 60 / 60 / 24),
          weeks   : Math.floor(secondsLeft / 60 / 60 / 24 / 7),
          daysLeft: Math.floor(secondsLeft / 60 / 60 / 24) % 7
        }
        for(var i=0; i<handlers.length; i++) {
          var eventName = handlers[i];
          if(values[eventName] != lasting[eventName]) {
            values[eventName] = lasting[eventName];
            dispatchEvent(eventName);
          }
        }
        if(secondsLeft == 0) { 
          stop();
          dispatchEvent('finished');
        }
      }
      triggerEvents();
      
      function dispatchEvent(eventName) {
        var event = $.Event(eventName);
        event.date  = new Date(new Date().valueOf() + secondsLeft);
        event.value = values[eventName] || "0";
        event.toDate = toDate;
        event.lasting = lasting;
        switch(eventName) {
          case "seconds":
          case "minutes":
          case "hours":
            event.value = event.value < 10 ? '0'+event.value.toString() : event.value.toString();
            break;
          default:
            if(event.value) {
              event.value = event.value.toString();
            }
            break;
        }
        callback.call($this, event);
      }
      
      $this.bind('remove', function() {
        stop(); // If the selector is removed clear the interval for memory sake!
        dispatchEvent('removed');
      });
      
      function stop() {
        clearInterval(interval);
      }

      function start() {
        $this.data('countdownInterval', setInterval(delegate($this, triggerEvents), 1000));
        interval = $this.data('countdownInterval');
      }
      
      if(interval) stop();
      start();
    });
  }
  // Wrap the remove method to trigger an event when called
  var removeEvent = new $.Event('remove'),
      removeFunction = $.fn.remove;
  $.fn.remove = function() {
    $(this).trigger(removeEvent);
    return removeFunction.apply(this, arguments);
  }
})(jQuery);