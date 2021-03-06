import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 
import { logout, redirectToLogin } from '../actions/auth';
import { setDelayedFeedback } from '../actions/feedback';
import { getLoggedIn, getUser, getUserIsAdmin } from '../reducers/auth';

class Header extends Component {
	render () {	
		return (
			<header>
			  <nav className="navbar navbar-expand-lg navbar-light bg-light">
			    <div className="container">
			    <Link to="/" className="navbar-brand">React JWT</Link>
			      <div className="navbar-collapse" id="navbar">
					{ 
					(this.props.loggedIn)
					  ? <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
			          		<li className="nav-item active">
			            		<Link to="/" className="nav-link">Home</Link>
			          		</li>
			          		<li className="nav-item active">
			            		<Link to="/posts" className="nav-link">Posts</Link>
			          		</li>
			          		{
			          			(this.props.isUserAdmin)
			          			? <li className="nav-item active">
			            			<Link to="/admin" className="nav-link">Admin</Link>
			          			  </li>
			          			: null
			          		}
			        	</ul>
					  : null
					}
				    { 
				        (this.props.loggedIn)
				          ? <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
				          		<li className="nav-item">
				          			Logged in as <strong>{this.props.user.username}</strong> <a onClick={event => this.onClickLogout(event)}><em>(Logout)</em></a>
				          		</li>
				          	</ul>
				          : <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
					          	<li className="nav-item active">
						        	<Link to="/login" className="nav-link">Login</Link>
						        </li>
						        <li className="nav-item">
						           <Link to="/register" className="nav-link">Register</Link>
						        </li>
						        </ul>
				      }			                  
			      </div>      
			    </div>
			  </nav> 
			</header>
		);
	}
	onClickLogout(event) {
		event.preventDefault();
		this.props.logout();
		this.props.setDelayedFeedback({message: 'Successfully logged out', type: 'info'});
		this.props.redirectToLogin();
	}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logout: logout,
    setDelayedFeedback: setDelayedFeedback,
    redirectToLogin: redirectToLogin
  }, dispatch)
}

function mapStateToProps(state) {
  return {
  	loggedIn: getLoggedIn(state),
  	user: getUser(state),
  	isUserAdmin: getUserIsAdmin(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);