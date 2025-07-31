import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
const Login = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    const { loginUser, btnLoading } = UserData();

    async function submitHandler(e: any) {
        e.preventDefault();

        loginUser(email, password, navigate);
    }


    return (
        <div className="flex items-center  justify-center h-screen max-h-screen">
            <div className=" bg-[#1A3F22] text-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-semibold text-center mb-8">
                    Login
                </h2>
                <form className="mt-8" onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input type="email" placeholder="Enter Email" className="auth" required value={email}
                            onChange={e => setemail(e.target.value)} autoComplete="off"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input type="password" placeholder="Enter Password" className="auth" required value={password}
                            onChange={e => setpassword(e.target.value)} autoComplete="off"
                        />
                    </div>
                    <button disabled={btnLoading} className="auth-button">{btnLoading ? "Please wait..." : "Login"}</button>
                </form>

                <div className="text-center mt-6">
                    <Link to={'/register'} className="text-sm text-grey-400 hover:text-gray-300">Create an Account</Link>
                </div>
            </div>



        </div>
    )
}

export default Login
