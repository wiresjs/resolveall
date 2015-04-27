var Promise = require("promise");
var async = require('async');
var _ = require('lodash');


module.exports = {
	chain: function() {
		function(funcCollection, thisArg) {
			return new Promise(function(resolve, reject) {
				var promises = [];
				_.each(funcCollection, function(f) {
					promises.push(function(callback) {
						var curFunction = f;
						if (thisArg) {
							curFunction = f.bind(thisArg);
						}
						new Promise(curFunction).then(function(res) {
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
	}
}