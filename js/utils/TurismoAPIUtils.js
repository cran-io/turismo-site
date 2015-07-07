var request             = require('superagent');
var receiveLoginAction  = require('../actions/ServerActions').receiveLogin;
var receiveSignupAction = require('../actions/ServerActions').receiveSignup;
var receiveAdmins       = require('../actions/ServerActions').receiveAdmins;
var receiveEntities     = require('../actions/ServerActions').receiveEntities;
var receiveNoEntities   = require('../actions/ServerActions').receiveNoEntities;
var receiveEntity       = require('../actions/ServerActions').receiveEntity;
var editEntity          = require('../actions/ServerActions').editEntity;
var showEntity          = require('../actions/ServerActions').showEntity;
var error               = require('../actions/ServerActions').error;
var showContact         = require('../actions/ServerActions').showContact;
var editContact         = require('../actions/ServerActions').editContact;
var showEntity          = require('../actions/ServerActions').showEntity;
var showArea            = require('../actions/ServerActions').showArea;
var editArea            = require('../actions/ServerActions').editArea;
var storeIntern         = require('../actions/ServerActions').storeIntern;
var showService         = require('../actions/ServerActions').showService;
var editService         = require('../actions/ServerActions').editService;
var entityDeleted       = require('../actions/ServerActions').entityDeleted;
var redirect            = require('../actions/RouteActions').redirect;
var Constants           = require('../constants/Constants');
var SessionStore        = require('../stores/SessionStore');
var APIEndpoints        = Constants.APIEndpoints;

module.exports = {
  login: function(email, password) {
    request
      .post(APIEndpoints.LOGIN)
      .send({email: email, password: password})
      .set('Accept', 'aplication/json')
      .end(function(err, res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        receiveLoginAction(err, text, email, code);
      })
  },

  newAdmin: function(email, password, isSuper) {
    request
      .post(APIEndpoints.SIGNUP)
      .send({email: email, password: password, is_super: isSuper})
      .set('Accept', 'aplication/json')
      .set('Authorization', SessionStore.getAuthToken())
      .end(this.getAdmins)
  },

//ADMINS

//GET  de todos los usuarios
  getAdmins: function() {
    request
      .get(APIEndpoints.ADMINS)
      .set('Accept', 'aplication/json')
      .set('Authorization', SessionStore.getAuthToken())
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        receiveAdmins(text, code);
      })
  },

  //DELETE un admin en particular
  deleteAdmin: function(adminId) {
    request
      .del(APIEndpoints.ADMINS + '/' + adminId)
      .set('Authorization', SessionStore.getAuthToken())
      .end(function(res){
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        if (code<300){
          this.getAdmins();
        }else{
          error(text, code);
        }
      }.bind(this))
  },

  changeAdminPassword: function(admin_id, password) {
    request
      .put(APIEndpoints.ADMINS + "/" + admin_id )
      .send(password)
      .set('Authorization', SessionStore.getAuthToken())
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        if (code<300){
          redirect('admins');
        }else{
          error(text, code);
        }
      })
  },

//ENTITIES

//GET  de todas las entidades
  getEntities: function() {
    request
      .get(APIEndpoints.ENTITIES)
      .set('Authorization', SessionStore.getAuthToken())
      .set('Accept', 'aplication/json')
      .set('Authorization', SessionStore.getAuthToken())
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        if(localStorage.getItem('isSuper')=="true"){
          receiveEntities(text, code);
        }else{
          if(text.length>1){
          receiveEntities(text, code);
        }else if(text.length==1){
          this.getEntity(text[0].object_id, false);
        }else{
          receiveNoEntities();
        }
        }
        
      }.bind(this));
  },

//POST una nueva entidad
  createEntity: function(entity) {
    request
      .post(APIEndpoints.ENTITIES)
      .attach('logo_url', entity.logoFile, entity.logoFile.name)
      .attach('cover_url', entity.coverFile, entity.coverFile.name)
      .field('name', entity.name)
      .field('color', entity.color)
      .field('isPrivate', entity.isPrivate)
      .set('Authorization', SessionStore.getAuthToken())
      .set('Accept', 'aplication/json')
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        if (code<300){
          showEntity(text, code);
        }else{
          error(text, code);
        }
        
      })
  },

  //DELETE una entidad en particular
  deleteEntity: function(entityId) {
    request
      .del(APIEndpoints.ENTITIES +'/' + entityId)
      .set('Authorization', SessionStore.getAuthToken())
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        if (code<300){
          receiveEntities(text, code);
        }else{
          error(text, code);
        }
        
      })
  },

//GET una entidad en particular
  getEntity: function(id, editing) {
    request
      .get(APIEndpoints.ENTITIES +'/' +id)
      .set('Authorization', SessionStore.getAuthToken())
      .set('Accept', 'aplication/json')
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        if(editing){
          editEntity(text, code);
        }else{
          receiveEntity(text, code);

        }
      })
  },

  updateEntity: function(entityId, entity) {
    var req = request.put(APIEndpoints.ENTITIES + '/' + entityId);

    if (entity.logoFile) {
      req.attach('logo_url', entity.logoFile, entity.logoFile.name)
    }
    if (entity.coverFile) {
      req.attach('cover_url', entity.coverFile, entity.coverFile.name)
    }
    req.field('name', entity.name)
    req.field('color', entity.color)
    req.field('isPrivate', entity.isPrivate)
    req.set('Authorization', SessionStore.getAuthToken())
    req.set('Accept', 'aplication/json')
    req.end(function(res) {
      var text = JSON.parse(res.text);
      var code = JSON.parse(res.status);
      if (code<300){
        showEntity(text, code);
      }else{
        error(text, code);
      }

    })
  },

  publishEntity: function(entityId) {
    request
      .post(APIEndpoints.ENTITIES + '/' + entityId + '/publish')
      .set('Authorization', SessionStore.getAuthToken())
      .set('Accept', 'aplication/json')
  },

//CONTACTS

//POST un nuevo contacto
  createContact: function(entityId, contact) {
    request
      .post(APIEndpoints.ENTITIES + '/' +entityId + '/contacts')
      .attach('logo_url', contact.logoFile, contact.logoFile.name)
      .attach('cover_url', contact.coverFile, contact.coverFile.name)
      .field('name', contact.name)
      .field('description', contact.description)
      .field('numbers', contact.numbers)
      .field('isPrivate', contact.isPrivate)
      .set('Authorization', SessionStore.getAuthToken())
      .set('Accept', 'application/json')
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        if (code<300){
          showContact(text, entityId, code);
        }else{
          error(text, code);
        }
        
      })
  },

//GET un contacto en particular
  getContact: function(entityId, contactId, editing) {
    request
      .get(APIEndpoints.ENTITIES +'/' +entityId+'/contacts/'+contactId)
      .set('Authorization', SessionStore.getAuthToken())
      .set('Authorization', SessionStore.getAuthToken())
      .set('Accept', 'aplication/json')
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        if(editing){
          editContact(text, entityId, contactId, code);
        }else{
          showContact(text, entityId, code);
        }

      })
  },

  //DELETE un contacto en particular
  deleteContact: function(entityId, contactId) {
    request
      .del(APIEndpoints.ENTITIES +'/' + entityId +'/contacts/'+ contactId)
      .set('Authorization', SessionStore.getAuthToken())
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        if (code<300){
          this.getEntity(entityId, false);
        }else{
          error(text, code);
        }
      }.bind(this));
  },

  updateContact: function(entityId, contactId, contact) {
    var req = request.put(APIEndpoints.ENTITIES + '/' + entityId + '/contacts/' + contactId);
    if (contact.logoFile) {
      req.attach('logo_url', contact.logoFile, contact.logoFile.name)
    }
    if (contact.coverFile) {
      req.attach('cover_url', contact.coverFile, contact.coverFile.name)
    }
    req.field('name', contact.name)
    req.field('description', contact.description)
    req.field('numbers', contact.numbers)
    req.field('isPrivate', contact.isPrivate)
    req.set('Authorization', SessionStore.getAuthToken())
    req.set('Accept', 'application/json')
    req.end(function(res) {
      var text = JSON.parse(res.text);
      var code = JSON.parse(res.status);
      if (code<300){
        showContact(text, entityId, code);
      }else{
        error(text, code);
      }

    })
  },

  //Suscribirse a un servicio en particular dentro del contacto
  suscribeService: function(entityId, contactId, serviceId) {
    request
      .post(APIEndpoints.ENTITIES +'/' + entityId +'/contacts/'+ contactId +'/services/'+ serviceId)
      .set('Authorization', SessionStore.getAuthToken())
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        showContact(text, entityId, code);
      })
  },

  unSuscribeService: function(entityId, contactId, serviceId) {
    request
      .del(APIEndpoints.ENTITIES +'/' + entityId +'/contacts/'+ contactId +'/services/'+ serviceId)
      .set('Authorization', SessionStore.getAuthToken())
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        showContact(text, entityId, code);
      })
  },

//AREAS

//POST una nueva area
  createArea: function(entityId, contactId, name) {
    request
      .post(APIEndpoints.ENTITIES +'/' +entityId+'/contacts/' + contactId + '/areas')
      .send({name: name})
      .set('Accept', 'aplication/json')
      .set('Authorization', SessionStore.getAuthToken())
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        if (code<300){
          showArea(entityId, contactId, text, code);
        }else{
          error(text, code);
        }
      })
  },

  //GET un area en particular
  showArea: function(entityId, contactId, areaId, editing) {
    request
      .get(APIEndpoints.ENTITIES +'/' + entityId +'/contacts/'+ contactId + '/areas/' + areaId )
      .set('Authorization', SessionStore.getAuthToken())
      .set('Accept', 'aplication/json')
      .set('Authorization', SessionStore.getAuthToken())
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        if(editing){
          editArea(entityId, contactId, text, code);
        }else{
          showArea(entityId, contactId, text, code);
        }


      })
  },


  //DELETE un area en particular
  deleteArea: function(entityId, contactId, areaId) {
    request
      .del(APIEndpoints.ENTITIES +'/' + entityId +'/contacts/'+ contactId + '/areas/' + areaId)
      .set('Authorization', SessionStore.getAuthToken())
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        
        if (code<300){
          showContact(text, entityId, code);
        }else{
          error(text, code);
        }
      })
  },

  //EDIT un area en particular
  editArea: function(entityId, contactId, areaId, name) {
    request
      .put(APIEndpoints.ENTITIES +'/' +entityId +'/contacts/'+ contactId + '/areas/' + areaId)
      .send({name: name})
      .set('Accept', 'aplication/json')
      .set('Authorization', SessionStore.getAuthToken())
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        if (code<300){
          showArea(entityId, contactId, text, code);
        }else{
          error(text, code);
        }
      })
  },

//INTERNS

//POST un nuevo interno dentro del area
  createIntern: function(entityId, contactId, areaId, intern) {
    request
      .post(APIEndpoints.ENTITIES +'/' +entityId+'/contacts/' + contactId + '/areas/'+ areaId + '/interns')
      .send({name: intern.name, number: intern.number})
      .set('Accept', 'aplication/json')
      .set('Authorization', SessionStore.getAuthToken())
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        if (code<300){
          showArea(entityId, contactId, text, code);
        }else{
          error(text, code);
        }

      })
  },

  //DELETE un interno en particular
  deleteIntern: function(entityId, contactId, areaId, internId) {
    request
      .del(APIEndpoints.ENTITIES +'/' + entityId +'/contacts/'+ contactId + '/areas/' + areaId + '/interns/' + internId)
      .set('Authorization', SessionStore.getAuthToken())
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        if (code<300){
          showArea(entityId, contactId, text, code);
        }else{
          error(text, code);
        }
      })
  },

//SERVCES

//POST un nuevo servicio
  createService: function(entityId, name) {
    request
      .post(APIEndpoints.ENTITIES +'/' +entityId+'/services')
      .send({name: name})
      .set('Accept', 'aplication/json')
      .set('Authorization', SessionStore.getAuthToken())
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);

        if (code<300){
          showService(entityId, text, code);
        }else{
          error(text, code);
        }
      })
  },

//GET un servicio en particular
  getService: function(entityId, serviceId, editing) {
    request
      .get(APIEndpoints.ENTITIES +'/' +entityId+'/services/'+serviceId)
      .set('Authorization', SessionStore.getAuthToken())
      .set('Accept', 'aplication/json')
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        if(editing){
          editService(entityId, text, serviceId, code);
        }else{
          showService(entityId, text, code);
        };
      })
  },

  //DELETE un servicio en particular
  deleteService: function(entityId, serviceId) {
    request
      .del(APIEndpoints.ENTITIES +'/' +entityId+'/services/'+serviceId)
      .set('Authorization', SessionStore.getAuthToken())
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        
        if (code<300){
          showEntity(text, code);
        }else{
          error(text, code);
        }

      })
  },

//UPDATE un servicio en particular
  editService: function(entityId, name, serviceId) {
    request
      .put(APIEndpoints.ENTITIES +'/' +entityId+'/services/' + serviceId)
      .send({name: name})
      .set('Accept', 'aplication/json')
      .set('Authorization', SessionStore.getAuthToken())
      .end(function(res) {
        var text = JSON.parse(res.text);
        var code = JSON.parse(res.status);
        if (code<300){
          showService(entityId, text, code);
        }else{
          error(text, code);
        }
      })
  },


//NOTIFICATIONS

//POST una nueva notificacion dentro del servicio
  createNotification: function(entityId, serviceId, notification) {
    var req= request.post(APIEndpoints.ENTITIES +'/' +entityId+'/services/' + serviceId + '/notifications');

    if (notification.file_url) {
      req.attach('file_url', notification.file_url, notification.file_url.name)
    }
    req.field('title',  notification.title)
    req.field('text',  notification.text)
    req.set('Accept', 'aplication/json')
    req.set('Authorization', SessionStore.getAuthToken())
    req.end(function(res) {
        var code = JSON.parse(res.status);
        var text = JSON.parse(res.text);
      if (code<300){
        this.getService(entityId, serviceId, false);
      }else{
        error(text, code);
      }
      
    }.bind(this));
  }
};
