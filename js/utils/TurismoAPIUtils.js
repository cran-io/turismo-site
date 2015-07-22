var request             = require('superagent');
var Constants           = require('../constants/Constants');
var APIEndpoints        = Constants.APIEndpoints;
var storePhotos         = require('../actions/ServerActions').storePhotos;
var addPhotos           = require('../actions/ServerActions').addPhotos;

module.exports = {


//GET  
  getPhotos: function(page) {
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
  getChromaPhotos: function(page) {
    request
      .get(APIEndpoints.PUBLIC +'/images?category=croma&page='+ page )
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
  getExpertoEnViajesPhotos: function(page) {
    request
      .get(APIEndpoints.PUBLIC +'/images?category=experto='+ page )
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
  getDomoPhotos: function(page) {
    request
      .get(APIEndpoints.PUBLIC +'/images?category=domo&page='+ page )
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


 };