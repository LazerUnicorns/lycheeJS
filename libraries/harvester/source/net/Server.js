
lychee.define('harvester.net.Server').requires([
	'harvester.net.Remote'
]).includes([
	'lychee.net.Server'
]).exports(function(lychee, global, attachments) {

	var _CODEC  = {
		encode: function(data) { return data; },
		decode: function(data) { return data; }
	};
	var _Remote = lychee.import('harvester.net.Remote');
	var _Server = lychee.import('lychee.net.Server');



	/*
	 * IMPLEMENTATION
	 */

	var Class = function(data) {

		var settings = lychee.extend({
			codec:  _CODEC,
			remote: _Remote,
			type:   _Server.TYPE.HTTP
		}, data);


		_Server.call(this, settings);

		settings = null;



		/*
		 * INITIALIZATION
		 */

		this.bind('connect', function(remote) {

			// remote.addService(new _Project(remote, this.host));


			remote.bind('receive', function(payload, headers) {

				var method = headers['method'];
				if (method === 'OPTIONS') {

					remote.send({}, {
						'status':                       '200 OK',
						'access-control-allow-headers': 'Content-Type',
						'access-control-allow-origin':  'http://localhost',
						'access-control-allow-methods': 'GET, POST',
						'access-control-max-age':       '3600'
					});

				} else {
// TODO: File Service
console.log('RECEIVE', payload.toString(), headers);
				}

			});

		}, this);


		this.connect();

	};


	Class.prototype = {

		/*
		 * ENTITY API
		 */

		// deserialize: function(blob) {},

		serialize: function() {

			var data = _Server.prototype.serialize.call(this);
			data['constructor'] = 'harvester.net.Server';


			return data;

		}

	};


	return Class;

});

