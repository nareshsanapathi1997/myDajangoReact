import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/userSlice";
import { Container, Table, Spinner, Alert, Card } from "react-bootstrap";
import Header from "../layouts/Header";

const UserList = () => {
    const dispatch = useDispatch();
    const { users, status, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <>
            <Header />
            <Container style={{ paddingTop: "80px", maxWidth: "800px" }}>
                <Card className="shadow-sm border-0">
                    <Card.Body>
                        <h2 className="text-primary text-center mb-4">All Users</h2>

                        {status === "loading" && (
                            <div className="text-center">
                                <Spinner animation="border" variant="primary" />
                            </div>
                        )}

                        {status === "failed" && <Alert variant="danger">{error}</Alert>}

                        {status === "succeeded" && (
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default UserList;
