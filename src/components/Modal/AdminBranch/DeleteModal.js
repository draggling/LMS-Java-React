import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import PropTypes from 'prop-types';

const DeleteModal = (props) => {
  const {
    buttonLabel,
    handleDelete,
    handleRefresh,
    id,
  } = props;

  const [modal, setModal] = useState(false);

  function deleteBranch(id) {
      handleDelete(id)
      handleRefresh()
  }

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Are you sure you want to delete the branch?</ModalHeader>
        <ModalBody>
            <Button color="primary" className="twobuttons" onClick={() => {deleteBranch(id)} }>Yes</Button>
            <Button color="danger" className="twobuttons" onClick={() => handleRefresh()}>No</Button>
        </ModalBody>
      </Modal>
    </div>
  );
}

DeleteModal.propTypes = {
    buttonLabel: PropTypes.string,
    handleDelete: PropTypes.func,
    handleRefresh: PropTypes.func,
    id: PropTypes.number
};

export default DeleteModal;
