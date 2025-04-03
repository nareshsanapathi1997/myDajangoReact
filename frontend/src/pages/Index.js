import React from "react";
import Header from "../layouts/Header";
import { Container, Row, Col, Button, Image } from "react-bootstrap";

const Index = () => {
    return (
        <>
            <Header />
            <div style={{ paddingTop: "80px" }}>
                <Container className="text-center my-5">
                    <Row className="align-items-center">
                        <Col md={6} className="text-start">
                            <h1 className="display-4 text-primary">
                                Welcome to My Application
                            </h1>
                            <p className="lead">
                                Check my knowledge with this application. Track your progress, compete with others, and let me know if there are any mistakes!
                            </p>
                            <p className="text-muted">
                                "The beautiful thing about learning is that no one can take it away from you." – B.B. King
                            </p>
                            {/* <Button variant="primary" size="lg" href="/home" className="mt-3">
                Get Started
              </Button> */}
                        </Col>
                        <Col md={6}></Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default Index;
