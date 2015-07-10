var Dispatcher    = require('../dispatcher/Dispatcher');
var Constants     = require('../constants/Constants');
var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';
var router = require('../router');

var photos =[];
photos.push("/../turismo-site/images/office.jpg");
photos.push("/../turismo-site/images/mym.jpeg");
photos.push("/../turismo-site/images/cat.jpeg");
photos.push("/../turismo-site/images/flower.jpeg");
photos.push("/../turismo-site/images/arboles.jpeg");
photos.push("/../turismo-site/images/perro.jpg");
photos.push("/../turismo-site/images/jaja.jpg");
photos.push("/../turismo-site/images/ilusion.png");

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