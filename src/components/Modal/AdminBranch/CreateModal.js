import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input} from 'reactstrap';
import PropTypes from 'prop-types';

const CreateModal = (props) => {
  const {
    buttonLabel,
    handleRefresh,
    handleCreate,
  } = props;
  let newBranchName = ""
  let newBranchAddress = ""

  function createBranch(newBranchName, newBranchAddress) {
      handleCreate(newBranchName, newBranchAddress);
      handleRefresh();
  }

  function handleNameChange(e) {
     newBranchName = e.target.value;
    // console.log("currentBranchName = " + currentBranchName);
 }
  function handleAddressChange(e) {
     newBranchAddress = e.target.value;
 }

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="primary" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create Branch</ModalHeader>
        <ModalBody>
            <Form>
            <FormGroup>
              <Label for="formBranchName">BranchName</Label>
              <Input type="text" name="branchName" id="formBranchName" placeholder="enter branchName here" onChange={handleNameChange} />
            </FormGroup>

            <FormGroup>
              <Label for="formBranchAddress">BranchAddress</Label>
              <Input type="text" name="branchAddress" id="formBranchAddress" placeholder="enter branchAddress here" onChange={handleAddressChange} />
            </FormGroup>

            </Form>
            <Button color="primary" className="twobuttons" onClick={() => {createBranch(newBranchName, newBranchAddress)} }>Create</Button>
            <Button color="danger" className="twobuttons" onClick={() => handleRefresh()}>Cancel</Button>
        </ModalBody>
      </Modal>
    </div>
  );
}

CreateModal.propTypes = {
    buttonLabel: PropTypes.string,
    handleRefresh: PropTypes.func,
    handleCreate: PropTypes.func,
};

export default CreateModal;
