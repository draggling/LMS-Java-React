'use strict';

import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';

const BorrowerHeader = () => {
	return (
		<nav className="navbar navbar-inverse">
			<div className="container-fluid">
				<ul className="list-inline">
					<li className="list-inline-item">
						<Link to="/" replace>
							<AiFillHome color = "#95ABBA" />
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default BorrowerHeader;
