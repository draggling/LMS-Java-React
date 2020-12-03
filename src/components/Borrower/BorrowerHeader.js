'use strict';

import React from 'react';
import { Link } from 'react-router-dom';

const BorrowerHeader = () => {
	return (
		<nav className="navbar navbar-inverse">
			<div className="container-fluid">
				<ul className="list-inline">
					<li className="list-inline-item">
						<Link to="/" className="navbar-brand">
							<img width="65px" height="65px" src="../images/borrower.png" />
						</Link>
					</li>
					<li className="list-inline-item">
						<Link to="/" replace>
							Home
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default BorrowerHeader;
