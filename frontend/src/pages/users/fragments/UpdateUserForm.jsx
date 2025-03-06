import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { useUpdateUserMutation } from "../../../redux/apiSlices/usersApiSlice";
import { setCredentials } from "../../../redux/slices/authSlice";

export default function UpdateUserForm({ showModal, setShowModal }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    isSuperAdmin: false,
  });

  const [updateUser, { isLoading }] = useUpdateUserMutation();

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
      const res = await updateUser(formData).unwrap();

      // loggedIn user updates his own data then change the global states too
      userInfo._id === formData._id &&
        dispatch(setCredentials({ ...res, token: userInfo.token }));
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
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              disabled={userInfo._id !== formData._id}
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select
              disabled={!userInfo.isSuperAdmin}
              name="isSuperAdmin"
              value={formData.isSuperAdmin}
              onChange={handleChange}
            >
              <option value={false}>User</option>
              <option value={true}>Admin</option>
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
