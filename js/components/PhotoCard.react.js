var React               = require('react');
var ReactPropTypes      = React.PropTypes;
var Constants           = require('../constants/Constants');
var redirect            = require('../actions/RouteActions').redirect;
var RouteStore          = require('../stores/RouteStore');
var APIRoot             = Constants.APIEndpoints.PUBLIC;

var PhotoCard = React.createClass({


  getInitialState: function(){
    return {
    	icons: 'hidden',
    	blackBackground: 'hidden'
    }
  },
  componentDidMount: function() {
    RouteStore.addChangeListener(this._onChange);
  },
    
  componentWillUnmount: function() {
    RouteStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {

    if (this.isMounted()) {
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
    redirect('photo');
  },
  onClickShare: function () {
    redirect('photo');
  },

  render: function() {
    var photo = this.props.photo;
// <span className="icons-share2 icon fb-share-button" data-href="/../turismo-site/images/office.jpg" data-layout="button"></span>


    return (
      <div className="container margin20">
        <div className="col s6 l4 noPadding wCard">
        	<div className="marginCard">
            <div className="photoCard noMargin z-depth-3 " onMouseEnter={this.onPhotoIcons} onMouseLeave={this.outPhotoIcons} onClick={this.bigPhoto}>
              <div className="card-image waves-effect waves-block waves-light noMargin">
                <img className="imgCard"  src={photo}/>
              </div>
              <div className={this.state.blackBackground}></div>
              <div className={this.state.icons}>
              	<div className="valign white-text iconsDiv">
              		<span className="icons-share2 icon" onClick={this.onClickShare}></span>
              		<a className="iconLink" href={photo} download="photo1.jpg"><i className="icons-download2 icon" id = "share_button"></i></a>
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
