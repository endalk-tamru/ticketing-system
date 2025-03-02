import React, { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import statusTags from "../../../constants/statusTags";
import { useCreateTicketMutation } from "../../../redux/apiSlices/ticketsApiSlice";
import toast from "react-hot-toast";

export default function TicketForm({ showModal, setShowModal }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: statusTags.OPEN.label,
  });

  const [updateTicket, { isLoading }] = useCreateTicketMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateTicket(formData).unwrap();
      toast.success("Created Successfully");
      setShowModal(false);
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            type="text"
            value={formData?.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            as="textarea"
            placeholder="Description"
            value={formData?.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Control
            disabled
            name="status"
            type="text"
            placeholder="Description"
            value={formData?.status}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
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
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
