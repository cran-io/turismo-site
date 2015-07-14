var request             = require('superagent');
var Constants           = require('../constants/Constants');
var APIEndpoints        = Constants.APIEndpoints;
var storePhotos         = require('../actions/ServerActions').storePhotos;
var addPhotos           = require('../actions/ServerActions').addPhotos;

module.exports = {


//GET  
  getPhotos: function(page) {
    console.log("api utls", page);
    request
      .get(APIEndpoints.PUBLIC +'/images?page='+ page )
      .set('Accept', 'aplication/json')
      .end(function(res) {
        var text = JSON.parse(res.text);
        if(page==1){
          storePhotos(text);
        }else{
          addPhotos(text);
        }
       
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