import React, { useState } from 'react';
//import LibrarianBranchRender from '../LibrarianBranchRender';
import axios from 'axios';
import { ADMIN_PORT } from '../../../constants/connections';

import {
	Button,
	Modal,
	ModalHeader,
	ModalBody
} from 'reactstrap';
import PropTypes from 'prop-types';

const UpdateBookCopiesModal = (props) => {
	const {
		buttonLabel,
        branchId,
        branchName,
    } = props;

	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);
    
    function readBranchBooks() {
        return axios.get(ADMIN_PORT + '/librarian/readBranchCopies', {
            params: {branchId: branchId}
        }).then(response => response.data)
    }
    /*
    readBranchBooks().then(data => {
        let books = data;
        console.log("modal data for branchId " + branchId + ":");
        console.log(books)
    }).then((res) => {
        console.log("res");
        console.log(res);
    });
    */

    //console.log(books);

    axios.get(ADMIN_PORT + '/librarian/readBranchCopies', {
        params: {branchId: branchId}
    })
    .then(function(response){ return response.data; })
    .then(function(data) {
    const items = data;
    console.log("items");
    console.log(items)
    })
    //console.log(items);

    return (
        <div>
            <Button color="primary" onClick={toggle}>
                {buttonLabel}
            </Button>
            <Modal isOpen={modal} toggle={toggle} size = 'xl'>
                <ModalHeader toggle={toggle}>Update Book Copies for {branchName} {branchId} </ModalHeader>
                <ModalBody>
                <div>
                wip
                </div>
                    <Button
                        color="danger"
                        className="twobuttons"
                        onClick={toggle}>
                        Exit
                    </Button>
                </ModalBody>
            </Modal>
        </div>
    );
};

UpdateBookCopiesModal.propTypes = {
	buttonLabel: PropTypes.string,
    handleRefresh: PropTypes.func,
    handleCopies: PropTypes.func,
    branchName: PropTypes.string,
    branchId: PropTypes.number,
    books: PropTypes.array,
};

export default UpdateBookCopiesModal;
