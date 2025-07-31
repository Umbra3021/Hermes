import AlbumCard from "../components/AlbumCard";
import Layout from "../components/Layout"
import Loading from "../components/Loading";
import SongCard from "../components/SongCard";
import { songData } from "../context/SongContext";

const Home = () => {
    const { Albums, songs, loading } = songData();

    return (
        <div>
            {loading ? (<Loading />) : (
                <Layout>
                    <div className="mb-4">
                        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
                        <div className="flex overflow-auto">
                            {
                                Albums?.map((element, index) => {
                                    return <AlbumCard key={index} image={element.thumbnail} name={element.title}
                                        description={element.description} id={element.id} />
                                })
                            }
                        </div>
                    </div>



                    <div className="mb-4">
                        <h1 className="my-5 font-bold text-2xl">Songs</h1>
                        <div className="flex overflow-auto">
                            {
                                songs?.map((element, index) => {
                                    return <SongCard key={index} image={element.thumbnail} name={element.title}
                                        description={element.description} id={element.id} />
                                })
                            }
                        </div>
                    </div>
                </Layout>
            )};
        </div>

    )
}

export default Home
