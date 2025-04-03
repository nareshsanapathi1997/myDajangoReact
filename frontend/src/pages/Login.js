import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice"; // Import login action
import "react-toastify/dist/ReactToastify.css";
import Header from "../layouts/Header";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const result = await dispatch(loginUser(data));

        if (result.meta.requestStatus === "fulfilled") {
            toast.success("Login Successful!");
            navigate("/dashboard"); // Redirect to dashboard after login
        } else {
            toast.error(result.payload || "Login failed");
        }
    };

    return (
        <>
            <main>
                <Header />
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
                <div className="bg-light min-vh-100 d-flex justify-content-center align-items-center">
                    <div className="card shadow-lg border-0 rounded" style={{ width: "100%", maxWidth: "400px" }}>
                        <div className="card-header bg-primary text-white text-center py-3">
                            <h4>Login</h4>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email address
                                    </label>
                                    <input
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                message: "Invalid email address",
                                            },
                                        })}
                                        type="email"
                                        id="email"
                                        placeholder="Enter your email"
                                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                    />
                                    {errors.email && <p className="invalid-feedback">{errors.email?.message}</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        {...register("password", { required: "Password is required" })}
                                        type="password"
                                        id="password"
                                        placeholder="Enter your password"
                                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                    />
                                    {errors.password && <p className="invalid-feedback">{errors.password?.message}</p>}
                                </div>

                                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                    {loading ? "Logging in..." : "Submit"}
                                </button>
                            </form>
                            {error && <p className="text-danger text-center mt-2">{error}</p>}
                            <div className="text-center mt-3">
                                <p>
                                    Don't have an account? <Link to="/register">Register</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Login;
