import { useNavigate } from "react-router-dom"
import { UserData } from "../context/UserContext";

function Navbar() {

    const navigate = useNavigate();

    const { isAuth, logout } = UserData();

    const logoutUser = () => {
        logout();
    }

    return (
        <>
            <div className="w-full flex justify-between items-center font-semibold">
                <div className="flex items-center gap-2">
                    <img src="/left_arrow.png" className="w-8 bg-[#D99201] p-2 rounded-2xl cursor-pointer"
                        onClick={() => navigate(-1)} alt="" />
                    <img src="/right_arrow.png" className="w-8 bg-[#D99201] p-2 rounded-2xl cursor-pointer"
                        onClick={() => navigate(+1)} alt="" />
                </div>

                <div className="flex items-center gap-4">
                    <p className="px-4 py-1 cursor-pointer bg-[#D99201] text-white text-[15px] 
                hidden rounded-full md:block">Explore Premium</p>
                    <p className="px-4 py-1 cursor-pointer bg-[#D99201] text-white text-[15px] 
                hidden rounded-full md:block">Install App</p>
                    {isAuth ? (<p onClick={logoutUser} className="px-4 py-1 cursor-pointer bg-[#D99201] text-white text-[15px] 
                rounded-full">Log Out</p>) : (<p onClick={() => navigate("/login")} className="px-4 py-1 cursor-pointer bg-[#D99201] text-white text-[15px] 
                rounded-full">Log In</p>)}
                </div>

            </div>

            <div className="flex items-center gap-2 mt-4">
                <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer">
                    All
                </p>
                <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer hidden md:block">
                    Music
                </p>
                <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer md:hidden" onClick={() => navigate("/playlist")}>
                    Playlist
                </p>
            </div>
        </>
    )
}

export default Navbar
