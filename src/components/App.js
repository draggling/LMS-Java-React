'use strict';

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home.js';
import AdminHome from './Admin/AdminHome.js';
import AdminAuthor from './Admin/Author/AdminAuthorContainer';
import AdminBook from './Admin/Book/AdminBookContainer';
import AdminBorrower from './Admin/Borrower/AdminBorrowerContainer';
import AdminBranch from './Admin/Branch/AdminBranchContainer';
import AdminPublisher from './Admin/Publisher/AdminPublisherContainer';
import AdminGenre from './Admin/Genre/AdminGenreContainer';
import AdminLoan from './Admin/Loan/AdminLoanContainer';
import Borrower from './Borrower/BorrowerContainer';
import LibrarianBranch from './Librarian/LibrarianBranchContainer';

export class App extends React.Component {
	render() {
		return (
			<div className="app">
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/AdminHome" component={AdminHome} />
					<Route path="/AdminAuthor" component={AdminAuthor} />
					<Route path="/AdminBook" component={AdminBook} />
					<Route path="/AdminBorrower" component={AdminBorrower} />
					<Route path="/AdminBranch" component={AdminBranch} />
					<Route path="/AdminPublisher" component={AdminPublisher} />
					<Route path="/AdminGenre" component={AdminGenre} />
					<Route path="/AdminLoan" component={AdminLoan} />
					<Route path="/Borrower" component={Borrower} />
					<Route path="/LibrarianBranch" component={LibrarianBranch} />
				</Switch>
			</div>
		);
	}
}
