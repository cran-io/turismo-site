var request             = require('superagent');
var Constants           = require('../constants/Constants');
var APIEndpoints        = Constants.APIEndpoints;
var storePhotos         = require('../actions/ServerActions').storePhotos;
var addPhotos           = require('../actions/ServerActions').addPhotos;
var sourcePhoto         = require('../actions/ServerActions').sourcePhoto;

module.exports = {
  //GET
  getPhotos: function(page) {
    request
      .get(APIEndpoints.PUBLIC +'/pictures?page='+ page )
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
      .get(APIEndpoints.PUBLIC +'/pictures?category=croma_&page='+ page )
      .set('Accept', 'aplication/json')
      .end(function(res) {
        console.log(res);
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
      .get(APIEndpoints.PUBLIC +'/pictures?category=experto_='+ page )
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
      .get(APIEndpoints.PUBLIC +'/pictures?category=domo_&page='+ page )
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

  getSourcePhoto: function(thumbnail) {
    request
      .get(APIEndpoints.PUBLIC + '/source_picture?thumbnail=' + thumbnail)
      .set('Accept', 'aplication/json')
      .end(function(res) {
        var text = JSON.parse(res.text);
        sourcePhoto(text);
      })
  }
};
