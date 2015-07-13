var React        = require('react');
var PhotoStore   = require('../stores/Store');


module.exports = React.createClass({

    getInitialState: function(){
        return {
            photo: '/../turismo-site/images/office.jpg'
        };
    },
    componentWillMount: function(){
    },
    componentDidMount: function() {
    },

    componentWillUnmount: function() {

    },
    _onChange: function() {

    },

    render: function() {
        var photo = this.state.photo;
        <script type="text/javascript" src="http://labrujeriablanca.com/wp-content/uploads/2015/04/flores02.jpg"></script>

// <div id="content">
//                           <g:plusone></g:plusone>
//                         </div>


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
                        <div className="col-lg-6 left-align">
                            <p className="noMargin">COMPARTIR EN:</p>
                            <div className="fb-share-button" data-href="http://labrujeriablanca.com/wp-content/uploads/2015/04/flores02.jpg" data-layout="button"></div>
                            <a className="fb-share-button" data-href="http://labrujeriablanca.com/wp-content/uploads/2015/04/flores02.jpg" data-layout="button"></a>
                            <a href="https://twitter.com/share" className="twitter-share-button"  data-size="large" data-count="none">Tweet</a>
                            <div className="a2a_kit a2a_default_style"><a className="a2a_button_google_plus_share"></a></div>
                        </div>
                        <div className="right-align">
                            <a className="waves-effect waves-light btn" href={photo} download="photo1.jpg">DESCARGAR IMAGEN</a>
                        </div>
                        
                    </div>
                </div>
                <div>
                   
                </div>
            </div>
        )
    }
});
