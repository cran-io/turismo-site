var Dispatcher   = require('../dispatcher/Dispatcher');
var Constants    = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign       = require('object-assign');
var Store        = require('./Store');
var ActionTypes  = Constants.ActionTypes;
var CHANGE_EVENT = 'change';
var router       = require('../router');

var RouteStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getRouter: function() {
    return router;
  }
  
});

RouteStore.dispatchToken = Dispatcher.register(function(payload) {
  Dispatcher.waitFor([
    Store.dispatchToken
  ]);

  var action = payload.action;
  switch(action.actionType) {

    case ActionTypes.REDIRECT:
      router.transitionTo(action.route);
      break;

    case ActionTypes.SOURCE_PHOTO:
      router.transitionTo('photo');
      break;

    default:
  }

  return true;
});

module.exports = RouteStore;
