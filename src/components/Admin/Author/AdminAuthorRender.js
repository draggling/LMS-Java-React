import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import DeleteModal from '../../Modal/AdminAuthor/DeleteModal';
import UpdateModal from '../../Modal/AdminAuthor/UpdateModal';
import CreateModal from '../../Modal/AdminAuthor/CreateModal';

const AdminAuthorRender = ({
	authorData,
	handleRefresh,
	handleDelete,
	handleUpdate,
	handleCreate,
	requestInfo,
}) => {
	let content = '';
	if (!authorData || requestInfo.readPending) {
		content = (
			<div className="d-flex justify-content-center">
				<div className="spinner-border" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		);
	}
	if (authorData && requestInfo.readSuccessful) {
		let data = {
			columns: [
				{
					label: 'Author Id',
					field: 'authorId',
					sort: 'asc',
				},
				{
					label: 'Author Name',
					field: 'authorName',
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
						buttonLabel="Create New Author"
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

	if (authorData && requestInfo.readFailed) {
		content = (
			<div className="alert alert-danger" role="alert">
				Error while loading authors!
			</div>
		);
	}
	function getTableBodyContent() {
		return authorData.authors.map((obj) => {
			// Deep Clone object to authorId adding to it while mapping over it during map
			let newObj = JSON.parse(JSON.stringify(obj));

			newObj.update = (
				<div>
					<UpdateModal
						buttonLabel="Update"
						handleUpdate={handleUpdate}
						handleRefresh={handleRefresh}
						authorId={newObj.authorId}
						currentAuthorName={newObj.authorName}
					/>
				</div>
			);

			newObj.delete = (
				<div>
					<DeleteModal
						buttonLabel="Delete"
						handleDelete={handleDelete}
						handleRefresh={handleRefresh}
						authorId={newObj.authorId}
						currentAuthorName={newObj.authorName}
					/>
				</div>
			);
			return newObj;
		});
	}
	return (
		<div>
			<h1>Authors</h1>
			{content}
		</div>
	);
};

AdminAuthorRender.propTypes = {
	authorData: PropTypes.object,
	handleRefresh: PropTypes.func,
	handleDelete: PropTypes.func,
	handleUpdate: PropTypes.func,
	handleCreate: PropTypes.func,
	requestInfo: PropTypes.object,
};

export default AdminAuthorRender;
