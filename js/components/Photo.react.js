var React        = require('react');
var PhotoStore   = require('../stores/Store');


module.exports = React.createClass({


    componentWillMount: function(){


    },
    componentDidMount: function() {
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

    componentWillUnmount: function() {
    },
    _onChange: function() {



    },

    render: function() {
        var photo = localStorage.getItem('photo');
        $("meta[name='twitter:image']").attr('content', photo)
        return(
            <div className="container height100">
                <div className="photoView centered">
                    <div className="row">
                        <div className="centered">
                            <img className= "centered responsive-img" src={photo}></img>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-offset-3 col-lg-6 col-xs-offset-2 col-xs-8 center-align">
                            <p className="pShare">COMPARTIR EN:</p>
                            <a className="fb-share-button fbMargin" data-href={photo} data-layout="button"></a>
                            <a href="https://twitter.com/intent/tweet" className="twitter-share-button fbMargin"  data-size="default" data-count="none"></a>

                        </div>
                        <div className="col-lg-12 col-xs-12 center-align downloadMargin">
                            <a className="waves-effect waves-light btn" href={photo} download="photo1.jpg">DESCARGAR IMAGEN</a>
                        </div>
                        <div className="footer">

                        </div>

                    </div>
                </div>
            </div>
        )
    }
});
