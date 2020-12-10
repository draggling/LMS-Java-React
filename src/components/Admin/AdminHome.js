'use strict';

import React from 'react';
import AdminHeader from './AdminHeader.js';
const AdminHome = () => {
	return (
		<div>
			<AdminHeader />
			<div className="jumbotron">
				<img width="65pxpx" height="65px" src="../../images/admin.png" />
					<h1>&nbsp;&nbsp;Admin Home&nbsp;&nbsp;</h1>
				<img width="65pxpx" height="65px" src="../../images/admin.png" />			
			</div>
		</div>
	);
};

export default AdminHome;
