'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { MDBDataTable } from 'mdbreact';
import { Button } from 'reactstrap';

const CheckoutBranchTable = ({ branches, selectBranch }) => {
	function createBranchRows() {
		return branches.map((branch) => {
			let deepCopyBranch = JSON.parse(JSON.stringify(branch));
			deepCopyBranch.select = (
				<Button onClick={() => selectBranch(branch)}>Select</Button>
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
		<div className="mainblock">
			<MDBDataTable striped small responsive data={data} />
		</div>
	);
};

CheckoutBranchTable.propTypes = {
	branches: PropTypes.array,
	selectBranch: PropTypes.func,
};

export default CheckoutBranchTable;
