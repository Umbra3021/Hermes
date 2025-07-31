import { FaMusic } from "react-icons/fa"

/////Youtube video @6:26:00

function PlaylistCard() {
    return (
        <div className="flex items-center p-4 rounded-lg shadow-md cursor-pointer hover:bg-emerald-600">
            <div className="w-10 h-10 bg-[#D99201] flex items-center justify-center rounded-md">
                <FaMusic className="text-white text-xl" />
            </div>
            <div className="ml-4">
                <h2>My Playlist</h2>
                <p className="text-green-200 text-sm">Playlist • <span>{"User"}</span></p>
            </div>
        </div>
    )
}

export default PlaylistCard
