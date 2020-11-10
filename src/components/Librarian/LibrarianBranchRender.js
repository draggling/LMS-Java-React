'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import UpdateModal from '../Modal/AdminBranch/UpdateModal';

const LibrarianBranchRender = ({
	branchData,
	handleRefresh,
	handleUpdate,
	requestInfo,
}) => {
	let content = '';
	if (!branchData || requestInfo.readPending) {
		content = (
			<div className="d-flex justify-content-center">
				<div className="spinner-border" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		);
	}
	if (branchData && requestInfo.readSuccessful) {
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
					label: 'Update',
					field: 'update',
					sort: 'asc',
                },
                {
                    label: 'Modify BookCopies',
                }
			],
			rows: getTableBodyContent(),
		};
		return (
			<React.Fragment>
				<div className="mainblock">
					<Button onClick={() => handleRefresh()}>
						Refresh Data
					</Button>{' '}
					<MDBDataTable
						striped
						bordered
						small
						responsive
						data={data}
					/>
				</div>
			</React.Fragment>
		);
	}

	if (branchData && requestInfo.readFailed) {
		content = (
			<div className="alert alert-danger" role="alert">
				Error while loading branches!
			</div>
		);
	}
	function getTableBodyContent() {
		return branchData.branches.map((obj) => {
			// Deep Clone object to avoid adding to it while mapping over it during map
			let newObj = JSON.parse(JSON.stringify(obj));

			newObj.update = (
				<div>
					<UpdateModal
						buttonLabel="Update"
						handleUpdate={handleUpdate}
						handleRefresh={handleRefresh}
						id={newObj.branchId}
						currentBranchName={newObj.branchName}
						currentBranchAddress={newObj.branchAddress}
					/>
				</div>
			);

			return newObj;
		});
	}
	return (
		<div>
			<h1>Librarian Branch Management</h1>
			{content}
		</div>
	);
};

LibrarianBranchRender.propTypes = {
	branchData: PropTypes.object,
	handleRefresh: PropTypes.func,
	handleUpdate: PropTypes.func,
	requestInfo: PropTypes.object,
};

export default LibrarianBranchRender;
