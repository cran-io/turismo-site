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
            page: 1,
            buttonDivClass: "centered buttonDiv valign-wrapper",
            todas: true,
            domo: false,
            experto: false,
            chroma: false
        };
    },
    componentWillMount: function(){
    },
    componentDidMount: function() {
        getServerPhotos(1);
        Store.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        Store.removeChangeListener(this._onChange);

    },
    todasLasFotos: function() {
        this.setState({
            page: 1
        });
        getServerPhotos(1);
    },
    chroma: function() {
        this.setState({
            page: 1
        });
        getServerChromaPhotos(1);
    },
    expertoEnViajes: function() {
        this.setState({
            page: 1
        });
        getServerExpertoEnViajesPhotos(1);
    },
    domo: function() {
        this.setState({
            page: 1
        });
        getServerDomoPhotos(1);
    },
    loadMore: function() {
        var pageCounter = parseInt(this.state.page) + parseInt(1);
        this.setState({
            page: pageCounter
        });
        if(this.state.todas){
            getServerPhotos(pageCounter);
        }else if(this.state.chroma){
            getServerChromaPhotos(pageCounter);
        }else if(this.state.experto){
            getServerExpertoEnViajesPhotos(pageCounter);
        }else if(this.state.domo){
            getServerDomoPhotos(pageCounter);
        }
       
        
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
        }else{
            this.setState({
                buttonDivClass: "centered buttonDiv valign-wrapper"
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
                        <div className={this.state.buttonDivClass}>
                            <a className="btnMore centered center-block valign" onClick={this.loadMore}>CARGAR MAS</a>
                        </div>
                        
                    </div>
                </div>
                
                
            </div>
        )
    }
});
