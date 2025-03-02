import { useState } from "react";
import { Card, Container, Table, Button, Modal, Form } from "react-bootstrap";

import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../redux/apiSlices/usersApiSlice";
import UpdateUserForm from "./fragments/UpdateUserForm";
import DeleteModal from "../../components/DeleteModal";

export default function UsersList() {
  const [showEditModal, setShowEditModal] = useState({
    isOpen: false,
    data: null,
  });
  const [showDeleteModal, setShowDeleteModal] = useState({
    isOpen: false,
    data: null,
  });

  const { data: usersData, isLoading } = useGetUsersQuery();

  if (isLoading) return <h3 className="display-3 my-5">Loading...</h3>;

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow">
        <Card.Title>User List</Card.Title>
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersData?.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.isSuperAdmin ? "Admin" : "User"}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() =>
                      setShowEditModal({ isOpen: true, data: user })
                    }
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() =>
                      setShowDeleteModal({
                        isOpen: true,
                        data: { ...user, label: user?.username },
                      })
                    }
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <UpdateUserForm
        showModal={showEditModal}
        setShowModal={setShowEditModal}
      />

      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        api={useDeleteUserMutation}
      />
    </Container>
  );
}
