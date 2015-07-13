var Dispatcher    = require('../dispatcher/Dispatcher');
var Constants     = require('../constants/Constants');
var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';
var router = require('../router');

var photos =[];
photos.push("/../turismo-site/images/01.jpg");
photos.push("/../turismo-site/images/02.jpg");
photos.push("/../turismo-site/images/03.jpg");
photos.push("/../turismo-site/images/04.jpg");
photos.push("/../turismo-site/images/05.jpg");
photos.push("/../turismo-site/images/06.jpg");
photos.push("/../turismo-site/images/07.jpg");
photos.push("/../turismo-site/images/08.jpg");
photos.push("/../turismo-site/images/09.jpg");
photos.push("/../turismo-site/images/10.jpg");
photos.push("/../turismo-site/images/11.jpg");
photos.push("/../turismo-site/images/12.jpg");
photos.push("/../turismo-site/images/13.jpg");
photos.push("/../turismo-site/images/14.jpg");
photos.push("/../turismo-site/images/15.jpg");
photos.push("/../turismo-site/images/16.jpg");
photos.push("/../turismo-site/images/17.jpg");
photos.push("/../turismo-site/images/18.jpg");
photos.push("/../turismo-site/images/19.jpg");
photos.push("/../turismo-site/images/20.jpg");
photos.push("/../turismo-site/images/21.jpg");
photos.push("/../turismo-site/images/22.jpg");
photos.push("/../turismo-site/images/23.jpg");

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
  }

});

Store.dispatchToken = Dispatcher.register(function(payload) {
  // Dispatcher.waitFor([
  //   SessionStore.dispatchToken
  // ]);
  var action = payload.action;

  switch(action.actionType) {

    case ActionTypes.SHOW_ENTITY:
      // if (SessionStore.isLoggedIn()) {
      //   _entity= action.res;
      //   _textError = '';
      //   _errorCode = '';
      //   _editing= false;
      //   localStorage.setItem('entityId', _entity.object_id);
      //   Store.emitChange();
      // }
    break;


    default:
      // do nothing
  }

  return true;
});

module.exports = Store;