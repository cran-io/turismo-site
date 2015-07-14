var React                          = require('react');
var Store                          = require('../stores/Store');
var PhotoCard                      = require('./PhotoCard.react');
var getServerPhotos                = require('../actions/Actions').getServerPhotos;
var getServerChromaPhotos          = require('../actions/Actions').getServerChromaPhotos;
var getServerExpertoEnViajesPhotos = require('../actions/Actions').getServerExpertoEnViajesPhotos;
var getServerDomoPhotos            = require('../actions/Actions').getServerDomoPhotos;


module.exports = React.createClass({

    getInitialState: function(){
        return {
            photos: Store.getPhotos(),
            page: 1
        };
    },
    componentWillMount: function(){
    },
    componentDidMount: function() {
        getServerPhotos(this.state.page);
        Store.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        Store.removeChangeListener(this._onChange);

    },
    todasLasFotos: function() {
        getServerPhotos();
    },
    chroma: function() {
        getServerChromaPhotos();
    },
    expertoEnViajes: function() {
        getServerExpertoEnViajesPhotos();
    },
    domo: function() {
        getServerDomoPhotos();
    },
    loadMore: function() {
        var pageCounter = parseInt(this.state.page) + parseInt(1);
        console.log(pageCounter);
        this.setState({
            page: pageCounter
        });
        getServerPhotos(pageCounter);
        
    },
   
    _onChange: function() {
        if (this.isMounted()) {
            
            this.setState({
            photos: Store.getPhotos()
            });
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
                            <a className="btn tags" onClick={this.todasLasFotos} >TODAS LAS FOTOS</a>
                            <a className="btn tags" onClick={this.chroma} >#CHROMA</a>
                            <a className="btn tags" onClick={this.expertoEnViajes}>#EXPERTO EN VIAJES</a>
                            <a className="btn tags" onClick={this.domo}>#DOMO</a>

                            
                        </div>
                        <div className= "row centered">
                            {allPhotos}
                        </div>
                        <div className="centered buttonDiv valign-wrapper  ">
                            <a className="btnMore centered center-block valign" onClick={this.loadMore}>CARGAR MAS</a>
                        </div>
                        
                    </div>
                </div>
                
                
            </div>
        )
    }
});
