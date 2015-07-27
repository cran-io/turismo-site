var Dispatcher    = require('../dispatcher/Dispatcher');
var Constants     = require('../constants/Constants');
var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';
var router = require('../router');

var photos =[];
var noMore = false;

var Store = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  getPhotos: function  () {
    return photos;
  },
  noMore: function  () {
    return noMore;
  }

});

Store.dispatchToken = Dispatcher.register(function(payload) {

  var action = payload.action;

  switch(action.actionType) {

    case ActionTypes.STORE_PHOTOS:
      var response = action.res;
      photos = response;
      if (response.length < 10) {
        noMore = true
      }
      Store.emitChange();
      break;

    case ActionTypes.ADD_PHOTOS:
      var response = action.res;
      if(response.length<10) {
        noMore = true;
      }

      for (var key in response) {
        photos.push(response[key]);
      }
      Store.emitChange();
      break;

    case ActionTypes.SOURCE_PHOTO:
      var photo = action.res;
      localStorage.setItem('photo', photo);
      break;

    default:
      // do nothing
  }

  return true;
});

module.exports = Store;
