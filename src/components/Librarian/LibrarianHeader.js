'use strict';

import React from 'react';
import { Link } from 'react-router-dom';

const LibrarianHeader = () => {
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
				</ul>
			</div>
		</nav>
	);
};

export default LibrarianHeader;
