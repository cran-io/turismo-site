var Dispatcher  = require ('../dispatcher/Dispatcher');
var ActionTypes   = require ('../constants/Constants').ActionTypes;

module.exports = {

	storePhotos: function(photos) {

		Dispatcher.handleServerAction({
			actionType: ActionTypes.STORE_PHOTOS,
			res: photos
		});
	},

}
