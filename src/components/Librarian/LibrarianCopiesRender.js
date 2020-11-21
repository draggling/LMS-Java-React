'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import UpdateModal from '../Modal/Librarian/UpdateModal';
import UpdateBookCopiesModal from '../Modal/Librarian/UpdateBookCopiesModal'

const LibrarianCopiesRender = ({
	copiesData,
	handleRefresh,
	handleUpdate,
	handleCopies,
	requestInfo,
}) => {
	let content = '';
	if (!copiesData || requestInfo.readPending) {
		content = (
			<div className="d-flex justify-content-center">
				<div className="spinner-border" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		);
	}
	if (copiesData && requestInfo.readSuccessful) {
		let data = {
			columns: [
				{
					label: 'Copies Name',
					field: 'copiesName',
					sort: 'asc',
				},
				{
					label: 'Copies Address',
					field: 'copiesAddress',
					sort: 'asc',
				},
				{
					label: 'Copies Info',
					field: 'update',
					sort: 'asc'
				},
                {
					label: 'Book Copies',
					field: 'copies',
					sort: 'asc',
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

	if (copiesData && requestInfo.readFailed) {
		content = (
			<div className="alert alert-danger" role="alert">
				Error while loading copies!
			</div>
		);
	}
	function getTableBodyContent() {
		return copiesData.copies.map((obj) => {
			// Deep Clone object to avoid adding to it while mapping over it during map
			let newObj = JSON.parse(JSON.stringify(obj));
			newObj.update = (
				<div>
					<UpdateModal
						buttonLabel="Update"
						handleUpdate={handleUpdate}
						handleRefresh={handleRefresh}
						id={newObj.copiesId}
						currentCopiesName={newObj.copiesName}
						currentCopiesAddress={newObj.copiesAddress}
					/>
				</div>
			);
			newObj.copies = (
				<div>
					<UpdateBookCopiesModal
					buttonLabel="Books"
					copiesId={newObj.copiesId}
					copiesName={newObj.copiesName}
					handleRefresh={handleRefresh}
					handleCopies={handleCopies}
					/>
				</div>
			)

			return newObj;
		});
	}
	return (
		<div>
			<h1>Copies</h1>
			{content}
		</div>
	);
};

LibrarianCopiesRender.propTypes = {
	copiesData: PropTypes.object,
	handleRefresh: PropTypes.func,
	handleUpdate: PropTypes.func,
	handleCopies: PropTypes.func,
	requestInfo: PropTypes.object,
};

export default LibrarianCopiesRender;