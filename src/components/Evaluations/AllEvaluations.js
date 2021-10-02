import { useState, useEffect } from "react";
import firebaseDb from '../../firebase';
import '../comp-css/ListRecruit-style.css'
import { FileEarmarkPersonFill, PencilFill, PersonLinesFill, Trash, WindowSidebar, XCircleFill } from 'react-bootstrap-icons'
import {Link, NavLink} from 'react-router-dom';

const AllEvaluations = () => {

    const [data, setData] = useState({});

    useEffect(() => {
        firebaseDb.child("evaluations").on("value", (snapshot) => {
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
            firebaseDb.child(`evaluations/${id}`).remove((err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
    }

    return (
        <div>
            <div className="title ml-3">
                <h1 className="display-4">Manage Evaluations</h1>
                <p>A general look at all evaluations</p>
            </div>
            
            <div className="table-responsive custom-table-responsive">
                <table className="spaceUnder table custom-table">
                    <thead>
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Recruit Name</th>
                        <th scope="col">Logical Thinking</th>
                        <th scope="col">Skills</th>
                        <th scope="col">Attitude</th>
                        <th scope="col">Comment</th>
                        <th scope="col">Evaluator</th>
                        <th scope="col">Date</th>
                        <th scope="col">Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                        {Object.keys(data).map((id, index) => {
                            return (
                                <tr scope="row" key={id}>
                                    <td>{index+1}</td>
                                    <td>{data[id].recruitFullName}</td>
                                    <td>{data[id].logicalThinking} / 10</td>
                                    <td>{data[id].skills} / 10</td>
                                    <td>{data[id].attitude} / 10</td>
                                    <td>{data[id].comment}</td>
                                    <td>{data[id].evaluator}</td>
                                    <td>{data[id].evalDate}</td>
                                    <td><a className="btn btn-outline-danger btn-raised" onClick={() => onDelete(id)}><Trash size={20} /></a>
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

export default AllEvaluations
