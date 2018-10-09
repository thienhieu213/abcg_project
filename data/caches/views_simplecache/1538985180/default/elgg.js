/**
 * We use a named AMD module that is inlined in elgg.js, as this module is
 * loaded on each page request and we do not want to issue an additional HTTP request
 *
 * @module elgg/popup
 * @since 2.2
 */
define('elgg/popup', ['elgg', 'jquery', 'jquery-ui'], function (elgg, $) {

	var popup = {
		/**
		 * Initializes a popup module and binds an event to hide visible popup
		 * modules on a click event outside of their DOM stack.
		 *
		 * This method is called before the popup module is displayed.
		 *
		 * @return void
		 */
		init: function () {
			$(document).on('click', function (e) {
				if (e.isDefaultPrevented()) {
					return;
				}
				var $eventTargets = $(e.target).parents().andSelf();
				if ($eventTargets.is('.elgg-state-popped')) {
					return;
				}
				popup.close();
			});
			// Bind events only once
			popup.init = elgg.nullFunction;
		},
		/**
		 * Shortcut to bind a click event on a set of $triggers.
		 *
		 * Set the '[rel="popup"]' of the $trigger and set the href to target the
		 * item you want to toggle (<a rel="popup" href="#id-of-target">).
		 *
		 * This method is called by core JS UI library for all [rel="popup"] elements,
		 * but can be called by plugins to bind other triggers.
		 *
		 * @param {jQuery} $triggers A set of triggers to bind
		 * @return void
		 */
		bind: function ($triggers) {
			$triggers.off('click.popup')
					.on('click.popup', function (e) {
						if (e.isDefaultPrevented()) {
							return;
						}
						e.preventDefault();
						e.stopPropagation();
						popup.open($(this));
					});
		},
		/**
		 * Shows a $target element at a given position
		 * If no $target element is provided, determines it by parsing hash from href attribute of the $trigger
		 *
		 * This function emits the getOptions, ui.popup hook that plugins can register for to provide custom
		 * positioning for elements.  The handler is passed the following params:
		 *	targetSelector: The selector used to find the popup
		 *	target:         The popup jQuery element as found by the selector
		 *	source:         The jquery element whose click event initiated a popup.
		 *
		 * The return value of the function is used as the options object to .position().
		 * Handles can also return false to abort the default behvior and override it with their own.
		 *
		 * @param {jQuery} $trigger Trigger element
		 * @param {jQuery} $target  Target popup module
		 * @param {object} position Positioning data of the $target module
		 * @return void
		 */
		open: function ($trigger, $target, position) {
			if (typeof $trigger === 'undefined' || !$trigger.length) {
				return;
			}

			if (typeof $target === 'undefined') {
				var href = $trigger.attr('href') || $trigger.data('href') || '';
				var targetSelector = elgg.getSelectorFromUrlFragment(href);
				$target = $(targetSelector);
			} else {
				$target.uniqueId();
				var targetSelector = '#' + $target.attr('id');
			}

			if (!$target.length) {
				return;
			}

			// emit a hook to allow plugins to position and control popups
			var params = {
				targetSelector: targetSelector,
				target: $target,
				source: $trigger
			};

			position = position || {
				my: 'center top',
				at: 'center bottom',
				of: $trigger,
				collision: 'fit fit'
			};

			$.extend(position, $trigger.data('position'));

			position = elgg.trigger_hook('getOptions', 'ui.popup', params, position);

			if (!position) {
				return;
			}

			popup.init();

			// If the user is clicking on the trigger while the popup is open
			// we should just close the popup
			if ($target.is('.elgg-state-popped')) {
				popup.close($target);
				return;
			}
			
			popup.close(); // close any open popup modules

			$target.data('trigger', $trigger); // used to remove elgg-state-active class when popup is closed
			$target.data('position', position); // used to reposition the popup module on window manipulations

			if (!$trigger.is('.elgg-popup-inline')) {
				$target.appendTo('body');
			}
			
			// need to do a double position because of positioning issues during fadeIn() in Opera
			// https://github.com/Elgg/Elgg/issues/6452
			$target.position(position).fadeIn()
				   .addClass('elgg-state-active elgg-state-popped')
				   .position(position);

			$trigger.addClass('elgg-state-active');

			$target.trigger('open');
		},
		/**
		 * Hides a set of $targets. If not defined, closes all visible popup modules.
		 *
		 * @param {jQuery} $targets Popup modules to hide
		 * @return void
		 */
		close: function ($targets) {
			if (typeof $targets === 'undefined') {
				$targets = $('.elgg-state-popped');
			}
			if (!$targets.length) {
				return;
			}
			$targets.each(function () {
				var $target = $(this);
				if (!$target.is(':visible')) {
					return;
				}

				var $trigger = $target.data('trigger');
				if ($trigger.length) {
					$trigger.removeClass('elgg-state-active');
				}

				// @todo: use css transitions instead of $.fadeOut()
				$target.fadeOut().removeClass('elgg-state-active elgg-state-popped');

				$target.trigger('close');
			});
		}
	};

	return popup;
});
/**
 * @namespace Singleton object for holding the Elgg javascript library
 */
var elgg = elgg || {};

/**
 * Pointer to the global context
 *
 * @see elgg.require
 * @see elgg.provide
 */
elgg.global = this;

/**
 * Duplicate of the server side ACCESS_PRIVATE access level.
 *
 * This is a temporary hack to prevent having to mix up js and PHP in js views.
 */
elgg.ACCESS_PRIVATE = 0;

/**
 * Convenience reference to an empty function.
 *
 * Save memory by not generating multiple empty functions.
 */
elgg.nullFunction = function() {};

/**
 * This forces an inheriting class to implement the method or
 * it will throw an error.
 *
 * @example
 * AbstractClass.prototype.toBeImplemented = elgg.abstractMethod;
 */
elgg.abstractMethod = function() {
	throw new Error("Oops... you forgot to implement an abstract method!");
};

/**
 * Merges two or more objects together and returns the result.
 */
elgg.extend = jQuery.extend;

/**
 * Check if the value is an array.
 *
 * No sense in reinventing the wheel!
 *
 * @param {*} val
 *
 * @return boolean
 */
elgg.isArray = jQuery.isArray;

/**
 * Check if the value is a function.
 *
 * No sense in reinventing the wheel!
 *
 * @param {*} val
 *
 * @return boolean
 */
elgg.isFunction = jQuery.isFunction;

/**
 * Check if the value is a "plain" object (i.e., created by {} or new Object())
 *
 * No sense in reinventing the wheel!
 *
 * @param {*} val
 *
 * @return boolean
 */
elgg.isPlainObject = jQuery.isPlainObject;

/**
 * Check if the value is a string
 *
 * @param {*} val
 *
 * @return boolean
 */
elgg.isString = function(val) {
	return typeof val === 'string';
};

/**
 * Check if the value is a number
 *
 * @param {*} val
 *
 * @return boolean
 */
elgg.isNumber = function(val) {
	return typeof val === 'number';
};

/**
 * Check if the value is an object
 *
 * @note This returns true for functions and arrays!  If you want to return true only
 * for "plain" objects (created using {} or new Object()) use elgg.isPlainObject.
 *
 * @param {*} val
 *
 * @return boolean
 */
elgg.isObject = function(val) {
	return typeof val === 'object';
};

/**
 * Check if the value is undefined
 *
 * @param {*} val
 *
 * @return boolean
 */
elgg.isUndefined = function(val) {
	return val === undefined;
};

/**
 * Check if the value is null
 *
 * @param {*} val
 *
 * @return boolean
 */
elgg.isNull = function(val) {
	return val === null;
};

/**
 * Check if the value is either null or undefined
 *
 * @param {*} val
 *
 * @return boolean
 */
elgg.isNullOrUndefined = function(val) {
	return val == null;
};

/**
 * Throw an exception of the type doesn't match
 *
 * @todo Might be more appropriate for debug mode only?
 */
elgg.assertTypeOf = function(type, val) {
	if (typeof val !== type) {
		throw new TypeError("Expecting param of " +
							arguments.caller + "to be a(n) " + type + "." +
							"  Was actually a(n) " + typeof val + ".");
	}
};

/**
 * Throw an error if the required package isn't present
 *
 * @param {String} pkg The required package (e.g., 'elgg.package')
 */
elgg.require = function(pkg) {
	elgg.assertTypeOf('string', pkg);

	var parts = pkg.split('.'),
		cur = elgg.global,
		part, i;

	for (i = 0; i < parts.length; i += 1) {
		part = parts[i];
		cur = cur[part];
		if (elgg.isUndefined(cur)) {
			throw new Error("Missing package: " + pkg);
		}
	}
};

/**
 * Generate the skeleton for a package.
 *
 * <pre>
 * elgg.provide('elgg.package.subpackage');
 * </pre>
 *
 * is equivalent to
 *
 * <pre>
 * elgg = elgg || {};
 * elgg.package = elgg.package || {};
 * elgg.package.subpackage = elgg.package.subpackage || {};
 * </pre>
 *
 * An array package name can be given if any subpackage names need to contain a period.
 *
 * <pre>
 * elgg.provide(['one', 'two.three']);
 * </pre>
 *
 * is equivalent to
 *
 * one = one || {};
 * one['two.three'] = one['two.three'] || {};
 *
 * @example elgg.provide('elgg.config.translations')
 *
 * @param {String|Array} pkg The package name. Only use an array if a subpackage name needs to contain a period.
 *
 * @param {Object} opt_context The object to extend (defaults to this)
 */
elgg.provide = function(pkg, opt_context) {
	var parts,
		context = opt_context || elgg.global,
		part, i;

	if (elgg.isArray(pkg)) {
		parts = pkg;
	} else {
		elgg.assertTypeOf('string', pkg);
		parts = pkg.split('.');
	}

	for (i = 0; i < parts.length; i += 1) {
		part = parts[i];
		context[part] = context[part] || {};
		context = context[part];
	}
};

/**
 * Inherit the prototype methods from one constructor into another.
 *
 * @example
 * <pre>
 * function ParentClass(a, b) { }
 *
 * ParentClass.prototype.foo = function(a) { alert(a); }
 *
 * function ChildClass(a, b, c) {
 *     //equivalent of parent::__construct(a, b); in PHP
 *     ParentClass.call(this, a, b);
 * }
 *
 * elgg.inherit(ChildClass, ParentClass);
 *
 * var child = new ChildClass('a', 'b', 'see');
 * child.foo('boo!'); // alert('boo!');
 * </pre>
 *
 * @param {Function} Child Child class constructor.
 * @param {Function} Parent Parent class constructor.
 */
elgg.inherit = function(Child, Parent) {
	Child.prototype = new Parent();
	Child.prototype.constructor = Child;
};

/**
 * Converts shorthand urls to absolute urls.
 *
 * If the url is already absolute or protocol-relative, no change is made.
 *
 * elgg.normalize_url('');                   // 'http://my.site.com/'
 * elgg.normalize_url('dashboard');          // 'http://my.site.com/dashboard'
 * elgg.normalize_url('http://google.com/'); // no change
 * elgg.normalize_url('//google.com/');      // no change
 *
 * @param {String} url The url to normalize
 * @return {String} The extended url
 */
elgg.normalize_url = function(url) {
	url = url || '';
	elgg.assertTypeOf('string', url);

	function validate(url) {
		url = elgg.parse_url(url);
		if (url.scheme) {
			url.scheme = url.scheme.toLowerCase();
		}
		if (url.scheme == 'http' || url.scheme == 'https') {
			if (!url.host) {
				return false;
			}
			/* hostname labels may contain only alphanumeric characters, dots and hypens. */
			if (!(new RegExp("^([a-zA-Z0-9][a-zA-Z0-9\\-\\.]*)$", "i")).test(url.host) || url.host.charAt(-1) == '.') {
				return false;
			}
		}
		/* some schemas allow the host to be empty */
		if (!url.scheme || !url.host && url.scheme != 'mailto' && url.scheme != 'news' && url.scheme != 'file') {
			return false;
		}
		return true;
	};

	// ignore anything with a recognized scheme
	if (url.indexOf('http:') === 0 || url.indexOf('https:') === 0 || url.indexOf('javascript:') === 0 || url.indexOf('mailto:') === 0 ) {
		return url;
	} else if (validate(url)) {
		// all normal URLs including mailto:
		return url;
	} else if ((new RegExp("^(\\#|\\?|//)", "i")).test(url)) {
		// '//example.com' (Shortcut for protocol.)
		// '?query=test', #target
		return url;
	} else if ((new RegExp("^[^\/]*\\.php(\\?.*)?$", "i")).test(url)) {
		// watch those double escapes in JS.
		// 'install.php', 'install.php?step=step'
		return elgg.config.wwwroot + url.ltrim('/');
	} else if ((new RegExp("^[^/]*\\.", "i")).test(url)) {
		// 'example.com', 'example.com/subpage'
		return 'http://' + url;
	} else {
		// 'page/handler', 'mod/plugin/file.php'
		// trim off any leading / because the site URL is stored
		// with a trailing /
		return elgg.config.wwwroot + url.ltrim('/');
	}
};

/**
 * Displays system messages via javascript rather than php.
 *
 * @param {String} msgs The message we want to display
 * @param {Number} delay The amount of time to display the message in milliseconds. Defaults to 6 seconds.
 * @param {String} type The type of message (typically 'error' or 'message')
 * @private
 */
elgg.system_messages = function(msgs, delay, type) {
	if (elgg.isUndefined(msgs)) {
		return;
	}

	var classes = ['elgg-message'],
		messages_html = [],
		appendMessage = function(msg) {
			messages_html.push('<li><div class="' + classes.join(' ') + '"><div class="elgg-inner"><div class="elgg-body">' + msg + '</div></div></div></li>');
		},
		systemMessages = $('ul.elgg-system-messages'),
		i;

	//validate delay.  Must be a positive integer.
	delay = parseInt(delay || 6000, 10);
	if (isNaN(delay) || delay <= 0) {
		delay = 6000;
	}

	//Handle non-arrays
	if (!elgg.isArray(msgs)) {
		msgs = [msgs];
	}

	if (type === 'error') {
		classes.push('elgg-message-error');
	} else {
		classes.push('elgg-message-success');
	}

	msgs.forEach(appendMessage);

	if (type != 'error') {
		$(messages_html.join('')).appendTo(systemMessages)
			.animate({opacity: '1.0'}, delay).fadeOut('slow');
	} else {
		$(messages_html.join('')).appendTo(systemMessages);
	}
};

/**
 * Wrapper function for system_messages. Specifies "messages" as the type of message
 * @param {String} msgs  The message to display
 * @param {Number} delay How long to display the message (milliseconds)
 */
elgg.system_message = function(msgs, delay) {
	elgg.system_messages(msgs, delay, "message");
};

/**
 * Wrapper function for system_messages.  Specifies "errors" as the type of message
 * @param {String} errors The error message to display
 * @param {Number} delay  How long to dispaly the error message (milliseconds)
 */
elgg.register_error = function(errors, delay) {
	elgg.system_messages(errors, delay, "error");
};

/**
 * Informs admin users via a console message about use of a deprecated function or capability
 *
 * @param {String} msg         The deprecation message to display
 * @param {String} dep_version The version the function was deprecated for
 * @since 1.9
 */
elgg.deprecated_notice = function(msg, dep_version) {
	if (elgg.is_admin_logged_in()) {
		msg = "Deprecated in Elgg " + dep_version + ": " + msg;
		if (typeof console !== "undefined") {
			console.info(msg);
		}
	}
};

/**
 * Meant to mimic the php forward() function by simply redirecting the
 * user to another page.
 *
 * @param {String} url The url to forward to
 */
elgg.forward = function(url) {
	var dest = elgg.normalize_url(url);

	if (dest == location.href) {
		location.reload();
	}

	// in case the href set below just changes the hash, we want to reload. There's sadly
	// no way to force a reload and set a different hash at the same time.
	$(window).on('hashchange', function () {
		location.reload();
	});

	location.href = dest;
};

/**
 * Parse a URL into its parts. Mimicks http://php.net/parse_url
 *
 * @param {String}  url       The URL to parse
 * @param {Number}  component A component to return
 * @param {Boolean} expand    Expand the query into an object? Else it's a string.
 *
 * @return {Object} The parsed URL
 */
elgg.parse_url = function(url, component, expand) {
	// Adapted from http://blog.stevenlevithan.com/archives/parseuri
	// which was release under the MIT
	// It was modified to fix mailto: and javascript: support.
	expand = expand || false;
	component = component || false;
	
	var re_str =
		// scheme (and user@ testing)
		'^(?:(?![^:@]+:[^:@/]*@)([^:/?#.]+):)?(?://)?'
		// possibly a user[:password]@
		+ '((?:(([^:@]*)(?::([^:@]*))?)?@)?'
		// host and port
		+ '([^:/?#]*)(?::(\\d*))?)'
		// path
		+ '(((/(?:[^?#](?![^?#/]*\\.[^?#/.]+(?:[?#]|$)))*/?)?([^?#/]*))'
		// query string
		+ '(?:\\?([^#]*))?'
		// fragment
		+ '(?:#(.*))?)';
	var keys = {
		1: "scheme",
		4: "user",
		5: "pass",
		6: "host",
		7: "port",
		9: "path",
		12: "query",
		13: "fragment"
	};
	var results = {};

	if (url.indexOf('mailto:') === 0) {
		results['scheme'] = 'mailto';
		results['path'] = url.replace('mailto:', '');
		return results;
	}

	if (url.indexOf('javascript:') === 0) {
		results['scheme'] = 'javascript';
		results['path'] = url.replace('javascript:', '');
		return results;
	}

	var re = new RegExp(re_str);
	var matches = re.exec(url);

	for (var i in keys) {
		if (matches[i]) {
			results[keys[i]] = matches[i];
		}
	}

	if (expand && typeof(results['query']) != 'undefined') {
		results['query'] = elgg.parse_str(results['query']);
	}

	if (component) {
		if (typeof(results[component]) != 'undefined') {
			return results[component];
		} else {
			return false;
		}
	}
	return results;
};

/**
 * Returns an object with key/values of the parsed query string.
 *
 * @param  {String} string The string to parse
 * @return {Object} The parsed object string
 */
elgg.parse_str = function(string) {
	var params = {},
		result,
		key,
		value,
		re = /([^&=]+)=?([^&]*)/g,
		re2 = /\[\]$/;

	// assignment intentional
	while (result = re.exec(string)) {
		key = decodeURIComponent(result[1].replace(/\+/g, ' '));
		value = decodeURIComponent(result[2].replace(/\+/g, ' '));

		if (re2.test(key)) {
			key = key.replace(re2, '');
			if (!params[key]) {
				params[key] = [];
			}
			params[key].push(value);
		} else {
			params[key] = value;
		}
	}
	
	return params;
};

/**
 * Returns a jQuery selector from a URL's fragement.  Defaults to expecting an ID.
 *
 * Examples:
 *  http://elgg.org/download.php returns ''
 *	http://elgg.org/download.php#id returns #id
 *	http://elgg.org/download.php#.class-name return .class-name
 *	http://elgg.org/download.php#a.class-name return a.class-name
 *
 * @param {String} url The URL
 * @return {String} The selector
 */
elgg.getSelectorFromUrlFragment = function(url) {
	var fragment = url.split('#')[1];

	if (fragment) {
		// this is a .class or a tag.class
		if (fragment.indexOf('.') > -1) {
			return fragment;
		} else {
			// this is an id
			return '#' + fragment;
		}
	}
	return '';
};

/**
 * Adds child to object[parent] array.
 *
 * @param {Object} object The object to add to
 * @param {String} parent The parent array to add to.
 * @param {*}      value  The value
 */
elgg.push_to_object_array = function(object, parent, value) {
	elgg.assertTypeOf('object', object);
	elgg.assertTypeOf('string', parent);

	if (!(object[parent] instanceof Array)) {
		object[parent] = [];
	}

	if ($.inArray(value, object[parent]) < 0) {
		return object[parent].push(value);
	}

	return false;
};

/**
 * Tests if object[parent] contains child
 *
 * @param {Object} object The object to add to
 * @param {String} parent The parent array to add to.
 * @param {*}      value  The value
 */
elgg.is_in_object_array = function(object, parent, value) {
	elgg.assertTypeOf('object', object);
	elgg.assertTypeOf('string', parent);

	return typeof(object[parent]) != 'undefined' && $.inArray(value, object[parent]) >= 0;
};

/**
 * Create a new ElggEntity
 *
 * @class Represents an ElggEntity
 * @property {number} guid
 * @property {string} type
 * @property {string} subtype
 * @property {number} owner_guid
 * @property {number} container_guid
 * @property {number} time_created
 * @property {number} time_updated
 * @property {string} url
 *
 */
elgg.ElggEntity = function(o) {
	$.extend(this, o);
};

/**
 * Create a new ElggUser
 *
 * @param {Object} o
 * @extends ElggEntity
 * @class Represents an ElggUser
 * @property {string} name
 * @property {string} username
 * @property {string} language
 * @property {boolean} admin
 */
elgg.ElggUser = function(o) {
	elgg.ElggEntity.call(this, o);
};

elgg.inherit(elgg.ElggUser, elgg.ElggEntity);

/**
 * Is this user an admin?
 *
 * @warning The admin state of the user should be checked on the server for any
 * actions taken that require admin privileges.
 *
 * @return {boolean}
 */
elgg.ElggUser.prototype.isAdmin = function() {
	return this.admin;
};
/**
 * Priority lists allow you to create an indexed list that can be iterated through in a specific
 * order.
 */
elgg.ElggPriorityList = function() {
	this.length = 0;
	this.priorities_ = [];
};

/**
 * Inserts an element into the priority list at the priority specified.
 *
 * @param {Object} obj          The object to insert
 * @param {Number} opt_priority An optional priority to insert at.
 *
 * @return {Void}
 */
elgg.ElggPriorityList.prototype.insert = function(obj, opt_priority) {
	var priority = 500;
	if (arguments.length == 2 && opt_priority !== undefined) {
		priority = parseInt(opt_priority, 10);
	}

	priority = Math.max(priority, 0);

	if (elgg.isUndefined(this.priorities_[priority])) {
		this.priorities_[priority] = [];
	}

	this.priorities_[priority].push(obj);
	this.length++;
};

/**
 * Iterates through each element in order.
 *
 * Unlike every, this ignores the return value of the callback.
 *
 * @param {Function} callback The callback function to pass each element through. See
 *                            Array.prototype.every() for details.
 * @return {Object}
 */
elgg.ElggPriorityList.prototype.forEach = function(callback) {
	elgg.assertTypeOf('function', callback);

	var index = 0;

	this.priorities_.forEach(function(elems) {
		elems.forEach(function(elem) {
			callback(elem, index++);
		});
	});

	return this;
};

/**
 * Iterates through each element in order.
 *
 * Unlike forEach, this returns the value of the callback and will break on false.
 *
 * @param {Function} callback The callback function to pass each element through. See
 *                            Array.prototype.every() for details.
 * @return {Object}
 */
elgg.ElggPriorityList.prototype.every = function(callback) {
	elgg.assertTypeOf('function', callback);

	var index = 0;

	return this.priorities_.every(function(elems) {
		return elems.every(function(elem) {
			return callback(elem, index++);
		});
	});
};

/**
 * Removes an element from the priority list
 *
 * @param {Object} obj The object to remove.
 * @return {Void}
 */
elgg.ElggPriorityList.prototype.remove = function(obj) {
	this.priorities_.forEach(function(elems) {
		var index;
		while ((index = elems.indexOf(obj)) !== -1) {
			elems.splice(index, 1);
			this.length--;
		}
	});
};

/**
 * Interates through each element of an array and calls a callback function.
 * The callback should accept the following arguments:
 *	element - The current element
 *	index	- The current index
 *
 * This is different to Array.forEach in that if the callback returns false, the loop returns
 * immediately without processing the remaining elements.
 *
 *	@param {Function} callback
 *	@return {Bool}
 */
if (!Array.prototype.every) {
	Array.prototype.every = function(callback) {
		var len = this.length, i;

		for (i = 0; i < len; i++) {
			if (i in this && !callback.call(null, this[i], i)) {
				return false;
			}
		}

		return true;
	};
}

/**
 * Interates through each element of an array and calls callback a function.
 * The callback should accept the following arguments:
 *	element - The current element
 *	index	- The current index
 *
 * This is different to Array.every in that the callback's return value is ignored and every
 * element of the array will be parsed.
 *
 *	@param {Function} callback
 *	@return {Void}
 */
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(callback) {
		var len = this.length, i;

		for (i = 0; i < len; i++) {
			if (i in this) {
				callback.call(null, this[i], i);
			}
		}
	};
}

/**
 * Left trim
 *
 * Removes a character from the left side of a string.
 * @param {String} str The character to remove
 * @return {String}
 */
if (!String.prototype.ltrim) {
	String.prototype.ltrim = function(str) {
		if (this.indexOf(str) === 0) {
			return this.substring(str.length);
		} else {
			return this;
		}
	};
}
/*
 * Javascript hook interface
 */

elgg.provide('elgg.config.hooks');
elgg.provide('elgg.config.instant_hooks');
elgg.provide('elgg.config.triggered_hooks');

!function() {
	// counter for tracking registration order
	var index = 0;

	/**
	 * Registers a hook handler with the event system.
	 *
	 * For best results, depend on the elgg/ready module, so plugins will have been booted.
	 *
	 * The special keyword "all" can be used for either the name or the type or both
	 * and means to call that handler for all of those hooks.
	 *
	 * Note that handlers registering for instant hooks will be executed immediately if the instant
	 * hook has been previously triggered.
	 *
	 * @param {String}   name     The hook name.
	 * @param {String}   type     The hook type.
	 * @param {Function} handler  Handler to call: function(hook, type, params, value)
	 * @param {Number}   priority Priority to call the event handler
	 * @return {Boolean}
	 */
	elgg.register_hook_handler = function(name, type, handler, priority) {
		elgg.assertTypeOf('string', name);
		elgg.assertTypeOf('string', type);
		elgg.assertTypeOf('function', handler);

		if (!name || !type) {
			return false;
		}

		var hooks = elgg.config.hooks;

		elgg.provide([name, type], hooks);

		if (!hooks[name][type].length) {
			hooks[name][type] = [];
		}

		// call if instant and already triggered.
		if (elgg.is_instant_hook(name, type) && elgg.is_triggered_hook(name, type)) {
			handler(name, type, null, null);
		}

		hooks[name][type].push({
			priority: priority,
			index: index++,
			handler: handler
		});
		return true;
	}
}();

/**
 * Emits a synchronous hook, calling only synchronous handlers
 *
 * Loops through all registered hooks and calls the handler functions in order.
 * Every handler function will always be called, regardless of the return value.
 *
 * @warning Handlers take the same 4 arguments in the same order as when calling this function.
 * This is different from the PHP version!
 *
 * @note Instant hooks do not support params or values.
 *
 * Hooks are called in priority order.
 *
 * @param {String} name   The hook name.
 * @param {String} type   The hook type.
 * @param {Object} params Optional parameters to pass to the handlers
 * @param {Object} value  Initial value of the return. Can be modified by handlers
 *
 * @return {*}
 */
elgg.trigger_hook = function(name, type, params, value) {
	elgg.assertTypeOf('string', name);
	elgg.assertTypeOf('string', type);

	// mark as triggered
	elgg.set_triggered_hook(name, type);

	// default to null if unpassed
	value = !elgg.isNullOrUndefined(value) ? value : null;

	var hooks = elgg.config.hooks,
		registrations = [],
		push = Array.prototype.push;

	elgg.provide([name, type], hooks);
	elgg.provide(['all', type], hooks);
	elgg.provide([name, 'all'], hooks);
	elgg.provide(['all', 'all'], hooks);

	if (hooks[name][type].length) {
		if (name !== 'all' && type !== 'all') {
			push.apply(registrations, hooks[name][type]);
		}
	}
	if (hooks['all'][type].length) {
		if (type !== 'all') {
			push.apply(registrations, hooks['all'][type]);
		}
	}
	if (hooks[name]['all'].length) {
		if (name !== 'all') {
			push.apply(registrations, hooks[name]['all']);
		}
	}
	if (hooks['all']['all'].length) {
		push.apply(registrations, hooks['all']['all']);
	}

	registrations.sort(function (a, b) {
		// priority first
		if (a.priority < b.priority) {
			return -1;
		}
		if (a.priority > b.priority) {
			return 1;
		}

		// then insertion order
		return (a.index < b.index) ? -1 : 1;
	});

	// only synchronous handlers
	$.each(registrations, function (i, registration) {
		var handler_return = registration.handler(name, type, params, value);
		if (!elgg.isNullOrUndefined(handler_return)) {
			value = handler_return;
		}
	});

	return value;
};

/**
 * Registers a hook as an instant hook.
 *
 * After being trigger once, registration of a handler to an instant hook will cause the
 * handle to be executed immediately.
 *
 * @note Instant hooks must be triggered without params or defaults. Any params or default
 * passed will *not* be passed to handlers executed upon registration.
 *
 * @param {String} name The hook name.
 * @param {String} type The hook type.
 * @return {Number} integer
 */
elgg.register_instant_hook = function(name, type) {
	elgg.assertTypeOf('string', name);
	elgg.assertTypeOf('string', type);

	return elgg.push_to_object_array(elgg.config.instant_hooks, name, type);
};

/**
 * Is this hook registered as an instant hook?
 *
 * @param {String} name The hook name.
 * @param {String} type The hook type.
 */
elgg.is_instant_hook = function(name, type) {
	return elgg.is_in_object_array(elgg.config.instant_hooks, name, type);
};

/**
 * Records that a hook has been triggered.
 *
 * @param {String} name The hook name.
 * @param {String} type The hook type.
 */
elgg.set_triggered_hook = function(name, type) {
	return elgg.push_to_object_array(elgg.config.triggered_hooks, name, type);
};

/**
 * Has this hook been triggered yet?
 *
 * @param {String} name The hook name.
 * @param {String} type The hook type.
 */
elgg.is_triggered_hook = function(name, type) {
	return elgg.is_in_object_array(elgg.config.triggered_hooks, name, type);
};

elgg.register_instant_hook('init', 'system');
elgg.register_instant_hook('ready', 'system');
elgg.register_instant_hook('boot', 'system');

/**
 * Hold security-related data here
 */
elgg.provide('elgg.security.token');

elgg.security.tokenRefreshTimer = null;

/**
 * Updates in-page CSRF tokens that were validated on the server. Only validated __elgg_token values
 * are replaced.
 *
 * @param {Object} token_object Value to replace elgg.security.token
 * @param {Object} valid_tokens Map of valid tokens (as keys) in the current page
 * @return {void}
 *
 * @private
 */
elgg.security.setToken = function (token_object, valid_tokens) {
	// update the convenience object
	elgg.security.token = token_object;

	// also update all forms
	$('[name=__elgg_ts]').val(token_object.__elgg_ts);
	$('[name=__elgg_token]').each(function () {
		if (valid_tokens[$(this).val()]) {
			$(this).val(token_object.__elgg_token);
		}
	});

	// also update all links that contain tokens and time stamps
	$('[href*="__elgg_ts"][href*="__elgg_token"]').each(function () {
		var token = this.href.match(/__elgg_token=([0-9a-z_-]+)/i)[1];
		if (valid_tokens[token]) {
			this.href = this.href
				.replace(/__elgg_ts=\d+/i, '__elgg_ts=' + token_object.__elgg_ts)
				.replace(/__elgg_token=[0-9a-z_-]+/i, '__elgg_token=' + token_object.__elgg_token);
		}
	});
};

/**
 * Security tokens time out so we refresh those every so often.
 *
 * We don't want to update invalid tokens, so we collect all tokens in the page and send them to
 * the server to be validated. Those that were valid are replaced in setToken().
 *
 * @private
 */
elgg.security.refreshToken = function () {
	// round up token pairs present
	var pairs = {};

	pairs[elgg.security.token.__elgg_ts + ',' + elgg.security.token.__elgg_token] = 1;

	$('form').each(function () {
		// we need consider only the last ts/token inputs, as those will be submitted
		var ts = $('[name=__elgg_ts]:last', this).val();
		var token = $('[name=__elgg_token]:last', this).val();
		// some forms won't have tokens
		if (token) {
			pairs[ts + ',' + token] = 1;
		}
	});

	$('[href*="__elgg_ts"][href*="__elgg_token"]').each(function () {
		var ts = this.href.match(/__elgg_ts=(\d+)/i)[1];
		var token = this.href.match(/__elgg_token=([0-9a-z_-]+)/i)[1];
		pairs[ts + ',' + token] = 1;
	});

	pairs = $.map(pairs, function (val, key) {
		return key;
	});

	elgg.ajax('refresh_token', {
		data: {
			pairs: pairs,
			session_token: elgg.session.token
		},
		dataType: 'json',
		method: 'POST',
		success: function (data) {
			if (data) {
				elgg.session.token = data.session_token;
				elgg.security.setToken(data.token, data.valid_tokens);

				if (elgg.get_logged_in_user_guid() != data.user_guid) {
					elgg.session.user = null;
					if (data.user_guid) {
						elgg.register_error(elgg.echo('session_changed_user'));
					} else {
						elgg.register_error(elgg.echo('session_expired'));
					}
				}
			}
		},
		error: function () {
		}
	});
};

/**
 * Add elgg action tokens to an object, URL, or query string (with a ?).
 *
 * @param {FormData|Object|string} data
 * @return {FormData|Object|string} The new data object including action tokens
 * @private
 */
elgg.security.addToken = function (data) {

	// 'http://example.com?data=sofar'
	if (elgg.isString(data)) {
		// is this a full URL, relative URL, or just the query string?
		var parts = elgg.parse_url(data),
			args = {},
			base = '';

		if (parts['host'] === undefined) {
			if (data.indexOf('?') === 0) {
				// query string
				base = '?';
				args = elgg.parse_str(parts['query']);
			}
		} else {
			// full or relative URL

			if (parts['query'] !== undefined) {
				// with query string
				args = elgg.parse_str(parts['query']);
			}
			var split = data.split('?');
			base = split[0] + '?';
		}
		args["__elgg_ts"] = elgg.security.token.__elgg_ts;
		args["__elgg_token"] = elgg.security.token.__elgg_token;

		return base + jQuery.param(args);
	}

	// no input!  acts like a getter
	if (elgg.isUndefined(data)) {
		return elgg.security.token;
	}

	// {...}
	if (elgg.isPlainObject(data)) {
		return elgg.extend(data, elgg.security.token);
	}

	if (data instanceof FormData) {
		data.set('__elgg_ts', elgg.security.token.__elgg_ts);
		data.set('__elgg_token', elgg.security.token.__elgg_token);
		return data;
	}

	// oops, don't recognize that!
	throw new TypeError("elgg.security.addToken not implemented for " + (typeof data) + "s");
};

/**
 * @private
 */
elgg.security.init = function () {
	// elgg.security.interval is set in the `elgg.js` view.
	elgg.security.tokenRefreshTimer = setInterval(elgg.security.refreshToken, elgg.security.interval);
};

elgg.register_hook_handler('boot', 'system', elgg.security.init);

/*globals vsprintf*/
/**
 * Provides language-related functionality
 */
elgg.provide('elgg.config.translations');

// default language - required by unit tests
elgg.config.language = 'en';

/**
 * Analagous to the php version.  Merges translations for a
 * given language into the current translations map.
 */
elgg.add_translation = function(lang, translations) {
	elgg.provide('elgg.config.translations.' + lang);

	elgg.extend(elgg.config.translations[lang], translations);
};

/**
 * Get the current language
 * @return {String}
 */
elgg.get_language = function() {
	// set by _elgg_get_js_page_data()
	return elgg.config.current_language;
};

/**
 * Translates a string
 *
 * @note The current system only loads a single language module per page, and it comes pre-merged with English
 *       translations. Hence, elgg.echo() can only return translations in the language returned by
 *       elgg.get_language(). Requests for other languages will fail unless a 3rd party plugin has manually
 *       used elgg.add_translation() to merge the language module ahead of time.
 *
 * @param {String} key      Message key
 * @param {Array}  argv     vsprintf() arguments
 * @param {String} language Requested language. Not recommended (see above).
 *
 * @return {String} The translation or the given key if no translation available
 */
elgg.echo = function(key, argv, language) {
	//elgg.echo('str', 'en')
	if (elgg.isString(argv)) {
		language = argv;
		argv = [];
	}

	//elgg.echo('str', [...], 'en')
	var translations = elgg.config.translations,
		dlang = elgg.get_language(),
		map;

	language = language || dlang;
	argv = argv || [];

	map = translations[language] || translations[dlang];
	if (map && elgg.isString(map[key])) {
		return vsprintf(map[key], argv);
	}

	return key;
};


/*globals elgg, $*/
elgg.provide('elgg.ajax');

/**
 * @author Evan Winslow
 * Provides a bunch of useful shortcut functions for making ajax calls
 */

/**
 * Wrapper function for jQuery.ajax which ensures that the url being called
 * is relative to the elgg site root.
 *
 * You would most likely use elgg.get or elgg.post, rather than this function
 *
 * @param {string} url Optionally specify the url as the first argument
 * @param {Object} options Optional. {@link jQuery#ajax}
 * @return {jqXHR}
 */
elgg.ajax = function(url, options) {
	options = elgg.ajax.handleOptions(url, options);

	options.url = elgg.normalize_url(options.url);
	return $.ajax(options);
};
/**
 * @const
 */
elgg.ajax.SUCCESS = 0;

/**
 * @const
 */
elgg.ajax.ERROR = -1;

/**
 * Handle optional arguments and return the resulting options object
 *
 * @param url
 * @param options
 * @return {Object}
 * @private
 */
elgg.ajax.handleOptions = function(url, options) {
	var data_only = true,
		data,
		member;

	//elgg.ajax('example/file.php', {...});
	if (elgg.isString(url)) {
		options = options || {};

	//elgg.ajax({...});
	} else {
		options = url || {};
		url = options.url;
	}

	//elgg.ajax('example/file.php', function() {...});
	if (elgg.isFunction(options)) {
		data_only = false;
		options = {success: options};
	}

	//elgg.ajax('example/file.php', {data:{...}});
	if (options.data) {
		data_only = false;
	} else {
		for (member in options) {
			//elgg.ajax('example/file.php', {callback:function(){...}});
			if (elgg.isFunction(options[member])) {
				data_only = false;
			}
		}
	}

	//elgg.ajax('example/file.php', {notdata:notfunc});
	if (data_only) {
		data = options;
		options = {data: data};
	}

	if (!elgg.isFunction(options.error)) {
		// add a generic error handler
		options.error = elgg.ajax.handleAjaxError;
	}
	
	if (url) {
		options.url = url;
	}

	return options;
};

/**
 * Handles low level errors like 404
 *
 * @param xhr
 * @param status
 * @param error
 * @private
 */
elgg.ajax.handleAjaxError = function(xhr, status, error) {
	if (!xhr.getAllResponseHeaders()) {
		// user aborts (like refresh or navigate) do not have headers
		return;
	}
	
	elgg.register_error(elgg.echo('ajax:error'));
};

/**
 * Wrapper function for elgg.ajax which forces the request type to 'get.'
 *
 * @param {string} url Optionally specify the url as the first argument
 * @param {Object} options {@link jQuery#ajax}
 * @return {jqXHR}
 */
elgg.get = function(url, options) {
	options = elgg.ajax.handleOptions(url, options);

	options.type = 'get';
	return elgg.ajax(options);
};

/**
 * Wrapper function for elgg.get which forces the dataType to 'json.'
 *
 * @param {string} url Optionally specify the url as the first argument
 * @param {Object} options {@link jQuery#ajax}
 * @return {jqXHR}
 */
elgg.getJSON = function(url, options) {
	options = elgg.ajax.handleOptions(url, options);

	options.dataType = 'json';
	return elgg.get(options);
};

/**
 * Wrapper function for elgg.ajax which forces the request type to 'post.'
 *
 * @param {string} url Optionally specify the url as the first argument
 * @param {Object} options {@link jQuery#ajax}
 * @return {jqXHR}
 */
elgg.post = function(url, options) {
	options = elgg.ajax.handleOptions(url, options);

	options.type = 'post';
	return elgg.ajax(options);
};

/**
 * Perform an action via ajax
 *
 * @example Usage 1:
 * At its simplest, only the action name is required (and anything more than the
 * action name will be invalid).
 * <pre>
 * elgg.action('name/of/action');
 * </pre>
 *
 * The action can be relative to the current site ('name/of/action') or
 * the full URL of the action ('http://elgg.org/action/name/of/action').
 *
 * @example Usage 2:
 * If you want to pass some data along with it, use the second parameter
 * <pre>
 * elgg.action('friend/add', { friend: some_guid });
 * </pre>
 *
 * @example Usage 3:
 * Of course, you will have no control over what happens when the request
 * completes if you do it like that, so there's also the most verbose method
 * <pre>
 * elgg.action('friend/add', {
 *     data: {
 *         friend: some_guid
 *     },
 *     success: function(json) {
 *         //do something
 *     },
 * }
 * </pre>
 * You can pass any of your favorite $.ajax arguments into this second parameter.
 *
 * @note If you intend to use the second field in the "verbose" way, you must
 * specify a callback method or the data parameter.  If you do not, elgg.action
 * will think you mean to send the second parameter as data.
 *
 * @note You do not have to add security tokens to this request.  Elgg does that
 * for you automatically.
 *
 * @see jQuery.ajax
 *
 * @param {String} action The action to call.
 * @param {Object} options
 * @return {jqXHR}
 */
elgg.action = function(action, options) {
	elgg.assertTypeOf('string', action);

	// support shortcut and full URLs
	// this will mangle URLs that aren't elgg actions.
	// Use post, get, or ajax for those.
	if (action.indexOf('action/') < 0) {
		action = 'action/' + action;
	}

	options = elgg.ajax.handleOptions(action, options);

	// This is a misuse of elgg.security.addToken() because it is not always a
	// full query string with a ?. As such we need a special check for the tokens.
	if (!elgg.isString(options.data) || options.data.indexOf('__elgg_ts') == -1) {
		options.data = elgg.security.addToken(options.data);
	}
	options.dataType = 'json';

	//Always display system messages after actions
	var custom_success = options.success || elgg.nullFunction;
	options.success = function(json, two, three, four) {
		if (json && json.system_messages) {
			elgg.register_error(json.system_messages.error);
			elgg.system_message(json.system_messages.success);
		}

		custom_success(json, two, three, four);
	};

	return elgg.post(options);
};

/**
 * Make an API call
 *
 * @example Usage:
 * <pre>
 * elgg.api('system.api.list', {
 *     success: function(data) {
 *         console.log(data);
 *     }
 * });
 * </pre>
 *
 * @param {String} method The API method to be called
 * @param {Object} options {@link jQuery#ajax}
 * @return {jqXHR}
 */
elgg.api = function (method, options) {
	elgg.assertTypeOf('string', method);

	var defaults = {
		dataType: 'json',
		data: {}
	};

	options = elgg.ajax.handleOptions(method, options);
	options = $.extend(defaults, options);

	options.url = 'services/api/rest/' + options.dataType + '/';
	options.data.method = method;

	return elgg.ajax(options);
};

/**
 * Provides session methods.
 */
elgg.provide('elgg.session');

/**
 * Helper function for setting cookies
 * @param {string} name
 * @param {string} value
 * @param {Object} options
 *
 * {number|Date} options[expires]
 * {string} options[path]
 * {string} options[domain]
 * {boolean} options[secure]
 *
 * @return {string|undefined} The value of the cookie, if only name is specified. Undefined if no value set
 */
elgg.session.cookie = function(name, value, options) {
	var cookies = [], cookie = [], i = 0, date, valid = true;
	
	//elgg.session.cookie()
	if (elgg.isUndefined(name)) {
		return document.cookie;
	}
	
	//elgg.session.cookie(name)
	if (elgg.isUndefined(value)) {
		if (document.cookie && document.cookie !== '') {
			cookies = document.cookie.split(';');
			for (i = 0; i < cookies.length; i += 1) {
				cookie = jQuery.trim(cookies[i]).split('=');
				if (cookie[0] === name) {
					return decodeURIComponent(cookie[1]);
				}
			}
		}
		return undefined;
	}
	
	// elgg.session.cookie(name, value[, opts])
	options = options || {};
	
	if (elgg.isNull(value)) {
		value = '';
		options.expires = -1;
	}
	
	cookies.push(name + '=' + value);

	if (options.expires) {
		if (elgg.isNumber(options.expires)) {
			date = new Date();
			date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
		} else if (options.expires.toUTCString) {
			date = options.expires;
		}

		if (date) {
			cookies.push('expires=' + date.toUTCString());
		}
	}
	
	// CAUTION: Needed to parenthesize options.path and options.domain
	// in the following expressions, otherwise they evaluate to undefined
	// in the packed version for some reason.
	if (options.path) {
		cookies.push('path=' + (options.path));
	}

	if (options.domain) {
		cookies.push('domain=' + (options.domain));
	}
	
	if (options.secure) {
		cookies.push('secure');
	}
	
	document.cookie = cookies.join('; ');
};

/**
 * Returns the object of the user logged in.
 *
 * @return {ElggUser} The logged in user
 */
elgg.get_logged_in_user_entity = function() {
	return elgg.session.user;
};

/**
 * Returns the GUID of the logged in user or 0.
 *
 * @return {number} The GUID of the logged in user
 */
elgg.get_logged_in_user_guid = function() {
	var user = elgg.get_logged_in_user_entity();
	return user ? user.guid : 0;
};

/**
 * Returns if a user is logged in.
 *
 * @return {boolean} Whether there is a user logged in
 */
elgg.is_logged_in = function() {
	return (elgg.get_logged_in_user_entity() instanceof elgg.ElggUser);
};

/**
 * Returns if the currently logged in user is an admin.
 *
 * @return {boolean} Whether there is an admin logged in
 */
elgg.is_admin_logged_in = function() {
	var user = elgg.get_logged_in_user_entity();
	return (user instanceof elgg.ElggUser) && user.isAdmin();
};

// This just has to happen after ElggUser is defined, however it's probably
// better to have this procedural code here than in ElggUser.js
if (elgg.session.user) {
	elgg.session.user = new elgg.ElggUser(elgg.session.user);
}

/**
 * Provides page owner and context functions
 *
 * @todo This is a stub. Page owners can't be fully implemented until
 * the 4 types are finished.
 */

/**
 * @return {number} The GUID of the page owner entity or 0 for no owner
 */
elgg.get_page_owner_guid = function() {
	if (elgg.page_owner !== undefined) {
		return elgg.page_owner.guid;
	} else {
		return 0;
	}
};


elgg.provide('elgg.config');

/**
 * Returns the current site URL
 *
 * @return {String} The site URL.
 */
elgg.get_site_url = function() {
	return elgg.config.wwwroot;
};

/**
 * Get the URL for the cached file
 *
 * @param {String} view    The full view name
 * @param {String} subview If the first arg is "css" or "js", the rest of the view name
 * @return {String} The site URL.
 */
elgg.get_simplecache_url = function(view, subview) {
	var lastcache, path;

	if (elgg.config.simplecache_enabled) {
		lastcache = elgg.config.lastcache;
	} else {
		lastcache = 0;
	}

	if (!subview) {
		path = '/cache/' + lastcache + '/' + elgg.config.viewtype + '/' + view;
	} else {
		if ((view === 'js' || view === 'css') && 0 === subview.indexOf(view + '/')) {
			subview = subview.substr(view.length + 1);
		}
		path = '/cache/' + lastcache + '/' + elgg.config.viewtype + '/' + view + '/' + subview;
	}

	return elgg.normalize_url(path);
};

elgg.provide('elgg.ui');

elgg.ui.init = function () {
	// @todo we need better documentation for this hack
	// iOS Hover Event Class Fix
	$('.elgg-page').attr("onclick", "return true");

	// add user hover menus
	elgg.ui.initHoverMenu();

	// if the user clicks a system message (not a link inside one), make it disappear
	$(document).on('click', '.elgg-system-messages .elgg-message', function(e) {
		if (!$(e.target).is('a')) {
			var $this = $(this);

			// slideUp allows dismissals without notices shifting around unpredictably
			$this.clearQueue().slideUp(100, function () {
				$this.remove();
			});
		}
	});

	$('.elgg-page-default .elgg-system-messages .elgg-message').parent().animate({opacity: 0.9}, 6000);
	$('.elgg-page-default .elgg-system-messages .elgg-message-success').parent().fadeOut('slow');

	$(document).on('click', '[rel=toggle]', elgg.ui.toggles);

	require(['elgg/popup'], function(popup) {
		popup.bind($('[rel="popup"]'));
	});

	$(document).on('click', '*[data-confirm]', elgg.ui.requiresConfirmation);

	// Allow element to be highlighted using CSS if its id is found from the URL
	var elementId = elgg.getSelectorFromUrlFragment(document.URL);
	$(elementId).addClass('elgg-state-highlight');
};

/**
 * Toggles an element based on clicking a separate element
 *
 * Use rel="toggle" on the toggler element
 * Set the href to target the item you want to toggle (<a rel="toggle" href="#id-of-target">)
 * or use data-toggle-selector="your_jquery_selector" to have an advanced selection method
 *
 * By default elements perform a slideToggle.
 * If you want a normal toggle (hide/show) you can add data-toggle-slide="0" on the elements to prevent a slide.
 *
 * @param {Object} event
 * @return void
 */
elgg.ui.toggles = function(event) {
	event.preventDefault();
	var $this = $(this),
		selector = $this.data().toggleSelector;

	if (!selector) {
		// @todo we can switch to elgg.getSelectorFromUrlFragment() in 1.x if
		// we also extend it to support href=".some-class"
		selector = $this.attr('href');
	}

	var $elements = $(selector);

	$this.toggleClass('elgg-state-active');

	$elements.each(function(index, elem) {
		var $elem = $(elem);
		if ($elem.data().toggleSlide != false) {
			$elem.slideToggle('medium');
		} else {
			$elem.toggle();
		}
	});

	$this.trigger('elgg_ui_toggle', [{
		$toggled_elements: $elements
	}]);
};

/**
 * Initialize the hover menu
 *
 * @param {Object} parent
 * @return void
 */
elgg.ui.initHoverMenu = function(parent) {

	/**
	 * For a menu clicked, load the menu into all matching placeholders
	 *
	 * @param {String}   mac      Machine authorization code for the menu clicked
	 * @param {Function} callback a callback function to call when the loading of het menu was succesfull
	 */
	function loadMenu(mac, callback) {
		var $all_placeholders = $(".elgg-menu-hover[rel='" + mac + "']");
		
		// find the <ul> that contains data for this menu
		var $ul = $all_placeholders.filter('[data-elgg-menu-data]');

		if (!$ul.length) {
			return;
		}
		
		require(['elgg/Ajax'], function(Ajax) {
			var ajax = new Ajax(false);
			ajax.view('navigation/menu/user_hover/contents', {
				data: $ul.data('elggMenuData'),
				success: function(data) {
					if (data) {
						// replace all existing placeholders with new menu
						$all_placeholders.html($(data));
					}
					
					if (typeof callback === 'function') {
						callback();
					}
				},
				complete: function() {
					$all_placeholders.removeAttr('data-menu-placeholder');
				}
			});
		});
	};
	
	/**
	 * Show the hover menu in a popup module
	 *
	 * @params {jQuery} $icon the user icon which was clicked
	 */
	function showPopup($icon) {
		// check if we've attached the menu to this element already
		var $hovermenu = $icon.data('hovermenu') || null;

		if (!$hovermenu) {
			$hovermenu = $icon.parent().find(".elgg-menu-hover");
			$icon.data('hovermenu', $hovermenu);
		}

		require(['elgg/popup'], function(popup) {
			if ($hovermenu.is(':visible')) {
				// close hovermenu if arrow is clicked & menu already open
				popup.close($hovermenu);
			} else {
				popup.open($icon, $hovermenu, {
					'my': 'left top',
					'at': 'left top',
					'of': $icon.closest(".elgg-avatar"),
					'collision': 'fit fit'
				});
			}
		});
	};

	if (!parent) {
		parent = document;
	}

	// avatar contextual menu
	$(document).on('click', ".elgg-avatar-menu > a", function(e) {
		e.preventDefault();

		var $icon = $(this);

		var $placeholder = $icon.parent().find(".elgg-menu-hover[data-menu-placeholder]");

		if ($placeholder.length) {
			loadMenu($placeholder.attr("rel"), function() {
				showPopup($icon);
			});
		} else {
			showPopup($icon);
		}
	});

};

/**
 * Calls a confirm() and returns false if denied.
 *
 * @param {Object} e
 * @return void
 */
elgg.ui.requiresConfirmation = function(e) {
	var confirmText = $(this).data('confirm') || elgg.echo('question:areyousure');
	if (!confirm(confirmText)) {
		e.preventDefault();
		e.stopPropagation();
		e.stopImmediatePropagation();
		return false;
	}
};

/**
 * This function registers two menu items that are actions that are the opposite
 * of each other and ajaxifies them. E.g. like/unlike, friend/unfriend, ban/unban, etc.
 *
 * You can also add the data parameter 'data-toggle' to menu items to have them automatically
 * registered as toggleable without the need to call this function.
 */
elgg.ui.registerTogglableMenuItems = function(menuItemNameA, menuItemNameB) {
	require(['navigation/menu/elements/item_toggle'], function() {
		menuItemNameA = menuItemNameA.replace('_', '-');
		menuItemNameB = menuItemNameB.replace('_', '-');

		$('.elgg-menu-item-' + menuItemNameA + ' a').not('[data-toggle]').attr('data-toggle', menuItemNameB);
		$('.elgg-menu-item-' + menuItemNameB + ' a').not('[data-toggle]').attr('data-toggle', menuItemNameA);
	});
};

elgg.register_hook_handler('init', 'system', elgg.ui.init);

elgg.data = {"lightbox":{"current":"image {current} of {total}","previous":"<span class=\"elgg-icon elgg-icon-caret-left fas fa-caret-left\"><\/span>","next":"<span class=\"elgg-icon elgg-icon-caret-right fas fa-caret-right\"><\/span>","close":"<span class=\"elgg-icon elgg-icon-times fas fa-times\"><\/span>","opacity":0.5,"maxWidth":"990px","maxHeight":"990px","initialWidth":"300px","initialHeight":"300px"},"likes_states":{"unliked":{"html":"<span class=\"elgg-icon elgg-icon-thumbs-up fas fa-thumbs-up\"><\/span>","title":"Like this","action":"likes\/add","next_state":"liked"},"liked":{"html":"<span class=\"elgg-icon elgg-icon-thumbs-up elgg-state-active fas fa-thumbs-up\"><\/span>","title":"Unlike this","action":"likes\/delete","next_state":"unliked"}}};
elgg.version = 2017041200;
elgg.release = "3.0.0-rc.1";
elgg.config.wwwroot = "http:\/\/localhost\/abcg_project\/elgg\/";
elgg.security.interval = 2397600;
elgg.config.language = "en";
//<script>

// page data overrides site data
$.extend(elgg.data, elgg._data);
delete elgg._data;

// jQuery and UI must be loaded sync in 2.x but modules should depend on these AMD modules
define('jquery', function () {
	return jQuery;
});
define('jquery-ui');

// The datepicker language modules depend on "../datepicker", so to avoid RequireJS from
// trying to load that, we define it manually here. The lang modules have names like
// "jquery-ui/i18n/datepicker-LANG.min" and these views are mapped in /views.php
define('jquery-ui/datepicker', jQuery.datepicker);

define('elgg', ['sprintf', 'jquery', 'languages/' + elgg.get_language(), 'weakmap-polyfill', 'formdata-polyfill'], function(vsprintf, $, translations) {
	elgg.add_translation(elgg.get_language(), translations);

	return elgg;
});

require(['elgg']); // Forces the define() function to always run

// Process queue. We have to wait until now because many modules depend on 'elgg' and we can't load
// it asynchronously.
if (!window._require_queue) {
	if (window.console) {
		console.log('Elgg\'s require() shim is not defined. Do not override the view "page/elements/head".');
	}
} else {
	while (_require_queue.length) {
		require.apply(null, _require_queue.shift());
	}
	delete window._require_queue;
}

elgg.trigger_hook('boot', 'system');

require(['elgg/init', 'elgg/ready', 'elgg/lightbox']);
//<script>

require(['jquery', 'elgg'], function ($, elgg) {
	elgg.register_hook_handler('init', 'system', function () {
		$(document).on('click', '#messages-toggle', function () {
			$('input[type=checkbox]').click();
		});
	});
});
