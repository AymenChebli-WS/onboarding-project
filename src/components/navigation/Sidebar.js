import './Sidebar-style.css'
import { NavLink, useLocation, withRouter } from 'react-router-dom'
import { Grid1x2Fill, FilePersonFill, PersonPlusFill, KanbanFill } from 'react-bootstrap-icons';

const Sidebar = () => {

  let location = useLocation();
    if (location.pathname.match(/login/)){
        return null;
      }

    return (
        <div className="d-flex flex-column flex-shrink-0  text-white sidebar" style={{width: "240px"}}>
            <div className="sidebar__top-section w-100 py-3">
        <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none ">
          <span className="fs-4">
            <img src="/assets/PlaceholderLogo.png" height="70" style={{marginLeft: "2rem"}} />
          </span>
        </a>
            </div>
            <span className="border"></span>
        <ul className=" flex-column mb-auto sidebar__menu list-group">
          <li className="list-group-item" >
            <NavLink to="/" className="nav-link text-white  d-flex justify-content-start align-items-center gap-3">
            <Grid1x2Fill />
              Dashboard
            </NavLink>
          </li>
          <li className="list-group-item" activeClassName="selected" >
            <NavLink to="/list-recruit"  className="nav-link text-white d-flex justify-content-start align-items-center gap-3">
            <FilePersonFill />
              Manage Recruits
            </NavLink>
          </li>
          <li class="list-group-item" >
            <NavLink to="/addedit-recruit"  className="nav-link text-white d-flex justify-content-start align-items-center gap-3">
            <PersonPlusFill />
              Add Recruit
            </NavLink>
          </li>
          <li className="list-group-item" >
            <NavLink to="/list-evaluations"  className="nav-link text-white d-flex justify-content-start align-items-center gap-3">
            <KanbanFill />
              Manage Evaluations
            </NavLink>
          </li>
        </ul>
      </div>
    )
}

export default Sidebar
