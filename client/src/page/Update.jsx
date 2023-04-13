import { useState,useEffect } from 'react';
import Header from '../components/Header/Header';
import { formInput } from '../forms/create';
import { useParams,NavLink,useNavigate } from "react-router-dom";
import { getPostById, updatePost } from '../axios/axios';
import { changeProp } from '../services/updateFormValue';

const Update = ({userData}) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({
        title: "",
        contentSnippet: "",
        link: "",
        creator: "",
        content: "",
        categories: []
    })
    useEffect(() => {
        async function getData(){
            const {data} = await getPostById(userData.token, id)
            setPost(data.data)
        }
        getData()
    },[])

    const updatePostOne = async() => {
        const {data} = await updatePost(userData.token,id, post)
        if(data.status === 200) navigate('/')
    }
    return(
        <div>
        <Header/>
            <main>
            {post && (
                <div className='create_container'>
                    <NavLink to="/">Back</NavLink>
                    {formInput.map((el,key) => 
                        <div className='form_create_container' key={key}>
                            {el.typeInput === "input" ?
                                <input
                                value={post[el.value]}
                                onChange={(e) => changeProp(el.value, e, post, setPost)}
                                type={el.type} 
                                placeholder={el.placeholder}/> 
                            : 
                                <textarea
                                value={post[el.value]}
                                onChange={(e) => changeProp(el.value, e, post, setPost)}
                                placeholder={el.placeholder} />}
                        </div>
                    )}
                    <button onClick={updatePostOne}>Update</button>
                </div>)}
            </main>
        </div>
    )
}

export default Update