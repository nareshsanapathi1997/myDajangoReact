import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes } from "../redux/notesSlice";
import Header from "../layouts/Header";
import { Container, Card, Row, Col, Button, Spinner } from "react-bootstrap";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { items: status, error } = useSelector((state) => state.notes);
  const notes = [
    { id: 1, title: "First Note", content: "This is the first note." },
    { id: 2, title: "Second Note", content: "This is another note." },
  ];

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchNotes());
    }
  }, [dispatch, status]);

  return (
    <>
      <Header />
      <Container style={{ paddingTop: "80px" }}>
        <h1 className="my-4 text-primary text-center">Dashboard</h1>

        {status === "loading" && <Spinner animation="border" role="status" />}
        {status === "failed" && <p className="text-danger">Error: {error}</p>}

        <Row className="g-4">
          {notes.map((note) => (
            <Col md={4} key={note.id}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Body>
                  <Card.Title>{note.title}</Card.Title>
                  <Card.Text>{note.content}</Card.Text>
                  <Button variant="primary">View Note</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
