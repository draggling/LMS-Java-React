'use strict';

import React from 'react';
import Header from './header.js';
const Home = () => {
	return (
		<div className="main">
			<Header />
			<div className="jumbotron">
				<img width="90px" height="65px" src="images/home.png"></img>
				<h1>&nbsp;&nbsp; Library Management System &nbsp;&nbsp;</h1>
				<img width="90px" height="65px" src="images/home.png"></img>
			</div>
		</div>
	);
};

export default Home;
