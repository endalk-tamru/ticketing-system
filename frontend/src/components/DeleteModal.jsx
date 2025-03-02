import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";

export default function DeleteModal({ showModal, setShowModal, api }) {
  const [deleteData, { isLoading }] = api();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await deleteData(showModal?.data?._id).unwrap();
      toast.success("Delete Successful");
      setShowModal({ isOpen: false, data: null });
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <Modal
      show={showModal.isOpen}
      onHide={() => setShowModal({ isOpen: false, data: null })}
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete{" "}
        <strong>{showModal?.data?.label}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShowModal({ isOpen: false, data: null })}
        >
          Cancel
        </Button>
        <Button variant="danger" disabled={isLoading} onClick={handleSubmit}>
          {isLoading && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
