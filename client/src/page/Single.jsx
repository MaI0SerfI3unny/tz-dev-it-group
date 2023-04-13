import { useState,useEffect } from "react";
import Header from "../components/Header/Header"
import { useParams,NavLink,useNavigate } from "react-router-dom";
import { getPostById,deletePost } from "../axios/axios";

const Single = ({userData}) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(undefined)

    const deletePostById = async() => {
        await deletePost(userData.token, id)
        navigate('/')
    }

    useEffect(() => {
        async function getData(){
            const {data} = await getPostById(userData.token, id)
            setPost(data.data)
        }
        getData()
    },[])
    return(
        <div>
            <Header/>
            <main>
                {post && (
                    <div className="single_container">
                        <NavLink to="/">Back</NavLink>
                        <div className="single_control_panel">
                            <button onClick={deletePostById}>Delete</button>
                            <button><NavLink to={`/post/update/${post.guid}`}>Update</NavLink></button>
                        </div>
                        <h1>{post.title}</h1>
                        <p>{new Date(post.isoDate).toLocaleString()}</p>
                        <p>Description: {post.contentSnippet}</p>
                        <p>Creator: {post.creator}</p>
                        <p>Link: <a href={post.link}>{post.link}</a></p>

                        <div className="categories_container">
                            <p>Categories:</p>
                            <div className="row">
                                {post.categories.map((el,key) => <div key={key} className="column">{el}</div>)}
                            </div>
                        </div>
                        
                        <div className="html_content_container"> 
                            <p className="html_content_title">Preview Content</p>
                            <div dangerouslySetInnerHTML={{__html: post.content}}/>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

export default Single