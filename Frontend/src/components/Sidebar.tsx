import { useNavigate } from "react-router-dom"
import PlaylistCard from "./PlaylistCard";


function Sidebar() {

    const navigate = useNavigate();

    return (
        <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
            <div className="bg-[#1A3F22] h-[15%] rounded flex flex-col justify-around">
                <div className="flex items-center gap-3 pl-8 cursor-pointer" onClick={() => navigate("/")}>
                    <img src="/home.png" alt="" className="w-6" />
                    <p className="font-bold">Home</p>
                </div>

                <div className="flex items-center gap-3 pl-8 cursor-pointer" onClick={() => navigate("/")}>
                    <img src="/search.png" alt="" className="w-6" />
                    <p className="font-bold">Search</p>
                </div>

            </div>

            <div className="bg-[#1A3F22] h-[85%] rounded">
                <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/stack.png" className="w-8" alt="" />
                        <p className="font-semibold">Your Library</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <img src="/arrow.png" className="w-6" alt="" />
                        <img src="/plus.png" className="w-6" alt="" />
                    </div>
                </div>

                <div onClick={() => navigate("/playlist")}>
                    <PlaylistCard />
                </div>

                <div className="p-4 m-2 bg-[#905A01] rounded font-semibold flex flex-col items-start gap-1 pl-4 mt-4">
                    <h1>Lets find some podcasts to follow</h1>
                    <p className="font-light">We'll keep up updated</p>
                    <button className="px-4 py-1.5 bg-[#D99201] text-white text-[15px] rounded-full mt-4">Browse Podcast</button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
