var React = require('react');
var Store = require('../stores/Store');
var PhotoCard = require('./PhotoCard.react');
var getServerPhotos = require('../actions/Actions').getServerPhotos;
var DateTimeField = require('react-bootstrap-datetimepicker');

module.exports = React.createClass({

  getInitialState: function(){
    return {
      photos: Store.getPhotos(),
      buttonDivClass: "centered buttonDiv valign-wrapper"
    };
  },

  componentWillMount: function(){
  },

  componentDidMount: function() {
    var category = sessionStorage.getItem("category");
    getServerPhotos(category, false);
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
  },

  todasLasFotos: function() {
    var category = "all";
    sessionStorage.setItem("category", category)
    getServerPhotos(category, false);
  },

  chroma: function() {
    var category = "croma";
    sessionStorage.setItem("category", category)
    getServerPhotos(category, false);
  },

  expertoEnViajes: function() {
    var category = "experto";
    sessionStorage.setItem("category", category)
    getServerPhotos(category, false);
  },

  domo: function() {
    var category = "domo";
    sessionStorage.setItem("category", category)
    getServerPhotos(category, false);
  },

  loadMore: function() {
    var category = sessionStorage.getItem("category");
    getServerPhotos(category,true);
  },

  _onChange: function() {
    if (this.isMounted()) {
      this.setState({
        photos: Store.getPhotos()
      });
    }

    if(this.state.photos == null || this.state.photos.length == 0){
      this.setState({
        buttonDivClass: "hidden"
      });
    } else {
      if(Store.noMore()){
        this.setState({
          buttonDivClass: "hidden"
        })
      } else {
        this.setState({
          buttonDivClass: "centered buttonDiv valign-wrapper"
        });
      }
    }
  },

  render: function() {
    var photos = this.state.photos;
    var allPhotos = [];

    for (var key in photos) {
      allPhotos.push(<PhotoCard key={key} photo={photos[key]} />);
    }

    return(
      <div className="container profileContainer">
        <div className="row">
          <div className="col-lg-offset-1 col-lg-10">
            <div className="profileHeader  centered">
              <a className="btn-large tags" onClick={this.todasLasFotos} >TODAS LAS FOTOS</a>
              <a className="btn-large tags" onClick={this.chroma} >#CHROMA</a>
              <a className="btn-large tags" onClick={this.expertoEnViajes}>#EXPERTO EN VIAJES</a>
              <a className="btn-large tags" onClick={this.domo}>#DOMO</a>
            </div>
            <div className="row">
							<div className="col-md-offset-4 col-md-2 col-xs-6">
								<DateTimeField />
							</div>
              <div className="col-md-offset-0 col-md-2 col-xs-6">
								<DateTimeField />
							</div>
						</div>
            <div className= "row centered">
              {allPhotos}
            </div>
            <div className={this.state.buttonDivClass}>
              <a className="btnMore centered center-block valign" onClick={this.loadMore}>CARGAR MAS</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
