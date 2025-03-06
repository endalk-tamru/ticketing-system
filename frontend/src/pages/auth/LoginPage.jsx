import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Card, Container, Spinner, Alert } from "react-bootstrap";

import { useLoginMutation } from "../../redux/apiSlices/usersApiSlice";
import { setCredentials } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ username: "", password: "" });

  const [loginUser, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Login Successful");
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center mt-4">
      <Card style={{ width: "30rem" }} className="p-4 shadow">
        <Card.Title className="text-center">Login</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Alert variant={"info"}>
            <p>To Login As Admin Use The Following Credentials:</p>
            <p>
              Username: <strong>admin</strong>
            </p>
            <p>
              Password: <strong>12345678</strong>
            </p>
          </Alert>

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Button
            type="submit"
            variant="dark"
            className="w-100"
            disabled={isLoading}
          >
            {isLoading && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            Login
          </Button>
        </Form>

        <div className="text-center mt-3">
          <small>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </small>
        </div>
      </Card>
    </Container>
  );
}
