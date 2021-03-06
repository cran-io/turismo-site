var React    = require('react');
var redirect = require('../actions/RouteActions').redirect;

module.exports = React.createClass({

  componentWillMount: function(){
  },

  componentDidMount: function() {
    this.facebookShare();
    this.twitterShare();
  },

  facebookShare: function() {
    if (window.fbAsyncInit) {
      window.fbAsyncInit();
    } else {
      window.fbAsyncInit = function() {
        FB.init({
          appId      : 1473161532996355,
          xfbml      : true,
          version    : 'v2.4'
        });
      };
    }

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  },

  twitterShare: function() {
    if (window.twttr) {
      window.twttr.widgets.load()
    } else {
      window.twttr = (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0],
            t = window.twttr || {};
        if (d.getElementById(id)) return t;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);

        t._e = [];
        t.ready = function(f) {
          t._e.push(f);
        };

        return t;
      }(document, "script", "twitter-wjs"));
    }
  },

  componentWillUnmount: function() {
  },

  backButton: function() {
    redirect('profile');
  },

  render: function() {
      var photo = localStorage.getItem('photo');
      $("meta[name='twitter:image']").attr('content', photo);
      $("meta[property='og:image']").attr('content', photo);
      return(
          <div className="container height100">
              <a className="btn-large tags" onClick={this.backButton} >VOLVER</a>
              <div className="photoView centered">
                  <div className="row">
                      <div className="centered">
                          <img className= "centered responsive-img" src={photo}></img>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-lg-offset-3 col-lg-6 col-xs-offset-2 col-xs-8 center-align">
                          <p className="pShare">COMPARTIR EN:</p>
                          <div className="fb-share-button fbMargin" data-href="http://sensorium.tecnopolis.argentina.tur.ar/" data-layout="button"></div>
                          <a href="https://twitter.com/intent/tweet?url=http://sensorium.tecnopolis.argentina.tur.ar/" className="twitter-share-button fbMargin" data-size="default" data-count="none"></a>

                      </div>
                      <div className="col-lg-12 col-xs-12 center-align downloadMargin">
                          <a className="waves-effect waves-light btn-large" href={photo} download="photo1.jpg">DESCARGAR IMAGEN</a>
                      </div>
                      <div className="footer">

                      </div>

                  </div>
              </div>
          </div>
      )
  }
});
