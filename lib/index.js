
// Allow for user-defined tests
exports.userTests = [ ];

// The main parsing function
exports.parse = function(value, props) {
	
	var type = typeof value;
	
	// For objects, parse all properties (or the properties given)
	if (type === 'object') {
		if (type) {
			(props || Object.keys(value)).forEach(function(key) {
				value[key] = exports.parse(value[key]);
			});
		}
		return value;
	}

	// If the value is undefined, return null
	if (type === 'undefined') {
		return null;
	}
	
	// If the value is not a string, just cast to bool
	if (type !== 'string') {
		return !! value;
	}
	
	// Trim and lowercase for simpler parsing
	var orig = value;
	value = value.trim().toLowerCase();
	
	// Parse against "yes"/"no" values
	if (value === 'y' || value === 'yes') {
		return true;
	}
	if (value === 'n' || value === 'no') {
		return false;
	}
	
	// Parse against "true"/"false" value
	if (value === 't' || value === 'true') {
		return true;
	}
	if (value === 'f' || value === 'false') {
		return false;
	}
	
	// Parse against "1"/"0" values
	if (value === '1' || value === '0') {
		return !! Number(value);
	}
	
	var result;
	var others = exports.userTests;
	for (var i = 0, c = others.length; i < c; i++) {
		result = others[i](orig);
		if (typeof result === 'boolean') {
			return result;
		}
	}
	
	return null;

};

