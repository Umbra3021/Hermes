import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

const server = "http://localhost:7000";

export interface Song {
    id: string,
    title: string,
    description: string,
    thumbnail: string,
    audio: string,
    album: string,

}

export interface Album {
    id: string,
    title: string,
    description: string,
    thumbnail: string,

}


interface songType {
    songs: Song[],
    playing: boolean,
    setPlaying: (value: boolean) => void;
    loading: boolean,
    selectedSong: string | null,
    setSelectedSong: (id: string) => void;
    Albums: Album[],
    getSingleSong: () => Promise<void>;
    nextSong: () => void;
    prevSong: () => void;
    singleSong: Song | null;

}

const songService = createContext<songType | undefined>(undefined);

interface songServiceProvider {
    children: ReactNode
}

export const SongProvider: React.FC<songServiceProvider> = ({ children }) => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedSong, setSelectedSong] = useState<string | null>(null);
    const [playing, setPlaying] = useState<boolean>(false);
    const [Albums, setAlbums] = useState<Album[]>([]);
    const [singleSong, setSingleSong] = useState<Song | null>(null)
    const [Index, setIndex] = useState<number>(0);

    const getSongs = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await axios.get<Song[]>(`${server}/api/v1/songs/all`);

            setSongs(data);

            if (data.length > 0) {
                setSelectedSong(data[0].id.toString());
                setPlaying(false);
            }

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        }
    }, [])

    const getSingleSong = useCallback(async () => {
        try {

            if (!selectedSong) return;

            const { data } = await axios.get<Song>(`${server}/api/v1/songs/${selectedSong}`);

            setSingleSong(data);

        } catch (error) {
            console.log(error);

        }
    }, [selectedSong])

    const getAlbums = useCallback(async () => {
        setLoading(true);
        try {

            const { data } = await axios.get<Album[]>(`${server}/api/v1/albums/all`);
            setAlbums(data);


        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        }

    }, [])

    const nextSong = useCallback(async () => {
        if (Index === songs.length - 1) {
            setIndex(0);
            setSelectedSong(songs[0].id.toString());
        }
        else {
            setIndex((prevIndex) => prevIndex + 1);
            setSelectedSong(songs[Index + 1]?.id.toString());
        }


    }, [Index, songs]);


    const prevSong = useCallback(async () => {
        if (Index > 0) {
            setIndex((prev) => prev - 1);
            setSelectedSong(songs[Index - 1]?.id.toString());
        }
    }, [Index, songs]);

    useEffect(() => {
        getSongs()
        getAlbums()
    }, [])

    return (<songService.Provider value={{ songs, selectedSong, setSelectedSong, playing, setPlaying, loading, Albums, getSingleSong, singleSong, nextSong, prevSong }}>{children}</songService.Provider>);
};

export const songData = (): songType => {
    const context = useContext(songService)

    if (!context) {
        throw new Error("songData not used in SongService");
    }
    return context;
}