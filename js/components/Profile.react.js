var React                        = require('react');
var Store                        = require('../stores/Store');
var PhotoCard                    = require('./PhotoCard.react');


module.exports = React.createClass({

    getInitialState: function(){
        return {
            photos: Store.getPhotos()
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
        var photos = this.state.photos;
        var allPhotos = [];

        for (var key in photos) {
            allPhotos.push(<PhotoCard key={key} photo={photos[key]} />);
        }

        return(
            <div className="container profileContainer">
                <div className="row">
                    <div className="col-lg-offset-1 col-lg-10">
                        <div className="profileHeader">
                            <p></p>
                        </div>
                        <div className= "row centered">
                            {allPhotos}
                        </div>
                    </div>
                </div>
                
                
            </div>
        )
    }
});
