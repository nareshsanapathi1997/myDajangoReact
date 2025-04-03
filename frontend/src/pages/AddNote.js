import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../redux/notesSlice";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import Header from "../layouts/Header";

const AddNote = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;
        dispatch(addNote({ title, content }));
        navigate("/dashboard");
    };

    return (
        <>
            <Header />
            <Container style={{ paddingTop: "80px", maxWidth: "600px" }}>
                <Card className="shadow-sm border-0">
                    <Card.Body>
                        <h2 className="text-primary text-center mb-4">Add Note</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="title" className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="content" className="mb-3">
                                <Form.Label>Content</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    placeholder="Enter content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <div className="d-grid">
                                <Button variant="primary" type="submit">
                                    Add Note
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default AddNote;
