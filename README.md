# resolveall
Resolves all promises, breaking chain if needed.

```bash
npm install resolveall
```js

## Example

Executes promise like functions using a chain. If one of the promises is broken, execution is terminated.


```js
var a = function(resolve, reject) {
	console.log("Executing a")
	return resolve("a")
};
var b = function(resolve, reject) {
	console.log("Executing b")
	return reject("error")
};

var c = function(resolve, reject) {
	console.log("Executing c ", this)
	return resolve("c")
};

```

```js
resolveall.chain([a, b, c], this).then(function(res) {
	console.log(res);
}).catch(function(e) {
	console.log("Error", e);
})
```

