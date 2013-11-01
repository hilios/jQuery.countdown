/*
 * jQuery The Final Countdown plugin v2.0.1
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
 // AMD support (Thanks to @FagnerMartinsBrack)
;(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(jQuery);
    }
})(function($){
    'use strict';
    
    var PRECISION   = 100; // 0.1 seconds, used to update the DOM
    var instances   = [],
        matchers    = [];
    // Miliseconds
    matchers.push(/^[0-9]*$/.source);
    // Month/Day/Year [hours:minutes:seconds
    matchers.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source);
    // Year/Day/Month [hours:minutes:seconds
    matchers.push(/[0-9]{4}(\/[0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source);
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
            // final casting (Thanks to @msigley)
            if(String(dateString).match(/^[0-9]*$/)) {
                dateString = Number(dateString);
            }
            return new Date(dateString);
        } else {
            throw new Error("Couldn't cast `" + dateString +
                "` to a date object.");
        }
    }
    var DIRECTIVE_KEY_MAP = {
        'Y': 'years',
        'm': 'months',
        'w': 'weeks',
        'd': 'days',
        'D': 'totalDays',
        'H': 'hours',
        'M': 'minutes',
        'S': 'seconds'
    };
    // Time string formatter 
    function strftime(offsetObject) {
        return function(format) {
            var directives = format.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
            if(directives) {
                for(var i = 0, len = directives.length; i < len; ++i) {
                    var directive   = directives[i]
                            .match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),
                        regexp      = new RegExp(directive[0]),
                        modifier    = directive[1] || '',
                        plural      = directive[3] || '',
                        value       = null;
                        // Get the key
                        directive = directive[2];
                    // Swap shot-versions directives
                    if(DIRECTIVE_KEY_MAP.hasOwnProperty(directive)) {
                        value = DIRECTIVE_KEY_MAP[directive];
                        value = Number(offsetObject[value]);
                    }
                    if(value !== null) {
                        // Pluralize
                        if(modifier === '!') {
                            value = pluralize(plural, value);
                        }
                        // Add zero-padding
                        if(modifier === '') {
                            if(value < 10) {
                                value = '0' + value.toString();
                            }
                        }
                        // Replace the directive
                        format = format.replace(regexp, value.toString());
                    }
                }
            }
            format = format.replace(/%%/, '%');
            return format;
        };
    }
    // Pluralize
    function pluralize(format, count) {
        var plural = 's', singular = '';
        if(format) {
            format = format.replace(/(:|;|\s)/gi, '').split(/\,/);
            if(format.length === 1) {
                plural = format[0];
            } else {
                singular = format[0];
                plural = format[1];
            }
        }
        if(Math.abs(count) === 1) {
            return singular;
        } else {
            return plural;
        }
    }
    // The Final Countdown
    var Countdown = function(el, finalDate, callback) {
        this.el             = el;
        this.$el            = $(el);
        this.interval       = null;
        this.offset         = {};
        // Set the final date
        this.setFinalDate(finalDate);
        // Register this instance
        this.instanceNumber = instances.length;
        instances.push(this);
        // Save the reference
        this.$el.data('countdown-instance', this.instanceNumber);
        // Register the callbacks when supplied
        if(callback) {
            this.$el.on('update.countdown', callback);
            this.$el.on('stoped.countdown', callback);
            this.$el.on('finish.countdown', callback);
        }
        this.start();
    };
    $.extend(Countdown.prototype, {
        start: function() {
            if(this.interval !== null) {
                throw new Error("Countdown is already running!");
            }
            var self = this;
            this.update();
            this.interval = setInterval(function() {
                self.update.call(self);
            }, PRECISION);
        },
        stop: function() {
            clearInterval(this.interval);
            this.interval = null;
            this.dispatchEvent('stoped');
        },
        pause: function() {
            this.stop.call(this);
        },
        resume: function() {
            this.start.call(this);
        },
        remove: function() {
            this.stop();
            delete instances[this.instanceNumber];
        },
        setFinalDate: function(value) {
            this.finalDate = parseDateString(value); // Cast the given date
        },
        update: function() {
            // Stop if dom is not in the html (Thanks to @dleavitt)
            if(this.$el.closest('html').length === 0) {
                this.remove();
                return;
            }
            // Calculate the remaining time
            this.totalSecsLeft = this.finalDate.valueOf() - 
                new Date().valueOf(); // In miliseconds
            this.totalSecsLeft = Math.ceil(this.totalSecsLeft / 1000);
            this.totalSecsLeft = this.totalSecsLeft < 0 ? 
                0 : this.totalSecsLeft;
            // Calculate the offsets
            this.offset = {
                seconds     : this.totalSecsLeft % 60,
                minutes     : Math.floor(this.totalSecsLeft / 60) % 60,
                hours       : Math.floor(this.totalSecsLeft / 60 / 60) % 24,
                days        : Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                totalDays   : Math.floor(this.totalSecsLeft / 60 / 60 / 24),
                weeks       : Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
                months      : Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30),
                years       : Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 365)
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
            event.finalDate     = this.finalDate;
            event.offset        = $.extend({}, this.offset);
        event.strftime      = strftime(this.offset);
            this.$el.trigger(event);
        }
    });
    // Register the jQuery selector actions
    $.fn.countdown = function() {
        var argumentsArray = Array.prototype.slice.call(arguments, 0);
        return this.each(function() {
            var instanceNumber = $(this).data('countdown-instance');
            // Verify if we already have a countdown for this node ...
            if(instanceNumber) {
                var instance = instances[instanceNumber],
                    method = argumentsArray[0];
                // If method exists in the prototype execute
                if(Countdown.prototype.hasOwnProperty(method)) {
                    instance[method].apply(instance, 
                        argumentsArray.slice(1));
                // If method look like a date try to set a new final date
                } else if(String(method).match(/^[$A-Z_][0-9A-Z_$]*$/i) === null) {
                    instance.setFinalDate.call(instance, 
                        method);
                } else {
                    $.error('Method %s does not exist on jQuery.countdown'.
                        replace(/\%s/gi, method));
                }
            } else {
                // ... if not we create an instance
                new Countdown(this, argumentsArray[0], argumentsArray[1]);
            }
        });
    };
});