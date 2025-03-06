import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";

import { useUpdateTicketMutation } from "../../../redux/apiSlices/ticketsApiSlice";
import statusTags from "../../../constants/statusTags";

export default function UpdateTicketForm({ showModal, setShowModal }) {
  const { userInfo } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: statusTags.OPEN.label,
  });

  const [updateTicket, { isLoading }] = useUpdateTicketMutation();

  useEffect(() => {
    if (showModal.data) {
      setFormData(showModal.data);
    }
  }, [showModal.data]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateTicket(formData).unwrap();
      toast.success("Update Successful");
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
        <Modal.Title>Edit Ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              disabled={userInfo._id !== formData?.user?._id}
              name="title"
              type="text"
              value={formData?.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              disabled={userInfo._id !== formData?.user?._id}
              name="description"
              as="textarea"
              placeholder="Description"
              value={formData?.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              disabled={!userInfo.isSuperAdmin}
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option
                value={statusTags.OPEN.label}
                disabled={statusTags.OPEN.label === formData.status}
              >
                {statusTags.OPEN.label}
              </option>
              <option
                value={statusTags.IN_PROGRESS.label}
                disabled={statusTags.IN_PROGRESS.label === formData.status}
              >
                {statusTags.IN_PROGRESS.label}
              </option>
              <option
                value={statusTags.CLOSED.label}
                disabled={statusTags.CLOSED.label === formData.status}
              >
                {statusTags.CLOSED.label}
              </option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShowModal({ isOpen: false, data: null })}
        >
          Cancel
        </Button>
        <Button variant="dark" disabled={isLoading} onClick={handleSubmit}>
          {isLoading && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
