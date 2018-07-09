import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { HashRouter, Route, Switch } from 'react-router-dom';

import AppHeader from './Components/Header';
import AppFooter from './Components/Footer';
import Home from './Components/Home';

import Login from './Components/Auth/Login';

import Profile from './Components/Profile/Profile';

class _Routes extends React.Component {
	static withLoginRedirect(Component, user) {
		// auth mock, delete if not needed
		if (user) {
			return <Component />;
		}
		return <Redirect to="/login" />;
	}

	static propTypes = {
		user: PropTypes.object,
	};

	static defaultProps = {
		user: { admin: true }, // auth mock, delete if not needed
	};

	// withAdminAccess(Component, user) {
	// 	// auth mock, delete if not needed
	// 	if (user && user.admin) {
	// 		return <Component />;
	// 	} else {
	// 		return <Redirect to="/forbidden" />;
	// 	}
	// }

	render() {
		const { user } = this.props;

		return (
			<div>
				<HashRouter>
					<Switch>
						{/* User login */}
						<Route path="/login" component={Login} />

						{/* Home */}
						<Route exact path="/">
							<div>
								<AppHeader />
								<main>{_Routes.withLoginRedirect(Home, user)}</main>
								<AppFooter />
							</div>
						</Route>

						{/* Profile */}
						<Route path="/profile/:user?">
							<div>
								<AppHeader />
								<main>{_Routes.withLoginRedirect(Profile, user)}</main>
								<AppFooter />
							</div>
						</Route>
					</Switch>
				</HashRouter>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	// example
	loginStatus: state.loginStatus,
	user: state.user,
});

const mapDispatchToProps = dispatch => ({
	// example
	getUserPrefs: () => dispatch({ type: 'SOME_ACTION' }),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(_Routes);
