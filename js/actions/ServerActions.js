var Dispatcher  = require ('../dispatcher/Dispatcher');
var ActionTypes   = require ('../constants/Constants').ActionTypes;

module.exports = {

	storeOnePhoto: function(photo) {
		Dispatcher.handleServerAction({
			actionType: ActionTypes.EDIT_SERVICE,
			res: res,
			entityId: entityId,
			serviceId: serviceId,
			code: code
		});
	},

}
