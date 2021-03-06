import React, { Component } from 'react';

export default class RegisterForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			email: '',
			password: ''
		};
	}
	render () {
		return (
			<form onSubmit={event => this.submitForm(event, this.state)}>
				<div className="form-group">
					<label>Username</label>
					<input 
						type="text" 
						className="form-control" 
						id="username" 
						placeholder="Enter username" 
						onChange={event => this.setState({username: event.target.value})}
					/>
				</div>	
				<div className="form-group">
					<label>Email address</label>
					<input 
						type="email" 
						className="form-control" 
						id="email" 
						placeholder="Enter email address" 
						onChange={event => this.setState({email: event.target.value})}
					/>
				</div>								
				<div className="form-group">
					<label>Password</label>
					<input 
						type="password" 
						className="form-control" 
						id="password" 
						placeholder="Enter password" 
						onChange={event => this.setState({password: event.target.value})}
					/>
				</div>
				<button type="submit" className="btn btn-primary">Register</button>
			</form>
		);
	}

	submitForm(event, data) {
		event.preventDefault();
		this.props.register(this.state)
			.then(response => {
				this.props.setDelayedFeedback({message: 'Logged in', type: 'info'});
				this.props.history.push('/');
			}).catch(error => {
				this.props.setFeedback({message: error.data, type: 'warning'});
			});
	}
}