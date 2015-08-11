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

  filterByCategory: function(category) {
    sessionStorage.setItem("category", category);
    this.loadPhotos(false);
  },

  loadPhotos: function(loadMore) {
    var category = sessionStorage.getItem("category");
    getServerPhotos(category,loadMore);
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

  fromDateChange: function(date) {
    sessionStorage.setItem("start_date", date);
    this.loadPhotos(false);
  },

  toDateChange: function(date) {
    sessionStorage.setItem("end_date", date);
    this.loadPhotos(false);
  },

  render: function() {
    var photos = this.state.photos;
    var allPhotos = [];
    var bool = true;
    var style = {
      cursor: 'pointer'
    };

    for (var key in photos) {
      allPhotos.push(<PhotoCard key={key} photo={photos[key]} />);
    }

    var start_date = sessionStorage.getItem("start_date") || "1437058800000";
    var end_date = sessionStorage.getItem("end_date") || Date.now();

    return(
      <div className="container profileContainer">
        <div className="row">
          <div className="col-lg-offset-1 col-lg-10">
            <div className="profileHeader  centered">
              <a className="btn-large tags" onClick={this.filterByCategory.bind(null, "all")} >TODAS LAS FOTOS</a>
              <a className="btn-large tags" onClick={this.filterByCategory.bind(null, "croma")} >#CHROMA</a>
              <a className="btn-large tags" onClick={this.filterByCategory.bind(null, "sensorium")}>#SENSORIUM</a>
              <a className="btn-large tags" onClick={this.filterByCategory.bind(null, "domo")}>#DOMO</a>
            </div>
            <div className="row">
							<div className="col-md-offset-4 col-md-2 col-xs-6">
	               <DateTimeField onChange={this.fromDateChange} dateTime={start_date} inputFormat="DD/MM/YY hh:mm" style={style}/>
							</div>
              <div className="col-md-offset-0 col-md-2 col-xs-6">
								<DateTimeField onChange={this.toDateChange} dateTime={end_date} inputFormat="DD/MM/YY hh:mm" />
							</div>
						</div>
            <div className= "row centered">
              {allPhotos}
            </div>
            <div className={this.state.buttonDivClass}>
              <a className="btnMore centered center-block valign" onClick={this.loadPhotos.bind(null, true)}>CARGAR MAS</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
