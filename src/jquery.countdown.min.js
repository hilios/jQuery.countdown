/*
 * jQuery The Final Countdown plugin v1.0.0
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
(function(h){h.fn.countdown=function(a,l){function m(a,d){return function(){return d.call(a)}}var k="seconds minutes hours days weeks daysLeft".split(" ");return this.each(function(){function j(){if(0===e.closest("html").length)clearInterval(f),d("removed");else{c--;0>c&&(c=0);g={seconds:c%60,minutes:Math.floor(c/60)%60,hours:Math.floor(c/60/60)%24,days:Math.floor(c/60/60/24),weeks:Math.floor(c/60/60/24/7),daysLeft:Math.floor(c/60/60/24)%7};for(var a=0;a<k.length;a++){var b=k[a];i[b]!=g[b]&&(i[b]=g[b],d(b))}0==c&&(clearInterval(f),d("finished"))}}function d(d){var b=h.Event(d);b.date=new Date((new Date).valueOf()+c);b.value=i[d]||"0";b.toDate=a;b.lasting=g;switch(d){case "seconds":case "minutes":case "hours":b.value=10>b.value?"0"+b.value.toString():b.value.toString();break;default:b.value&&(b.value=b.value.toString())}l.call(e,b)}if(!(a instanceof Date))if(String(a).match(/^[0-9]*$/))a=new Date(a);else if(a.match(/([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})\s([0-9]{1,2})\:([0-9]{2})\:([0-9]{2})/)||a.match(/([0-9]{2,4})\/([0-9]{1,2})\/([0-9]{1,2})\s([0-9]{1,2})\:([0-9]{2})\:([0-9]{2})/))a=new Date(a);else if(a.match(/([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})/)||a.match(/([0-9]{2,4})\/([0-9]{1,2})\/([0-9]{1,2})/))a=new Date(a);else throw Error("Doesn't seen to be a valid date object or string");var e=h(this),i={},g={},f=e.data("countdownInterval"),c=Math.floor((a.valueOf()-(new Date).valueOf())/1E3);j();f&&clearInterval(f);e.data("countdownInterval",setInterval(m(e,j),1E3));f=e.data("countdownInterval")})}})(jQuery);