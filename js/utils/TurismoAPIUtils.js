var request             = require('superagent');
var Constants           = require('../constants/Constants');
var APIEndpoints        = Constants.APIEndpoints;
var storePhotos         = require('../actions/ServerActions').storePhotos;
var addPhotos           = require('../actions/ServerActions').addPhotos;
var sourcePhoto         = require('../actions/ServerActions').sourcePhoto;

module.exports = {

  getPhotos: function(category, nextPage) {
    var page = parseInt(sessionStorage.getItem('page')) || 1
    var limit = 10;
    if (nextPage) {
      page += 1;
      sessionStorage.setItem('page', page)
    } else {
      limit *= page;
      page = 1;
    }

    var url = APIEndpoints.PUBLIC +'/pictures?page=' + page + '&limit=' + limit;
    if (category && category != "all") {
      url += '&category=' + category;
    }

    request
      .get(url)
      .set('Accept', 'aplication/json')
      .end(function(res) {
        var text = JSON.parse(res.text);
        if(!nextPage) {
          storePhotos(text);
        } else {
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
