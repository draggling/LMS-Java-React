'use strict';

import React from 'react';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
	return (
		<nav className="navbar navbar-inverse">
			<div className="container-fluid">
				<ul className="list-inline">
					<li className="list-inline-item">
						<Link to="/" className="navbar-brand">
							<img width="80px" height="80px" src="images/books.png" />
						</Link>
					</li>
					<li className="list-inline-item">
						<Link to="/" replace>
							Home
						</Link>
					</li>
					<li className="list-inline-item">
						<Link to="/AdminAuthor" replace>
							Authors
						</Link>
					</li>
					<li className="list-inline-item">
						<Link to="/AdminBook" replace>
							Books
						</Link>
					</li>
					<li className="list-inline-item">
						<Link to="/AdminBorrower" replace>
							Borrowers
						</Link>
					</li>
					<li className="list-inline-item">
						<Link to="/AdminBranch" replace>
							Branches
						</Link>
					</li>
					<li className="list-inline-item">
						<Link to="/AdminGenre" replace>
							Genres
						</Link>
					</li>
					<li className="list-inline-item">
						<Link to="/AdminPublisher" replace>
							Publishers
						</Link>
					</li>
					<li className="list-inline-item">
						<Link to="/AdminLoan" replace>
							Loans
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default AdminHeader;
