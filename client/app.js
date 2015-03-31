var React = require('react');
var Firebase = require('firebase');
var myoRef = null;

var Frontpage = React.createClass({
	getInitialState: function() {
		return {pose:null};
	},
	render: function() {
		return <div>{this.state.pose}</div>;
	},
	componentDidMount: function() {
		var that = this;
		myoRef = new Firebase('https://mymyo.firebaseio.com/pose');
		myoRef.on("value", function(snapshot) {
			that.setState({pose:snapshot.val()});
		});
	},
	componentWillUnmount: function() {
		myoRef.off();
	}
});

React.render(<Frontpage />, 
	document.getElementById('mainContent'));
