import React from 'react'
import { FilePerson, Kanban, PersonPlus, PersonPlusFill } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom'
import './comp-css/Landing-style.css'

const Home = () => {
    return (
        <div>
            <h1 className="display-1 text-center mb-3">Recruit Management</h1>
            <h4 className="fw-light text-center mb-3 landTitle">A set of tools designed to manage the new recruits</h4>
            <div className="desc-box">
                <div className="row">
                    <div className="col-md-3">
                        <img src="assets/Person-Check.svg" width="250"></img>
                    </div>
                    <div className="col-md-6">
                        <h1 className="display-6 purpleC">How does it work?</h1>
                        
                        <p className="">
                            Recruits can be managed through the 'Manage Recruits' section
                            where you can check the various recruits, edit their info or add new ones as well as remove any of them.
                            <br /><br />
                            You can evaluate them according to different categories, a comment is then added to give more in-depth info on the recruit.
                            <br /><br />
                            Any materials requested by the recruit can be added and stored in the database in order to keep track of them.
                        </p>
                    </div>
                </div>
            </div>
            <div className="row">
                <NavLink to="/list-recruit" className="comp-box col-sm-3">
                    <div className="row">
                    <FilePerson size={60} className="col-sm-4" /><h3 className="fw-light col-sm-7 mt-3">Manage Recruits</h3>
                    </div>
                </NavLink>
                <NavLink to="/addedit-recruit" className="comp-box col-sm-3">
                    <div className="row">
                    <PersonPlus size={60} className="col-sm-5" /><h3 className="fw-light col-sm-7 mt-3">Add Recruit</h3>
                    </div>
                </NavLink>
                <NavLink to="/list-evaluations" className="comp-box col-sm-3">
                    <div className="row">
                    <Kanban size={60} className="col-sm-4" /><h3 className="fw-light col-sm-8 mt-3">Manage Evaluations</h3>
                    </div>
                </NavLink>
            </div>
        </div>
    );
}

export default Home
