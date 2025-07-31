import React from 'react'
import { FaBookmark, FaPlay } from 'react-icons/fa'

interface SongCardProps {
    image: string,
    name: string,
    description: string,
    id: string
}

const SongCard: React.FC<SongCardProps> = ({ image, name, description, id }) => {
    return (
        <div className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-emerald-600'>
            <div className='relative group'>
                <img src={image ? image : "/music.png"} className='mr-1 w-[160px] rounded' alt={name} />
                <div className='flex gap-2'>
                    <button className='absolute bottom-2 right-14 bg-amber-500 text-white p-3
                    rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        <FaPlay />
                    </button>
                    <button className='absolute bottom-2 right-2     bg-amber-500 text-white p-3
                    rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        <FaBookmark />
                    </button>
                </div>
            </div>
            <p className='font-bold mt-2 mb-1'>{name}</p>
            <p className='text-slate-200 text-sm'>{description.slice(0, 20)}...</p>
        </div>
    )
}

export default SongCard
