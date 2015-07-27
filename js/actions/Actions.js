var TurismoAPIUtils = require ('../utils/TurismoAPIUtils');

module.exports = {

	getServerPhotos: function(category, nextPage) {
		TurismoAPIUtils.getPhotos(category, nextPage);
	},

	getSourcePhoto: function(thumbnail) {
		TurismoAPIUtils.getSourcePhoto(thumbnail);
	}

};
