'use strict';

import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';

const LibrarianHeader = () => {
	return (
		<nav className="navbar navbar-inverse">
			<div className="container-fluid">
				<ul className="list-inline">
					<li className="list-inline-item">
						<Link to="/" replace>
							<AiFillHome color = "#95ABBA" />
						</Link>
					</li> &nbsp;
				</ul>
			</div>
		</nav>
	);
};

export default LibrarianHeader;
