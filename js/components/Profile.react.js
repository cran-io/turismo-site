var React                        = require('react');
var PhotoCard                    = require('./PhotoCard.react');


module.exports = React.createClass({

    getInitialState: function(){
        return {
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

        return(
            <div className="container height100">
                <div className="profileHeader">
                    <p>hola holaaaa </p>
                </div>
                <div>
                    <PhotoCard />
                </div>
            </div>
        )
    }
});
