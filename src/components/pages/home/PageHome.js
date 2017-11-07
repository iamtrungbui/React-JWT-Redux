import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

class PageHome extends Component {
	constructor(props) {
		super(props);
	}
	render () {
		return (
			<div>
				<h1 className="display-4">Home</h1>
				{ JSON.stringify(this.props.auth) }
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth
	}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PageHome);