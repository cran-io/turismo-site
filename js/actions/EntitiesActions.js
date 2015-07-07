var DexAPIUtils = require ('../utils/DexAPIUtils');

module.exports = {

// USUARIOS
	getAdmins: function() {
		DexAPIUtils.getAdmins();
	},
	deleteAdmin: function(adminId) {
		DexAPIUtils.deleteAdmin(adminId);
	},
	changeAdminPassword: function(admin_id, password) {
		DexAPIUtils.changeAdminPassword(admin_id, password);
	},

// PERFILES
	getEntities: function() {
		DexAPIUtils.getEntities();
	},

// ENTIDADES
	createEntity: function(entity) {
		DexAPIUtils.createEntity(entity);
	},
	getEntity: function(id, editing) {
		DexAPIUtils.getEntity(id, editing);
	},
	deleteEntity: function(entityId) {
		DexAPIUtils.deleteEntity(entityId);
	},
	updateEntity: function(entityId, entity) {
		DexAPIUtils.updateEntity(entityId, entity);
	},
	publishEntity: function(entityId) {
		DexAPIUtils.publishEntity(entityId);
	}

};
