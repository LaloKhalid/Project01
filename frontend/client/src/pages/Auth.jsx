import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [loginError, setLoginError] = useState("");
    const [registerError, setRegisterError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const handleLogin = async (data) => {
        setLoginError("");
        setSuccessMessage("");
        setLoading(true);

        try {
            const response = await api.post("/api/auth/login", {
                email: data.email,
                password: data.password,
            });

            console.log("LOGIN SUCCESS:", response.data);

            localStorage.setItem("token", response.data.token);

            navigate("/");
        } catch (error) {
            console.error(
                "LOGIN FAILED:",
                error.response?.data || error.message
            );

            setLoginError(
                error.response?.data?.message ||
                    "Login failed. Please check your email and password."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (data) => {
        setRegisterError("");
        setSuccessMessage("");
        setLoading(true);

        try {
            console.log("REGISTER FORM DATA:", data);

            await api.post("/api/auth/register", {
                email: data.email,
                password: data.password,
            });

            setSuccessMessage(
                "Registration successful! You can now log in."
            );

            reset();

            setTimeout(() => {
                setIsLogin(true);
                setSuccessMessage("");
            }, 1500);
        } catch (error) {
            console.error(
                "REGISTER FAILED:",
                error.response?.data || error.message
            );

            setRegisterError(
                error.response?.data?.message ||
                    "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const switchToRegister = () => {
        setIsLogin(false);
        setLoginError("");
        setSuccessMessage("");
        reset();
    };

    const switchToLogin = () => {
        setIsLogin(true);
        setRegisterError("");
        setSuccessMessage("");
        reset();
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                {isLogin ? (
                    <>
                        <h1>Welcome Back!</h1>
                        <p>Login to your account</p>

                        {loginError && (
                            <div className="auth-error">
                                {loginError}
                            </div>
                        )}

                        <form onSubmit={handleSubmit(handleLogin)}>
                            <div className="form-group">
                                <label htmlFor="login-email">
                                    Email
                                </label>

                                <input
                                    id="login-email"
                                    type="email"
                                    placeholder="Enter your email"
                                    {...register("email", {
                                        required: "Email is required",
                                    })}
                                />

                                {errors.email && (
                                    <span className="field-error">
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="login-password">
                                    Password
                                </label>

                                <input
                                    id="login-password"
                                    type="password"
                                    placeholder="Enter your password"
                                    {...register("password", {
                                        required: "Password is required",
                                    })}
                                />

                                {errors.password && (
                                    <span className="field-error">
                                        {errors.password.message}
                                    </span>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </form>

                        <div className="auth-switch">
                            <p>Don't have an account?</p>

                            <button
                                type="button"
                                onClick={switchToRegister}
                            >
                                Let's create one!
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h1>Register Here!</h1>
                        <p>Create your account</p>

                        {registerError && (
                            <div className="auth-error">
                                {registerError}
                            </div>
                        )}

                        {successMessage && (
                            <div className="auth-success">
                                {successMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit(handleRegister)}>
                            <div className="form-group">
                                <label htmlFor="register-email">
                                    Email
                                </label>

                                <input
                                    id="register-email"
                                    type="email"
                                    placeholder="Enter your email"
                                    {...register("email", {
                                        required: "Email is required",
                                    })}
                                />

                                {errors.email && (
                                    <span className="field-error">
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="register-password">
                                    Password
                                </label>

                                <input
                                    id="register-password"
                                    type="password"
                                    placeholder="Create a password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message:
                                                "Password must be at least 6 characters",
                                        },
                                    })}
                                />

                                {errors.password && (
                                    <span className="field-error">
                                        {errors.password.message}
                                    </span>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                            >
                                {loading
                                    ? "Creating account..."
                                    : "Register"}
                            </button>
                        </form>

                        <div className="auth-switch">
                            <p>Already have an account?</p>

                            <button
                                type="button"
                                onClick={switchToLogin}
                            >
                                Login
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Auth;