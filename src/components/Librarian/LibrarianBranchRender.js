'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import UpdateModal from '../Modal/Librarian/UpdateModal';
import UpdateBookCopiesModal from '../Modal/Librarian/UpdateBookCopiesModal'
import LibrarianCopiesRender from './LibrarianCopiesRender';
import LibrarianNonCopiesRender from './LibrarianNonCopiesRender';

const LibrarianBranchRender =  ({
	selectedBranch,
	branchData,
	handleRefresh,
	handleUpdate,
	setCopies,
	requestInfo,
	requestInfoCopies,
	selectBranch,
	startReadCopies,
	startReadNonCopies,
	bookCopies,
	bookNonCopies,
	Switch,
}) => {
	let content = '';
	let branchTable = '';

	if(selectedBranch > 0 && bookCopies === undefined && !requestInfoCopies.readCopiesPending && !requestInfoCopies.readCopiesSuccessful) {
		startReadCopies(selectedBranch);
	}
	if(selectedBranch > 0 && bookNonCopies === undefined && !requestInfoCopies.readNonCopiesPending && !requestInfoCopies.readNonCopiesSuccessful) {
		startReadNonCopies(selectedBranch);
	}

	if (!branchData || requestInfo.readPending || requestInfo.readCopiesPending || requestInfo.readNonCopiesPending) {
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
					label: 'Update Branch',
					field: 'update',
					sort: 'asc'
				},
                {
					label: 'Select',
					field: 'select',
					sort: 'asc',
                }
			],
			rows: getTableBodyContent(),
		};
		branchTable =	 (
			<React.Fragment>
				<div className="mainblock">
					<h1>Branches</h1>
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
			newObj.copies = (
				<div>
					<UpdateBookCopiesModal
					buttonLabel="Books"
					branchId={newObj.branchId}
					branchName={newObj.branchName}
					handleRefresh={handleRefresh}
					setCopies={setCopies}
					/>
				</div>
			)
			newObj.select = (
				<Button onClick={() => selectBranch(newObj.branchId)}>Select</Button>
			);

			return newObj;
		});
	}


	function changeView() {
		Switch();
	}
	function showNonBookCopies() {
		return(
			<div>
				<Button color="success" disabled> View Books In Library </Button>
				<Button color="primary" onClick={changeView}> View Books not in Library</Button>
				<LibrarianNonCopiesRender
				branchData = {branchData}
				selectedBranch = {selectedBranch}
				handleRefresh = {handleRefresh}
				setCopies = {setCopies}
				requestInfoCopies = {requestInfoCopies} 
				bookNonCopies = {bookNonCopies}
				/>
			</div>
		);
	}


	function showBookCopies() {
		return(
			<div>
				<Button color="success" disabled> View Books In Library </Button>
				<Button color="primary" onClick={changeView}> View Books not in Library</Button>
				<LibrarianCopiesRender
				branchData = {branchData}
				selectedBranch = {selectedBranch}
				handleRefresh = {handleRefresh}
				setCopies = {setCopies}
				requestInfoCopies = {requestInfoCopies} 
				bookCopies = {bookCopies}
				/>
			</div>
		);
	}

	function showTable() {
		if(branchData && requestInfo 
			&& requestInfoCopies
			&& (requestInfoCopies.readCopiesSuccessful
			&& requestInfoCopies.readNonCopiesSuccessful)) {
			if(!requestInfoCopies.inLibrary) {
				return showNonBookCopies();
			} else {
				return showBookCopies();
			}
		} else if(requestInfo && requestInfo.readSuccessful && branchData) {
			return branchTable;
		}
		return <h1> ERROR </h1>
	}

	return (
		<div>
			{content}
			{showTable()}
		</div>
	);
};

LibrarianBranchRender.propTypes = {
	Switch: PropTypes.func,
	branchData: PropTypes.object,
	bookCopies: PropTypes.array,
	bookNonCopies: PropTypes.array,
	selectedBranch: PropTypes.number,
	selectBranch: PropTypes.func,
	handleRefresh: PropTypes.func,
	handleUpdate: PropTypes.func,
	setCopies: PropTypes.func,
	requestInfo: PropTypes.object,
	requestInfoCopies: PropTypes.object,
	startReadCopies: PropTypes.func,
	startReadNonCopies: PropTypes.func,
};

export default LibrarianBranchRender;