# yes-no

A tiny Node.js module for parsing "yes"/"no" type values

## Install

```bash
$ npm install yes-no
```

## Usage

```javascript
var yesNo = require('yes-no');

// Simple use
yesNo.parse('yes');  // true
yesNo.parse('no');   // false

// All of these values can be parsed
var values = ['yes', 'no', 'Y', 'n', 'yEs', 0, '1', true, false, 'True', 'falSe'];

console.log( values.map(yesNo.parse) );
//
// [true, false, true, false, true, false, true, true, false, true, false]
//

// You can also parse an array in place like so:
yesNo.parse(values);
console.log(values);

// Or, parse an object of values:
values = {
	foo: 'yes',
	bar: 'no'
};

yesNo.parse(values);
console.log(values.foo);  // true
console.log(values.bar);  // false

// When parsing an object, you can specify which properies
// should be parsed
values = {
	foo: 'yes',
	bar: 'no',
	baz: 'some other value'
};

yesNo.parse(values, ['foo', 'bar']);
console.log(values.foo);  // true
console.log(values.bar);  // false
console.log(values.baz);  // "some other value"

// Unrecognized or invalid values return null
yesNo.parse('foo');  // null

// But, you can add your own parsers to look for specific things
yesNo.userTests.push(function(value) {
	// Test functions should return a boolean for recognized
	// values, or anything else (or nothing) for unrecognized.
	if (value === 'foo') {
		return true;
	}
	if (value === 'bar') {
		return false;
	}
});

yesNo.parse('foo');  // true
yesNo.parse('bar');  // false
yesNo.parse('baz');  // null
```

