var TurismoAPIUtils = require ('../utils/TurismoAPIUtils');

module.exports = {


	getServerPhotos: function(page) {
		TurismoAPIUtils.getPhotos(page);
	},
	getServerChromaPhotos: function(page) {
		TurismoAPIUtils.getChromaPhotos(page);
	},
	getServerExpertoEnViajesPhotos: function(page) {
		TurismoAPIUtils.getExpertoEnViajesPhotos(page);
	},
	getServerDomoPhotos: function(page) {
		TurismoAPIUtils.getDomoPhotos(page);
	},


};
