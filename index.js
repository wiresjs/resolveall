var Promise = require("promise");
var async = require('async');
var _ = require('lodash');


module.exports = ResolveAll = function(funcCollection, thisArg) {
	return new Promise(function(resolve, reject) {
		var promises = [];
		_.each(funcCollection, function(f) {
			promises.push(function(callback) {
				new Promise(f.bind(thisArg || {})).then(function(res) {
					callback(null, res);
				}).catch(function(e) {
					callback(e, null);
				});
			});
		});
		async.series(promises, function(err, results) {
			if (err !== undefined) {
				return reject(err);
			} else {
				return resolve(results);
			}
		})
	});
}