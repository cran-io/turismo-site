var React          = require ('react');
var Router         = require ('react-router');
var Route          = Router.Route;
var TurismoApp     = require ('./components/TurismoApp.react');
var Profile        = require ('./components/Profile.react');
var DefaultRoute   = Router.DefaultRoute;


var routes = (
  <Route handler={TurismoApp} path="/">
    <Route name="profile" path='/profile' handler={Profile} />

    <DefaultRoute handler={Profile}/>
    
  </Route>
);

module.exports = routes;
