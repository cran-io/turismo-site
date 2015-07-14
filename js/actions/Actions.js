var TurismoAPIUtils = require ('../utils/TurismoAPIUtils');

module.exports = {


	getServerPhotos: function(page) {
		console.log("action");
		TurismoAPIUtils.getPhotos(page);
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
