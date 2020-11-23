'use strict';

import React from 'react';
import PropTypes from 'prop-types';
//import { MDBDataTable } from 'mdbreact';
import { Button } from 'reactstrap';

const ReturnLoansTable = ({ loans }) => {
	console.log(loans);
	return <Button>Loans</Button>;
};

ReturnLoansTable.propTypes = {
	loans: PropTypes.array,
};
export default ReturnLoansTable;
