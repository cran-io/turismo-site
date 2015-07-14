var TurismoAPIUtils = require ('../utils/TurismoAPIUtils');

module.exports = {


	getServerPhotos: function() {
		TurismoAPIUtils.getPhotos();
	},
	getServerChromaPhotos: function() {
		TurismoAPIUtils.getChromaPhotos();
	},
	getServerExpertoEnViajesPhotos: function() {
		TurismoAPIUtils.getExpertoEnViajesPhotos();
	},
	getServerDomoPhotos: function() {
		TurismoAPIUtils.getDomoPhotos();
	},


};
