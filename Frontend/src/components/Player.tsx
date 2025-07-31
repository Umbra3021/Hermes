import React, { useEffect, useRef, useState } from "react";
import { songData } from "../context/SongContext"
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { FaPause, FaPlay } from "react-icons/fa";

function Player() {

    const { singleSong, getSingleSong, selectedSong, playing, setPlaying, nextSong, prevSong } = songData();

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [volume, setVolume] = useState<number>(1);
    const [progress, setProgress] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const loadedMetaData = () => {
            setDuration(audio.duration || 0);
        };

        const updateTime = () => {
            setProgress(audio.currentTime || 0);
        };

        audio.addEventListener("loadedmetadata", loadedMetaData);
        audio.addEventListener("timeupdate", updateTime);

        return () => {
            audio.removeEventListener("loadedmetadata", loadedMetaData);
            audio.removeEventListener("timeupdate", updateTime);

        }
    }, [singleSong]);


    const playOrPause = () => {
        if (audioRef.current) {
            if (playing) {
                audioRef.current.pause();
            }
            else {
                audioRef.current.play();
            }

            setPlaying(!playing);
        }
    };

    const controlVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value); // value from 0 to 100
        const normalizedVolume = value / 100;     // scale to 0.0 to 1.0
        setVolume(value);
        if (audioRef.current) {
            audioRef.current.volume = normalizedVolume;
        }
    };

    const changeDuration = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (!duration) return;
        const time = (parseFloat(e.target.value) / 100) * duration;

        if (audioRef.current) {
            audioRef.current.currentTime = time;
        }
        setProgress(time);

    }

    useEffect(() => {
        getSingleSong();
    }, [selectedSong])

    return (
        <div>
            {
                singleSong && (<div className="h-[10%] flex justify-between items-center text-white px-4">
                    <div className="lg:flex items-center gap-4">
                        <img
                            src={singleSong?.thumbnail}
                            className="w-12"
                            alt="Thumbnail"
                        />
                        <div className="hidden md:block">
                            <p>{singleSong.title}</p>
                            <p>{singleSong.description?.slice(0, 30)}...</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-1 m-auto">
                        {singleSong?.audio && (
                            <audio ref={audioRef} src={singleSong.audio} autoPlay={playing} />
                        )}

                        <div className="w-full items-center flex font-thin text-green-400">
                            <input type="range" min={"0"} max={"100"} className="w-[120px] rounded-full appearance-none bg-white progress-bar md:w-[300px]"
                                value={duration ? (progress / duration) * 100 : 0}
                                onChange={changeDuration}
                                style={{
                                    background: `linear-gradient(to right, #D99201 ${(progress / duration) * 100}%, #ccc 0%)`,
                                }}
                            />
                        </div>
                        <div className="flex justify-center items-center gap-4">
                            <span className="cursor-pointer" onClick={prevSong}><GrChapterPrevious /></span>
                            <button className="bg-white text-black rounded-full p-2" onClick={playOrPause}>
                                {playing ? <FaPause /> : <FaPlay />}
                            </button>

                            <span className="cursor-pointer" onClick={nextSong}>
                                <GrChapterNext />
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input type="range" className="w-16 rounded-full appearance-none bg-white progress-bar  md:w-32"
                            min={"0"}
                            max={"100"}
                            step={"0.01"}
                            value={volume}
                            onChange={controlVolume}
                            style={{
                                background: `linear-gradient(to right, #D99201 ${volume}%, #ccc 0%)`,
                            }}

                        />
                    </div>
                </div>
                )}
        </div>
    );
};

export default Player
