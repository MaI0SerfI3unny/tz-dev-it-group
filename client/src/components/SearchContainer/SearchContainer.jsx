import TextField from '@mui/material/TextField';
import { NavLink } from 'react-router-dom';

const SearchContainer = ({ search, setSearch, listPostSearch }) => {
    return(
        <div className="search_container">
            <TextField 
            id="outlined-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            label="Search by title ..." 
            type="search" />
            {search.length !== 0 && (
                <div className="result_search_container">
                    <div className="result_search_subcontainer">
                    <p className="search_title_result">Result:</p>
                    <div className="result_search_list">
                        {listPostSearch.map((el) => 
                            <div>
                                <NavLink key={el.guid} to={`/post/${el.guid}`}>{el.title}</NavLink>
                            </div>
                        )}
                    </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SearchContainer