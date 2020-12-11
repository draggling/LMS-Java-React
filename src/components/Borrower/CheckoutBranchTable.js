'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { MDBDataTable } from 'mdbreact';
import { Button, Col, Row } from 'reactstrap';

const CheckoutBranchTable = ({ branches, selectBranch }) => {
	function createBranchRows() {
		return branches.map((branch) => {
			let deepCopyBranch = JSON.parse(JSON.stringify(branch));
			deepCopyBranch.select = (
				<Button className="mdbtable-btn" onClick={() => selectBranch(branch)}>
					Select
				</Button>
			);
			return deepCopyBranch;
		});
	}
	let data = {
		columns: [
			{
				label: 'Branch Name',
				field: 'branchName',
				sort: 'asc',
			},
			{
				label: 'Branch Address',
				field: 'branchAddress',
				sort: 'asc',
			},
			{
				label: 'Select',
				field: 'select',
				sort: 'asc',
			},
		],
		rows: createBranchRows(),
	};
	return (
		<Row key={1}>
			<Col xs={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2 }}>
				<br></br>
				<h4 className="centered-text">
					Checkout a book from any of these branches{' '}
				</h4>
				<br></br>
				<MDBDataTable striped small responsive data={data} />
			</Col>
		</Row>
	);
};

CheckoutBranchTable.propTypes = {
	branches: PropTypes.array,
	selectBranch: PropTypes.func,
};

export default CheckoutBranchTable;
