'use strict';
// -----------------------------------------------------------------
const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numericLetters = '0123456789';
export

function randBoolean() {
	return Math.random() < 0.5;
}
export

function randNumber(min = 0, max = 1) {
	return (Math.round((max - min) * Math.random() + min));
}
export

function randChoice(array) {
	if (arguments.length !== 1) {
		array = arguments;
	}
	let i = randNumber(0, array.length - 1);
	return array[i];
}
export

function randString(len = 1, lowerCase = true, upperCase = true, numeric = true) {
	let str = '';
	let possible = '';
	if (lowerCase)
		possible += lowerCaseLetters;
	if (upperCase)
		possible += upperCaseLetters;
	if (numeric)
		possible += numericLetters;
	if (!possible)
		return '';
	for (let i = 0; i < len; i++) {
		str += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return str;
}

export

function randStringBy(len = 1, possible = '') {
	let str = '';
	if (!possible)
		return '';
	for (let i = 0; i < len; i++) {
		str += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return str;
}
// -----------------------------------------------------------------
export

function arrayManip(override = false, issueWarning = true) {
	const warningPrefix = "Overriding existing Array.prototype.";
	if (!Array.prototype.equals || !override) {
		if (Array.prototype.equals && override && issueWarning) console.warn(warningPrefix + "equals.");
		// attach the .equals method to Array's prototype to call it on any array
		Array.prototype.equals = function (array) {
			// if the other array is a falsy value, return
			if (!array)
				return false;
			// compare lengths - can save a lot of time 
			if (this.length != array.length)
				return false;
			for (let i = 0, l = this.length; i < l; i++) {
				// Check if we have nested arrays
				if (this[i] instanceof Array && array[i] instanceof Array) {
					// recurse into the nested arrays
					if (!this[i].equals(array[i]))
						return false;
				} else if (this[i] != array[i]) {
					// Warning - two different object instances will never be equal: {x:20} != {x:20}
					return false;
				}
			}
			return true;
		};
		// Hide method from for-in loops
		Object.defineProperty(Array.prototype, "equals", {
			enumerable: false
		});
	}
	if (!Array.prototype.shuffle || !override) {
		if (Array.prototype.shuffle && override && issueWarning) console.warn(warningPrefix + "shuffle.");
		Array.prototype.shuffle = function () {
			for (let i = this.length, j, x; i; i--) {
				j = Math.floor(Math.random() * i);
				x = this[i - 1];
				this[i - 1] = this[j];
				this[j] = x;
			}
		};
		// Hide method from for-in loops
		Object.defineProperty(Array.prototype, "shuffle", {
			enumerable: false
		});
	}
}
// -----------------------------------------------------------------
export

function stringManip(override = false, issueWarning = true) {
	const warningPrefix = "Overriding existing String.prototype.";
	if (!String.prototype.format || !override) {
		if (String.prototype.format && override && issueWarning) console.warn(warningPrefix + "shuffle.");
		String.prototype.format = function () {
			let s = this;
			for (let i = 0; i < arguments.length; i++) {
				let reg = new RegExp("\\{" + i + "\\}", "gm");
				s = s.replace(reg, arguments[i]);
			}
			return s;
		};
	}
	if (!String.prototype.padLeft || !override) {
		if (String.prototype.padLeft && override && issueWarning) console.warn(warningPrefix + "padLeft.");
		String.prototype.padLeft = function (length, padding = ' ') {
			return (padding.repeat(length) + this).slice(-length);
		};
	}

	if (!String.prototype.padRight || !override) {
		if (String.prototype.padRight && override && issueWarning) console.warn(warningPrefix + "padRight.");
		String.prototype.padRight = function (length, padding = ' ') {
			return (this + padding.repeat(length)).slice(0, length);
		};
	}

	if (!String.prototype.shuffle || !override) {
		if (String.prototype.shuffle && override && issueWarning) console.warn(warningPrefix + "shuffle.");
		String.prototype.shuffle = function () {
			let ret = this.split('');
			for (let i = ret.length, j, x; i; i--) {
				j = Math.floor(Math.random() * i);
				x = ret[i - 1];
				ret[i - 1] = ret[j];
				ret[j] = x;
			}
			return ret.join('');
		};
	}

}
// -----------------------------------------------------------------
export

function range(start, stop, step) {
	if (typeof stop == 'undefined') {
		stop = start;
		start = 0;
	}
	if (typeof step == 'undefined') {
		step = 1;
	}
	if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
		return [];
	}
	let result = [];
	for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
		result.push(i);
	}
	return result;
}