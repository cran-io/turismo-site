var React          = require ('react');
var Router         = require ('react-router');
var Route          = Router.Route;
var TurismoApp     = require ('./components/TurismoApp.react');
var Profile        = require ('./components/Profile.react');
var PhotoView      = require ('./components/Photo.react');
var DefaultRoute   = Router.DefaultRoute;


var routes = (
  <Route handler={TurismoApp} path="/">
    <Route name="profile" path='/profile' handler={Profile} />
    <Route name="photo" path='/photo' handler={PhotoView} />

    <DefaultRoute handler={Profile}/>
    
  </Route>
);

module.exports = routes;
