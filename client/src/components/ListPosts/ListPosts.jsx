import { NavLink } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';

const ListPosts = ({ page, perPage, setPage, listPost,count }) => {
    return(
    <div className="list_container">
        <div className='list_subcontainer'>
        {listPost?.map((el) => 
            <div className="list__item" key={el.guid}>
                <NavLink to={`/post/${el.guid}`}><h3>{el.title}</h3></NavLink>
                <p><b>Description:</b> {el.contentSnippet}</p>
                <p><b>Author:</b> {el.creator}</p>
                <p><b>Link:</b> <a href={el.link}>{el.link}</a></p>
            </div>
        )}
        </div>
        <Pagination 
            count={Math.round(count / perPage)} 
            page={page} 
            onChange={(_, value) => setPage(value)} />
    </div>
    )
}

export default ListPosts