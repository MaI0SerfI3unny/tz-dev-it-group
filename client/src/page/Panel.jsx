import Header from "../components/Header/Header"
import { useEffect,useState } from "react"
import { getPost,searchPost } from "../axios/axios"
import ListPosts from "../components/ListPosts/ListPosts";
import SearchContainer from "../components/SearchContainer/SearchContainer";
import PanelMain from "../components/PanelMain/PanelMain";

const Panel = ({userData}) => {
    const [search, setSearch] = useState("")
    const [countPost, setCountSearch] = useState("")
    const [sort, setSort] = useState('asc');
    const [sortBy, setSortBy] = useState('guid');
    const [listPostSearch, setListPostSearch] = useState([])
    const [listPost, setListPost] = useState([])
    const [page,setPage] = useState(0)
    const perPage = 5

    useEffect(() => {
        async function getData(){
            const {data} = await getPost(userData.token, page, perPage, sort, sortBy)
            setListPost(data.data)
            setCountSearch(data.count)
        }
        getData()
    },[page,sort, sortBy])

    useEffect(() => {
        async function getData(){
            setListPostSearch([])
            if(search.length !== 0){
                const { data } = await searchPost(userData.token, search)
                console.log(data.data)
                setListPostSearch(data.data)
            }
        }
        getData()
   },[search]) 
    return(
        <div>
            <Header/>
            <main>
                <SearchContainer
                    search={search}
                    setSearch={setSearch}
                    listPostSearch={listPostSearch}/>
                <PanelMain 
                    sort={sort} 
                    setSort={setSort}
                    sortBy={sortBy} 
                    setSortBy={setSortBy}/>
                <ListPosts
                    listPost={listPost}
                    count={countPost}
                    page={page}
                    perPage={perPage}
                    setPage={setPage}/>
            </main>
        </div>
    )
}

export default Panel