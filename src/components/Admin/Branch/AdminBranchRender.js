'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { MDBDataTable } from 'mdbreact';
import DeleteModal from '../../Modal/AdminBranch/DeleteModal';
import UpdateModal from '../../Modal/AdminBranch/UpdateModal';
import CreateModal from '../../Modal/AdminBranch/CreateModal';
import Spinner from '../../Util/Spinner'

const AdminBranchRender = ({
	branchData,
	handleRefresh,
	handleDelete,
	handleUpdate,
	handleCreate,
	requestInfo,
}) => {
	let content = '';
	if (!branchData || requestInfo.readPending) {
		content = Spinner();
	}
	if (branchData && requestInfo.readSuccessful) {
		let data = {
			columns: [
				/*
				{
					label: 'Branch Id',
					field: 'branchId',
					display: 'asc',
				},
				*/
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
					label: 'Delete',
					field: 'delete',
					sort: 'asc',
				},
			],
			rows: getTableBodyContent(),
		};
		return (
			<React.Fragment>
				<div className="mainblock">
					<CreateModal
						buttonLabel="Create New Branch"
						handleCreate={handleCreate}
						handleRefresh={handleRefresh}
					/>
					<MDBDataTable
						striped
						//bordered
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

			newObj.delete = (
				<div>
					<DeleteModal
						buttonLabel="Delete"
						handleDelete={handleDelete}
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
			{content}
		</div>
	);
};

AdminBranchRender.propTypes = {
	branchData: PropTypes.object,
	handleRefresh: PropTypes.func,
	handleDelete: PropTypes.func,
	handleUpdate: PropTypes.func,
	handleCreate: PropTypes.func,
	requestInfo: PropTypes.object,
};

export default AdminBranchRender;
