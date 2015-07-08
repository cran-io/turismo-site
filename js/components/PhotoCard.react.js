var React               = require('react');
var ReactPropTypes      = React.PropTypes;
var Constants           = require('../constants/Constants');
var APIRoot             = Constants.APIEndpoints.PUBLIC;

var PhotoCard = React.createClass({


  getInitialState: function(){
    return {
    	icons: 'hidden'
    }
  },
  onPhotoIcons: function () {
  	this.setState({ 
      icons: 'photoIcons valign-wrapper centered'
    });
  },
  outPhotoIcons: function () {
  	this.setState({ 
      icons: 'hidden'
    });
  },
  bigPhoto: function () {
  	console.log("click");
  },

  render: function() {



    return (
      <div className="container noSideMargin">
        <div className="row">
        	<div className="col s6 l4 noPadding">
            <div className="photoCard noMargin z-depth-3 " onMouseEnter={this.onPhotoIcons} onMouseLeave={this.outPhotoIcons} onClick={this.bigPhoto}>
              <div className="card-image waves-effect waves-block waves-light noMargin">
                <img className="imgCard"  src="/../turismo-site/images/office.jpg"/>
              </div>
              <div className={this.state.icons}>
              	<div className="valign white-text iconsDiv">
              		<span className="icons-heart icon fb-share-button" data-href="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQFzyV5S9XbJKJhlsjCRNyWM7Tx3sP0eDQUwJe5VD-dG_FgcZbN/" data-layout="button"></span>
              		<span className="icons-bubble icon pull-right" id = "share_button"></span>
              	</div>
              </div>
              
              <div className="card-reveal valign-wrapper noMargin">
                <span className="card-title white-text valign">close</span>
              </div>
            </div>
        	</div>
        </div>
    	</div>
    );
  }
});

module.exports = PhotoCard;
