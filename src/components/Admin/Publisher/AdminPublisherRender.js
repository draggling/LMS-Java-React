'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import DeleteModal from '../../Modal/AdminPublisher/DeleteModal';
import UpdateModal from '../../Modal/AdminPublisher/UpdateModal';
import CreateModal from '../../Modal/AdminPublisher/CreateModal';
import Spinner from '../../Util/Spinner'

const AdminPublisherRender = ({
	publisherData,
	handleRefresh,
	handleDelete,
	handleUpdate,
	handleCreate,
	requestInfo,
}) => {
	let content = '';
	if (!publisherData || requestInfo.readPending) {
		content = Spinner();
	}
	if (publisherData && requestInfo.readSuccessful) {
		let data = {
			columns: [
				/*
				{
					label: 'Publisher Id',
					field: 'publisherId',
					sort: 'asc',
				},
				*/
				{
					label: 'Publisher Name',
					field: 'publisherName',
					sort: 'asc',
				},
				{
					label: 'Address',
					field: 'publisherAddress',
					sort: 'asc',
				},
				{
					label: 'Phone',
					field: 'publisherPhone',
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
						buttonLabel="Create New Publisher"
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

	if (publisherData && requestInfo.readFailed) {
		content = (
			<div className="alert alert-danger" role="alert">
				Error while loading publisheres!
			</div>
		);
	}
	function getTableBodyContent() {
		return publisherData.publishers.map((obj) => {
			// Deep Clone object to avoid adding to it while mapping over it during map
			let newObj = JSON.parse(JSON.stringify(obj));

			newObj.update = (
				<div>
					<UpdateModal
						buttonLabel="Update"
						handleUpdate={handleUpdate}
						handleRefresh={handleRefresh}
						id={newObj.publisherId}
						currentPublisherName={newObj.publisherName}
						currentPublisherAddress={newObj.publisherAddress}
						currentPublisherPhone={newObj.publisherPhone}
					/>
				</div>
			);

			newObj.delete = (
				<div>
					<DeleteModal
						buttonLabel="Delete"
						handleDelete={handleDelete}
						handleRefresh={handleRefresh}
						id={newObj.publisherId}
						currentPublisherName={newObj.publisherName}
						currentPublisherAddress={newObj.publisherAddress}
						currentPublisherPhone={newObj.publisherPhone}
					/>
				</div>
			);
			return newObj;
		});
	}
	return (
		<div>
			<h1>Publishers</h1>
			{content}
		</div>
	);
};

AdminPublisherRender.propTypes = {
	publisherData: PropTypes.object,
	handleRefresh: PropTypes.func,
	handleDelete: PropTypes.func,
	handleUpdate: PropTypes.func,
	handleCreate: PropTypes.func,
	requestInfo: PropTypes.object,
};

export default AdminPublisherRender;
