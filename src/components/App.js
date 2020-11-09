'use strict';

import React from 'react';
import { Switch, Route } from 'react-router-dom';

//import Header from './Header.js';
import Home from './Home.js';
import BookContainer from './BookContainer';
import AdminHome from './Admin/AdminHome.js';
import AdminBranch from './Admin/Branch/AdminBranchContainer';
import AdminBorrower from './Admin/Borrower/AdminBorrowerContainer';
import AdminPublisher from './Admin/Publisher/AdminPublisherContainer';
import AdminGenre from './Admin/Genre/AdminGenreContainer';
//import AdminHeader from './Admin/AdminHeader.js'

export class App extends React.Component {
	render() {
		return (
			<div>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/books" component={BookContainer} />
					<Route path="/AdminHome" component={AdminHome} />
					<Route path="/AdminBorrower" component={AdminBorrower} />
					<Route path="/AdminBranch" component={AdminBranch} />
					<Route path="/AdminPublisher" component={AdminPublisher} />
					<Route path="/AdminGenre" component={AdminGenre} />
				</Switch>
			</div>
		);
	}
}
