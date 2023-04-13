import { useState } from 'react';
import Header from '../components/Header/Header';
import { formInput } from '../forms/create';
import { createPost } from '../axios/axios';
import { NavLink,useNavigate } from "react-router-dom";
import { changeProp } from '../services/updateFormValue';

const Create = ({userData}) => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([])
    const [form, setForm] = useState({
        title: "",
        contentSnippet: "",
        link: "",
        creator: "",
        content: "",
        categories: []
    })



    const addItem = async() => {
        const {
            title,
            contentSnippet,
            link,
            creator,
            content,
            categories
        } = form
        if(title && contentSnippet && 
            link && creator && content){
            const {data} = await createPost(userData.token, form)
            if(data.status === 200) navigate('/')   
        }
    }

    return(
        <div>
        <Header/>
            <main>
                <div className='create_container'>
                    <NavLink to="/">Back</NavLink>
                    <h2>Create new post</h2>
                    {formInput.map((el,key) => 
                        <div className='form_create_container' key={key}>
                            {el.typeInput === "input" ?
                                <input
                                value={form[el.value]}
                                onChange={(e) => changeProp(el.value, e, form, setForm)}
                                type={el.type} 
                                placeholder={el.placeholder}/> 
                            : 
                                <textarea
                                value={form[el.value]}
                                onChange={(e) => changeProp(el.value, e, form, setForm)}
                                placeholder={el.placeholder} />}
                        </div>
                    )}

                    <button onClick={addItem}>Create</button>
                </div>
            </main>
        </div>
    )
}

export default Create