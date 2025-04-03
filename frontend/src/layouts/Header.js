import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { toast } from "react-toastify";

const Header = () => {
    const navigate = useNavigate();
    const authToken = localStorage.getItem("access_token");
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        toast.success("Logged out successfully!");
        navigate("/login");
    };

    return (
        <header>
            <Navbar
                collapseOnSelect
                expand="lg"
                className="bg-primary navbar-dark shadow-sm"
                fixed="top"
            >
                <Container>
                    <Navbar.Brand as={Link} to="/" className="text-white">
                        My Application
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {authToken && user && (
                                <>
                                    <Nav.Link as={Link} to="/dashboard" className="text-white">
                                        Dashboard
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/users" className="text-white">
                                        All Users
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/addnote" className="text-white">
                                        Add Note
                                    </Nav.Link>
                                </>
                            )}
                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to="/register" className="text-white">
                                Register
                            </Nav.Link>
                            {authToken && user ? (
                                <Nav.Link onClick={handleLogout} className="text-white" style={{ cursor: "pointer" }}>
                                    Logout
                                </Nav.Link>
                            ) : (

                                <Nav.Link as={Link} to="/login" className="text-white">
                                    Login
                                </Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* Offset for fixed navbar */}
            <div style={{ paddingTop: "56px" }}></div>
        </header>
    );
};

export default Header;
