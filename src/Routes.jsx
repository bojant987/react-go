import React from 'react';
import { connect } from 'react-redux';
import { IndexRoute, withRouter, Redirect } from 'react-router';
import { HashRouter, Route, Switch } from 'react-router-dom';

import AppHeader from './Components/Header';
import AppFooter from './Components/Footer';
import Home from './Components/Home';

import Login from './Components/Auth/Login';

import Profile from './Components/Profile/Profile';

class _Routes extends React.Component {
	constructor(props) {
		super(props);

		this.withLoginRedirect = ::this.withLoginRedirect;
		this.withAdminAccess = ::this.withAdminAccess;
	}

	static defaultProps = {
		user: { admin: true }, // auth mock, delete if not needed
	};

	withLoginRedirect(Component, user) {
		// auth mock, delete if not needed
		if (user) {
			return <Component />;
		} else {
			return <Redirect to="/login" />;
		}
	}

	withAdminAccess(Component, user) {
		// auth mock, delete if not needed
		if (user && user.admin) {
			return <Component />;
		} else {
			return <Redirect to="/forbidden" />;
		}
	}

	render() {
		return (
			<div>
				<HashRouter>
					<Switch>
						{/*User login */}
						<Route path="/login" component={Login} />

						{/* Home */}
						<Route exact path="/">
							<div>
								<AppHeader />
								<main>{this.withLoginRedirect(Home, this.props.user)}</main>
								<AppFooter />
							</div>
						</Route>

						{/* Profile */}
						<Route path="/profile/:user?">
							<div>
								<AppHeader />
								<main>{this.withLoginRedirect(Profile, this.props.user)}</main>
								<AppFooter />
							</div>
						</Route>
					</Switch>
				</HashRouter>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		// example
		loginStatus: state.loginStatus,
		user: state.user,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		// example
		getUserPrefs: () => {
			return dispatch(getUserPrefs());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(_Routes);
