var Dispatcher    = require('../dispatcher/Dispatcher');
var Constants     = require('../constants/Constants');
var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';
var router = require('../router');

var photo = {};

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
  getPhoto: function  () {
    return photo;
  }

});

Store.dispatchToken = Dispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {

    case ActionTypes.STORE_PHOTO:
      photo = action.res;
    break;


    default:
      // do nothing
  }

  return true;
});

module.exports = Store;