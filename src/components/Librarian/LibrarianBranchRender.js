'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import UpdateModal from '../Modal/Librarian/UpdateModal';
import UpdateBookCopiesModal from '../Modal/Librarian/UpdateBookCopiesModal'
import LibrarianCopiesRender from './LibrarianCopiesRender';
import LibrarianNonCopiesRender from './LibrarianNonCopiesRender';
import Spinner from '../Util/Spinner';


const LibrarianBranchRender =  ({
	selectedBranch,
	branchData,
	handleRefresh,
	handleUpdate,
	setCopies,
	setNonCopies,
	requestInfo,
	requestInfoCopies,
	selectBranch,
	startReadCopies,
	startReadNonCopies,
	bookCopies,
	bookNonCopies,
	Switch,
	branchSelect,
}) => {
	let content = '';
	let branchTable = '';

	if(selectedBranch > 0 && bookCopies === undefined && !requestInfoCopies.readCopiesPending && !requestInfoCopies.readCopiesSuccessful) {
		startReadCopies(selectedBranch);
	}
	if(selectedBranch > 0 && bookNonCopies === undefined && !requestInfoCopies.readNonCopiesPending && !requestInfoCopies.readNonCopiesSuccessful &&requestInfoCopies.readCopiesSuccessful) {
		startReadNonCopies(selectedBranch);
	}

	if (!branchData || requestInfo.readPending || requestInfo.readCopiesPending || requestInfo.readNonCopiesPending) {
		content = Spinner();
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

	function test() {
		branchSelect();
	}
	function changeView() {
		Switch();
	}
	function showNonBookCopies() {
		return(
			<div>
				<div className = "librarianBranch">
					<Button className = "btn-left" color="warning" onClick={test}> Return </Button>
					<Button color="primary" onClick={changeView}> View Books In Library </Button> &nbsp;&nbsp;
					<Button color="info" disabled> View Books Not In Library</Button>
				</div>
					<LibrarianNonCopiesRender
						branchData = {branchData}
						selectedBranch = {selectedBranch}
						handleRefresh = {handleRefresh}
						setNonCopies = {setNonCopies}
						requestInfoCopies = {requestInfoCopies} 
						bookNonCopies = {bookNonCopies}
					/>
			</div>
		);
	}


	function showBookCopies() {
		return(
			<div>
				<div className = "librarianBranch">
					<Button className = "btn-left" color="warning" onClick={test}> Return </Button>
					<Button color="info" disabled> View Books In Library </Button> &nbsp;&nbsp;
					<Button color="primary" onClick={changeView}> View Books Not In Library</Button>
				</div>
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
			} else{
				return showBookCopies();
			}
		} else if(requestInfo && requestInfo.readSuccessful && branchData) {
			return branchTable;
		}
		return <h1> ERROR </h1>
	}

	return (
		<div className = "mainblock">
			{content}
			{showTable()}
		</div>
	);
};

LibrarianBranchRender.propTypes = {
	branchSelect: PropTypes.func,
	Switch: PropTypes.func,
	branchData: PropTypes.object,
	bookCopies: PropTypes.array,
	bookNonCopies: PropTypes.array,
	selectedBranch: PropTypes.number,
	selectBranch: PropTypes.func,
	handleRefresh: PropTypes.func,
	handleUpdate: PropTypes.func,
	setCopies: PropTypes.func,
	setNonCopies: PropTypes.func,
	requestInfo: PropTypes.object,
	requestInfoCopies: PropTypes.object,
	startReadCopies: PropTypes.func,
	startReadNonCopies: PropTypes.func,
};

export default LibrarianBranchRender;