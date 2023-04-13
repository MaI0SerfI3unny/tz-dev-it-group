import { NavLink } from "react-router-dom"
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const PanelMain = ({setSort,sort, sortBy, setSortBy}) => {
    const handleChange = (event,setHook) => {
        setHook(event.target.value);
    };
    return(
        <div className="control_panel_main">
            <Select
            value={sortBy}
            onChange={(e) => handleChange(e, setSortBy)}>
                <MenuItem value={"guid"}>guid</MenuItem>
                <MenuItem value={"creator"}>creator</MenuItem>
                <MenuItem value={"isoDate"}>isoDate</MenuItem>
                <MenuItem value={"title"}>title</MenuItem>
            </Select>
            <Select
            value={sort}
            onChange={(e) => handleChange(e, setSort)}>
                <MenuItem value={"asc"}>Asc</MenuItem>
                <MenuItem value={"desc"}>Desc</MenuItem>
            </Select>
            <NavLink to="/create"><button>Create</button></NavLink>
        </div>
    )
}

export default PanelMain