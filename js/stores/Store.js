var Dispatcher    = require('../dispatcher/Dispatcher');
var Constants     = require('../constants/Constants');
var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';
var router = require('../router');
var _entity = '';
var _textError = '';
var _errorCode = '';
var _editing= false;


var EntityStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getEntity: function() {
    return _entity;
  },

  getName: function() {
    return _entity.name;
  },

  getLogo: function(){
    return _entity.logo;
  },

  getCodeError: function(){
    return _errorCode;
  },
  getTextError: function(){
    return _textError;
  },

  getCover: function(){
    return _entity.cover;
  },

  getColor: function(){
    return _entity.color;
  },

  getIsPrivate: function(){
    if(_entity.isPrivate){
      return 'Privada';
    }
    else{
      return 'Publica';
    }
  },

  getEntityId: function(){
    return _entity.object_id;
  },

  getIsEditing: function(){
    return _editing
  }

});

EntityStore.dispatchToken = Dispatcher.register(function(payload) {
  Dispatcher.waitFor([
    SessionStore.dispatchToken
  ]);
  var action = payload.action;

  switch(action.actionType) {

    case ActionTypes.SHOW_ENTITY:
      if (SessionStore.isLoggedIn()) {
        _entity= action.res;
        _textError = '';
        _errorCode = '';
        _editing= false;
        localStorage.setItem('entityId', _entity.object_id);
        EntityStore.emitChange();
      }
    break;

    case ActionTypes.ERROR:
      if (SessionStore.isLoggedIn()) {
        _textError= action.res.message;
        _errorCode = action.code;
        EntityStore.emitChange();
      } 
    break;

    case ActionTypes.EDIT_ENTITY:
      if (SessionStore.isLoggedIn()) {
        _entity= action.res;
        _textError = '';
        _errorCode = '';
        _editing= true;
        localStorage.setItem('entityId', _entity.object_id);
        EntityStore.emitChange();
      }
    break;

    default:
      // do nothing
  }

  return true;
});

module.exports = EntityStore;