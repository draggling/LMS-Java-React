import React, { useState } from 'react';

import {
	Button,
	Modal,
	ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Input,
    Label,
    Alert,
} from 'reactstrap';
import PropTypes from 'prop-types';

const UpdateBookCopiesModal = (props) => {
	const {
        buttonLabel,
        bookId,
        branchId,
        branchName,
        noOfCopies,
        setCopies,
    } = props;

    let newCopies = noOfCopies;
    if(!alert) {
        var alert = '';
    }
	const [modal, setModal] = useState(false);
    const toggle = () => 
    {
        setModal(!modal);
    }
    
	function handleCopies(e) {
        newCopies = e.target.value;
    }

    function validateInput(newCopies) {
        if(newCopies >= 0) {
            setCopies(bookId, branchId, newCopies);
            toggle();
        } else {
            alert = (
                <div>
                    <Alert color="warning">
                    ERROR: Negative Number!
                    </Alert>
                </div>
            );
        }
    } 
    
    return (
        <div>
            <Button color="primary" onClick={toggle}>
                {buttonLabel}
            </Button>
            <Modal isOpen={modal} toggle={toggle} size = 'xl'>
                <ModalHeader toggle={toggle}>Update Book Copies for {branchName} </ModalHeader>
                <ModalBody>
                {alert}
                <Form>
                    <FormGroup>
                        <Label for="numberOfCopies">Number of Copies</Label>
                        <Input 
                            className="formNumberOfCopies"
                            defaultValue={noOfCopies}
                            min={0}
                            input="integer"
                            onChange={handleCopies}
                        />  
                </FormGroup>
                </Form>
                <Button
						color="primary"
						className="twobuttons"
						onClick={() => {
                            validateInput(newCopies);
						}}
				>
					Update
				</Button>
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
    validateInput: PropTypes.func,
    setCopies: PropTypes.func,
    bookId : PropTypes.number,
    branchName: PropTypes.string,
    branchId: PropTypes.number,
    noOfCopies: PropTypes.number,
};

export default UpdateBookCopiesModal;
