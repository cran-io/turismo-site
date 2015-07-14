var request             = require('superagent');
var Constants           = require('../constants/Constants');
var APIEndpoints        = Constants.APIEndpoints;
var storePhotos         = require('../actions/ServerActions').storePhotos;

module.exports = {


//GET  
  getPhotos: function() {
    request
      .get(APIEndpoints.PUBLIC +'/images' )
      .set('Accept', 'aplication/json')
      .end(function(res) {
        var text = JSON.parse(res.text);
        storePhotos(text);
      })
  },
  getChromaPhotos: function() {
    request
      .get(APIEndpoints.PUBLIC +'/images?category=chroma' )
      .set('Accept', 'aplication/json')
      .end(function(res) {
        var text = JSON.parse(res.text);
        storePhotos(text);
      })
  },
  getExpertoEnViajesPhotos: function() {
    request
      .get(APIEndpoints.PUBLIC +'/images?category=expertoEnViajes' )
      .set('Accept', 'aplication/json')
      .end(function(res) {
        var text = JSON.parse(res.text);
        storePhotos(text);
      })
  },
  getDomoPhotos: function() {
    request
      .get(APIEndpoints.PUBLIC +'/images?category=domo' )
      .set('Accept', 'aplication/json')
      .end(function(res) {
        var text = JSON.parse(res.text);
        storePhotos(text);
      })
  },


 };