/*
jquery.get-enhanced plugin v0.10
---
https://github.com/benbarnett/jQuery-Get-Enhanced
http://benbarnett.net
@benpbarnett
---
Copyright (c) 2011 Ben Barnett

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
---
Extends jQuery.get() to enable selector support for page fragments.
Tested with jQuery 1.3.2+
*/

(function($, oldGet) {
	/**
		Extend jQuery.get() to include selector support
		@author Ben Barnett
	*/
	
	
	/**
		@public
		@name get
		@function
		@description Load data from the server using a HTTP GET request. With Selector support.
		@param {string} [url] A string containing the URL to which the request is sent.
		@param {object} [data] A map or string that is sent to the server with the request.
		@param {function} [callback] A callback function that is executed if the request succeeds.
		@param {type} [string] The type of data expected from the server.
	*/
	$.get = function ( url, data, callback, type ) {
		// check if there's a selector in the url
		var off = url.indexOf(" ");
		if ( off >= 0 ) {
			var selector = url.slice(off, url.length);
			url = url.slice(0, off);
		}
		else {
			// throw back to original method if not
			return oldGet.apply(this, arguments);
		}
		
		
		// parameter shifting (as per native method)
		if ( $.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = null;
		}
		
		
		// perform the request
		var self = this,
			rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
		
		return $.ajax({
			type: "GET",
			url: url,
			data: data,
			success: function(res, status) {
				var slicer = '';
				
				if ( status === "success" || status === "notmodified" ) {						
					slicer = $("<div>")
						// inject the contents of the document in, removing the scripts
						// to avoid any 'Permission Denied' errors in IE
						.append(res.replace(rscript, ""))

						// Locate the specified elements
						.find(selector)
						
						// get HTML
						.html();
				}
				
				if ( callback ) {
					callback.apply(this, [slicer, status, res]);
				}
			},
			dataType: type
		});
	};
})(jQuery, jQuery.get);