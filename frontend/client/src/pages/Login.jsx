import { useState } from "react";
import api from "../services/api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/api/auth/login", {
                email,
                password
            });

            console.log("LOGIN SUCCESS:", response.data);

            localStorage.setItem("token", response.data.token);

            console.log(
                "TOKEN SAVED:",
                localStorage.getItem("token")
            );

        } catch (error) {
            console.error(
                "LOGIN FAILED:",
                error.response?.data || error.message
            );
        }
    };

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
