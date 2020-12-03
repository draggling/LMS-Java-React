import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { MDBDataTable, Alert} from 'mdbreact';
import DeleteModal from '../../Modal/AdminGenre/DeleteModal';
import UpdateModal from '../../Modal/AdminGenre/UpdateModal';
import CreateModal from '../../Modal/AdminGenre/CreateModal';

const AdminGenreRender = ({
	genreData,
	handleRefresh,
	handleDelete,
	handleUpdate,
	handleCreate,
	requestInfo,
}) => {
	let content = '';
	let alert = '';

	if(requestInfo !== undefined && requestInfo.exists !== undefined && requestInfo.exists) {
			alert = (
			<div>
				<Alert color="warning">
					ERROR: Genre Already Exists!
				</Alert>
			</div>
			);
	}

	if(requestInfo !== undefined && requestInfo.exists !== undefined && requestInfo.exists) {
		alert = (
		<div>
			<Alert color="warning">
				ERROR: Genre Already Exists!
			</Alert>
		</div>
		);
}

	if (genreData && requestInfo.readSuccessful) {
		let data = {
			columns: [
				/*
				{
					label: 'Genre Id',
					field: 'genreId',
					sort: 'asc',
				},
				*/
				{
					label: 'Genre Name',
					field: 'genreName',
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
				{alert}
				<div className="mainblock">
					<CreateModal
						buttonLabel="Create New Genre"
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

	if (genreData && requestInfo.readFailed) {
		content = (
			<div className="alert alert-danger" role="alert">
				Error while loading genres!
			</div>
		);
	}
	function getTableBodyContent() {
		return genreData.genres.map((obj) => {
			// Deep Clone object to genreId adding to it while mapping over it during map
			let newObj = JSON.parse(JSON.stringify(obj));

			newObj.update = (
				<div>
					<UpdateModal
						buttonLabel="Update"
						handleUpdate={handleUpdate}
						handleRefresh={handleRefresh}
						genreId={newObj.genreId}
						currentGenreName={newObj.genreName}
					/>
				</div>
			);

			newObj.delete = (
				<div>
					<DeleteModal
						buttonLabel="Delete"
						handleDelete={handleDelete}
						handleRefresh={handleRefresh}
						genreId={newObj.genreId}
						currentGenreName={newObj.genreName}
					/>
				</div>
			);
			return newObj;
		});
	}
	return (
		<div>
			<h1>Genres</h1>
			{content}
		</div>
	);
};

AdminGenreRender.propTypes = {
	genreData: PropTypes.object,
	handleRefresh: PropTypes.func,
	handleDelete: PropTypes.func,
	handleUpdate: PropTypes.func,
	handleCreate: PropTypes.func,
	requestInfo: PropTypes.object,
};

export default AdminGenreRender;