var React               = require('react');
var ReactPropTypes      = React.PropTypes;
var Constants           = require('../constants/Constants');
var APIRoot             = Constants.APIEndpoints.PUBLIC;

var PhotoCard = React.createClass({


  getInitialState: function(){
    return {
    	icons: 'hidden',
    	blackBackground: 'hidden'
    }
  },
  onPhotoIcons: function () {
  	this.setState({ 
      icons: 'photoIcons valign-wrapper centered',
      blackBackground: 'blackBackground'
    });
  },
  outPhotoIcons: function () {
  	this.setState({ 
      icons: 'hidden',
      blackBackground: 'hidden'
    });
  },
  bigPhoto: function () {
  	console.log("click");
  },
  onClickShare: function () {
  	console.log("click share");
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
              <div className={this.state.blackBackground}></div>
              <div className={this.state.icons}>
              	<div className="valign white-text iconsDiv">
              		<span className="icons-share2 icon fb-share-button" data-href="/../turismo-site/images/office.jpg" data-layout="button"></span>
              		<a className="iconLink" href="/../turismo-site/images/office.jpg" download="photo1.jpg"><button className="icons-download2 icon" id = "share_button"></button></a>
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
