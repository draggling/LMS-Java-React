'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import DeleteModal from '../../Modal/AdminBorrower/DeleteModal';
import UpdateModal from '../../Modal/AdminBorrower/UpdateModal';
import CreateModal from '../../Modal/AdminBorrower/CreateModal';
import Spinner from '../../Util/Spinner'

const AdminBorrowerRender = ({
	borrowerData,
	handleRefresh,
	handleDelete,
	handleUpdate,
	handleCreate,
	requestInfo,
}) => {
	let content = '';
	if (!borrowerData || requestInfo.readPending) {
		content = Spinner();
	}
	if (borrowerData && requestInfo.readSuccessful) {
		let data = {
			columns: [
				{
					label: 'Borrower Name',
					field: 'borrowerName',
					sort: 'asc',
				},
				{
					label: 'Borrower Address',
					field: 'borrowerAddress',
					sort: 'asc',
				},
				{
					label: 'Borrower Phone #',
					field: 'borrowerPhone',
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
						buttonLabel="Create New Borrower"
						handleCreate={handleCreate}
						handleRefresh={handleRefresh}
					/>
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

	if (borrowerData && requestInfo.readFailed) {
		content = (
			<div className="alert alert-danger" role="alert">
				Error while loading borrowers!
			</div>
		);
	}
	function getTableBodyContent() {
		return borrowerData.borrowers.map((obj) => {
			// Deep Clone object to avocardNo adding to it while mapping over it during map
			let newObj = JSON.parse(JSON.stringify(obj));

			newObj.update = (
				<div>
					<UpdateModal
						buttonLabel="Update"
						handleUpdate={handleUpdate}
						handleRefresh={handleRefresh}
						cardNo={newObj.borrowerCardNo}
						currentBorrowerName={newObj.borrowerName}
						currentBorrowerAddress={newObj.borrowerAddress}
						currentBorrowerPhone={newObj.borrowerPhone}
					/>
				</div>
			);

			newObj.delete = (
				<div>
					<DeleteModal
						buttonLabel="Delete"
						handleDelete={handleDelete}
						handleRefresh={handleRefresh}
						cardNo={newObj.borrowerCardNo}
						currentBorrowerName={newObj.borrowerName}
						currentBorrowerAddress={newObj.borrowerAddress}
						currentBorrowerPhone={newObj.borrowerPhone}
					/>
				</div>
			);
			return newObj;
		});
	}
	return (
		<div>
			<h1>Borroweres</h1>
			{content}
		</div>
	);
};

AdminBorrowerRender.propTypes = {
	borrowerData: PropTypes.object,
	handleRefresh: PropTypes.func,
	handleDelete: PropTypes.func,
	handleUpdate: PropTypes.func,
	handleCreate: PropTypes.func,
	requestInfo: PropTypes.object,
};

export default AdminBorrowerRender;
