var keyMirror = require('keymirror');
var Root      = "http://localhost:8080";
var APIRoot   = Root + "/web";

module.exports = {

  ActionTypes: keyMirror({
    REDIRECT: null,
    STORE_PHOTOS: null,
    ADD_PHOTOS: null,
    SOURCE_PHOTO: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  APIEndpoints: {
    // LOGIN:       APIRoot + "/login",
    // ADMINS:      APIRoot + "/admins",
    PUBLIC:      Root
  }

};
