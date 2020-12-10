'use strict';

import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { AiFillHome } from 'react-icons/ai';

const BorrowerHeader = () => {
	return (
		<Row>
			<Col xl={{ size: 8, offset: 2 }} sm={12}>
				<nav className="navbar navbar-inverse">
					<div className="container-fluid">
						<ul className="list-inline">
							<li className="list-inline-item">
								<Link to="/" replace>
									<AiFillHome color="#95ABBA" />
								</Link>
							</li>
						</ul>
					</div>
				</nav>
			</Col>
		</Row>
	);
};

export default BorrowerHeader;
