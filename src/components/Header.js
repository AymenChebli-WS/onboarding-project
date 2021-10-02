import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <NavLink to="/list-recruit" className="btn btn-dark">Recruit List</NavLink>
            <NavLink to="/addedit-recruit" className="btn btn-dark">Add</NavLink>
        </header>
    )
}

export default Header
