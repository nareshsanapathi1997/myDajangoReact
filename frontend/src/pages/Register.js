import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/authSlice"; // Import register action
import Header from "../layouts/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth); // Get loading and error from Redux

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        if (!name.trim()) errors.name = "Name is required";
        else if (name.length < 3) errors.name = "Name must be at least 3 characters long";

        if (!email) errors.email = "Email is required";
        else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) errors.email = "Invalid email format";

        if (!password) errors.password = "Password is required";
        else if (password.length < 6) errors.password = "Password must be at least 6 characters long";

        if (!confirmPassword) errors.confirmPassword = "Please confirm your password";
        else if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const userData = { name, email, password, confirm_password: confirmPassword };

        try {
            const result = await dispatch(registerUser(userData));
            if (result.meta.requestStatus === "fulfilled") {
                toast.success("User registered successfully!");
                navigate("/login");
            } else {
                toast.error(error || "Registration failed. Please try again.");
            }
        } catch (err) {
            console.error("Registration failed:", err.message);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <>
            <Header />
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            <div className="bg-light min-vh-100 d-flex justify-content-center align-items-center mt-5">
                <div className="card shadow-lg border-0 rounded" style={{ width: "100%", maxWidth: "400px" }}>
                    <div className="card-header bg-primary text-white text-center py-3">
                        <h4>Register</h4>
                    </div>
                    <div className="card-body p-4">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                />
                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input
                                    type="email"
                                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                />
                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                <input
                                    type="password"
                                    className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm your password"
                                />
                                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                            </div>

                            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                {loading ? "Registering..." : "Register"}
                            </button>
                        </form>
                        <div className="text-center mt-3">
                            <p>Already have an account? <Link to="/login">Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
