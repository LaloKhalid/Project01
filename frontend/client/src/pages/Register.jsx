import { useForm } from "react-hook-form";

function Register() {
    const { register, handleSubmit } = useForm();

    const fetchRegister = async (data) => {
        console.log("Form data:", data);
    };

    return (
        <div>
            <h1>Register Here!</h1>

            <form onSubmit={handleSubmit(fetchRegister)}>
                <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                />

                <input
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                />

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
