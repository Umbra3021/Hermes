import { UserData } from "../context/UserContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Register = () => {

    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    const { registerUser, btnLoading } = UserData();

    async function submitHandler(e: any) {
        e.preventDefault();

        registerUser(name, email, password, navigate);
    }


    return (
        <div className="flex items-center  justify-center h-screen max-h-screen">
            <div className=" bg-[#1A3F22] text-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-semibold text-center mb-8">
                    Register
                </h2>
                <form className="mt-8" onSubmit={submitHandler}>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input type="text" placeholder="Enter Name" className="auth" required value={name}
                            onChange={e => setname(e.target.value)} autoComplete="off"
                        />
                    </div>

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
                    <button disabled={btnLoading} className="auth-button">{btnLoading ? "Please wait..." : "Register"}</button>
                </form>

                <div className="text-center mt-6">
                    <Link to={'/login'} className="text-sm text-grey-400 hover:text-gray-300">Already have an account?</Link>
                </div>
            </div>



        </div>
    )
}

export default Register
