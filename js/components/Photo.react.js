var React        = require('react');
var PhotoStore   = require('../stores/Store');


module.exports = React.createClass({

  
    componentWillMount: function(){
     
      
    },
    componentDidMount: function() {
      var js,fjs=document.getElementsByTagName('script')[0],p=/^http:/.test(document.location)?'http':'https';
      if(!document.getElementById('twitter-wjs')){
          js=document.createElement('script');
          js.id='twitter-wjs';
          js.src=p+'://platform.twitter.com/widgets.js';
          fjs.parentNode.insertBefore(js,fjs);
      };
    },

    componentWillUnmount: function() {

    },
    _onChange: function() {
   
  
        
    },

    render: function() {
        var photo = localStorage.getItem('photo');
        
        return(

            <div className="container height100">
                <meta property="og:type"               content="photo" />
                <meta property="og:title"              content="Photo" />
                <meta property="og:description"        content="description" />
                <meta property="og:image"              content="http://cran.io/images/cranio.jpg" />

                <div className="photoView centered">
                    <div className="row">
                        <div className="centered">
                            <img className= "centered responsive-img" src={photo}></img>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-offset-3 col-lg-6 col-xs-offset-2 col-xs-8 center-align">
                            <p className="noMargin">COMPARTIR EN:</p>
                            <a className="fb-share-button fbMargin" data-href="http://labrujeriablanca.com/wp-content/uploads/2015/04/flores02.jpg" data-layout="button"></a>
                            <a href="https://twitter.com/share" data-url={photo} className="twitter-share-button fbMargin"  data-size="default" data-count="none"></a>
                            
                        </div>
                        <div className="col-lg-12 col-xs-12 center-align downloadMargin">
                            <a className="waves-effect waves-light btn" href={photo} download="photo1.jpg">DESCARGAR IMAGEN</a>
                        </div>
                        <div className="footer">
                           
                        </div>
                        
                    </div>
                </div>
                <div>
                       
                </div>

            </div>
        )
    }
});
