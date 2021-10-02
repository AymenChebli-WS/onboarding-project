import { useState, useEffect } from "react";
import firebaseDb from '../firebase';
import './comp-css/ListRecruit-style.css'
import { FileEarmarkPersonFill, PencilFill, PersonLinesFill, Trash, WindowSidebar, XCircleFill } from 'react-bootstrap-icons'
import {Link, NavLink} from 'react-router-dom';
import { store } from "react-notifications-component";

const ListRecruit = () => {

    const [data, setData] = useState({});

    useEffect(() => {
        firebaseDb.child("recruits").on("value", (snapshot) => {
            if (snapshot.val() !== null) {
                setData({
                    ...snapshot.val(),
                });
            } else {
                snapshot({});
            }
        });
    }, []);

    const onDelete = (id) => {
        if(window.confirm("Are you sure you want to delete this recruit?")) {
            firebaseDb.child(`recruits/${id}`).remove((err) => {
                if (err) {
                    console.log(err);
                } else {
                    store.addNotification({
                        title: "Alert!",
                        message: "Recruit was removed successfully.",
                        type: "danger",
                        insert: "bottom",
                        container: "bottom-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                          duration: 2000,
                          onScreen: true
                        }
                    });
                }
            });
        }
    }


    return (
        <div>
            <div className="title ml-3">
                <h1 className="display-4">Manage Recruits</h1>
                <p>This allows you to add, edit and remove recruits.</p>
            </div>
            
            <div className="table-responsive custom-table-responsive">
            <NavLink to="/addedit-recruit" type="button" class="float-end btn btn-dark btn-raised">Add Recruit</NavLink>
                <table className="spaceUnder table custom-table">
                    <thead>
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Email</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Profile</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {Object.keys(data).map((id, index) => {
                            return (
                                <tr scope="row" key={id}>
                                    <td>{index+1}</td>
                                    <td>{data[id].name}</td>
                                    <td>{data[id].phone}</td>
                                    <td>{data[id].email}</td>
                                    <td>{data[id].gender}</td>
                                    <td><Link to={`/view-recruit/${id}`}><a className="btn btn-outline-primary btn-raised"><PersonLinesFill size={20} /></a></Link></td>
                                    <td>
                                    <Link to={`/update-recruit/${id}`}><a title="Update" className="btn btn-outline-success btn-raised me-3"><PencilFill size={20} /></a></Link>
                                    <a className="btn btn-outline-danger btn-raised" onClick={() => onDelete(id)}><Trash size={20} /></a>
                                    </td>
                                </tr>
                            )
                        })}
                    
                    </tbody>
                </table>
        </div>
        </div>
    )
}

export default ListRecruit
