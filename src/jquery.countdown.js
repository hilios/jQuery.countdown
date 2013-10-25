/*
 * jQuery The Final Countdown plugin v2.0.0
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
 // AMD support
;(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(jQuery);
    }
})(function($){
    var PRECISION = 100; // 0.1 seconds
    var instances  = {},
        matchers   = [];
    // Miliseconds
    matchers.push(/^[0-9]*$/.source);
    // Month/Day/Year hours:minutes:seconds
    matchers.push(/([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})\s([0-9]{1,2})\:([0-9]{2})\:([0-9]{2})/.source);
    matchers.push(/([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})/.source);
    // Year/Day/Month hours:minutes:seconds
    matchers.push(/([0-9]{2,4})\/([0-9]{1,2})\/([0-9]{1,2})\s([0-9]{1,2})\:([0-9]{2})\:([0-9]{2})/.source);
    matchers.push(/([0-9]{2,4})\/([0-9]{1,2})\/([0-9]{1,2})/.source);
    // Cast the matchers to a regular expression object
    matchers = new RegExp(matchers.join("|"));
    // Parse a Date formatted has String to a native object
    function parseDateString(dateString) {
        // Pass through when a native object is sent 
        if(dateString instanceof Date) {
            return dateString;
        }
        // Caste string to date object
        if(String(dateString).match(matchers)) {
            // If looks like a milisecond value cast to number before 
            // final casting
            if(String(dateString).match(/^[0-9]*$/)) {
                dateString = Number(dateString);
            }
            return new Date(dateString);
        } else {
            throw new Error("Couldn't cast `" + dateString +
                "` to a date object.");
        }
    }
    // The Final Countdown
    var Countdown = function(el, finalDate, callback) {
        this.el             = el;
        this.$el            = $(el);
        this.interval       = null;
        this.offset         = {};
        this.currentDate    = new Date();
        this.finalDate      = parseDateString(finalDate); // Cast the given date
        this.totalSecsLeft  = Math.floor((this.finalDate.valueOf() - 
            this.currentDate.valueOf()) / 1000);

        if(callback) {
            this.$el.on('update.countdown', callback);
            this.$el.on('stoped.countdown', callback);
            this.$el.on('finish.countdown', callback);
        }

        this.start();
    };
    $.extend(Countdown.prototype, {
        start: function() {
            var self = this;
            this.update();
            this.interval = setInterval(function() {
                self.update.call(self);
            }, PRECISION);
        },
        stop: function() {
            clearInterval(this.interval);
            this.dispatchEvent('stoped');
        },
        remove: function() {
            this.stop();
            delete instances[this.el];
        },
        update: function() {
            // Stop if dom is not in the html
            if(this.$el.closest('html').length === 0) {
                this.remove();
                return;
            }
            // Calculate the remaining time
            this.totalSecsLeft -= 1;
            this.totalSecsLeft = this.totalSecsLeft < 0 ? 
                0 : this.totalSecsLeft;
            this.offset = {
                seconds : this.totalSecsLeft % 60,
                minutes : Math.floor(this.totalSecsLeft / 60) % 60,
                hours   : Math.floor(this.totalSecsLeft / 60 / 60) % 24,
                days    : Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                weeks   : Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
                fullDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24)
            };
            // Dispatch an event
            if(this.totalSecsLeft === 0) {
                this.stop();
                this.dispatchEvent('finish');
            } else {
                this.dispatchEvent('update');
            }
        },
        dispatchEvent: function(eventName) {
            var event = $.Event(eventName + '.countdown');
            event.currentDate  = new Date(new Date().valueOf() + 
                this.totalSecsLeft);
            event.finalDate    = this.finalDate;
            event.offset       = this.offset;
            this.$el.trigger(event);
        }
    });
    // Register the jQuery selector actions
    $.fn.countdown = function() {
        var argumentsArray = Array.prototype.slice.call(arguments, 0);
        return this.each(function() {
            if(instances.hasOwnProperty(this)) {
                var method = argumentsArray[0];
                if(Countdown.prototype[method]) {
                    return instances[this][method].apply(instances[this], 
                        argumentsArray.slice(1));
                } else {
                    $.error('Method %s does not exist on jQuery.countdown'.
                        replace(/\%s/gi, method));
                }
            } else {
                instances[this] = new Countdown(this, argumentsArray[0], 
                    argumentsArray[1]);
            }
        });
    };
});