import { useState } from "react";
import { useSelector } from "react-redux";
import { Card, Container, Table, Button, Stack, Badge } from "react-bootstrap";

import {
  useDeleteTicketMutation,
  useGetTicketsQuery,
} from "../../redux/apiSlices/ticketsApiSlice";
import TicketForm from "./fragments/TicketForm";
import DeleteModal from "../../components/DeleteModal";
import UpdateTicketForm from "./fragments/UpdateTicketForm";
import StatusBadge from "../../components/StatusBadge";

export default function TicketsList() {
  const { userInfo } = useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState({
    isOpen: false,
    data: null,
  });
  const [showDeleteModal, setShowDeleteModal] = useState({
    isOpen: false,
    data: null,
  });

  const { data: ticketsData, isLoading } = useGetTicketsQuery();

  if (isLoading) return <h3 className="display-3 my-5">Loading...</h3>;

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow">
        <Card.Title>
          <Stack direction="horizontal" gap={3}>
            Tickets List
            <Button
              variant="dark"
              onClick={() => setShowModal(true)}
              className="ms-auto"
            >
              Create New Ticket
            </Button>
          </Stack>
        </Card.Title>

        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>No.</th>
              <th>Ticket</th>
              <th>Description</th>
              <th>Issued By</th>
              <th>Created At</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ticketsData?.map((ticket, index) => (
              <tr key={ticket._id}>
                <td>{index + 1}</td>
                <td>{ticket.title}</td>
                <td>{ticket.description}</td>
                <td>{ticket.user?.username}</td>
                <td>
                  <StatusBadge status={ticket.status} />
                </td>
                <td>{new Date(ticket.createdAt)?.toLocaleString()}</td>
                <td>
                  {(userInfo?._id === ticket?.user?._id ||
                    userInfo?.isSuperAdmin) && (
                    <>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() =>
                          setShowEditModal({ isOpen: true, data: ticket })
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
                            data: { ...ticket, label: ticket.title },
                          })
                        }
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <TicketForm showModal={showModal} setShowModal={setShowModal} />

      <UpdateTicketForm
        showModal={showEditModal}
        setShowModal={setShowEditModal}
      />

      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        api={useDeleteTicketMutation}
      />
    </Container>
  );
}
