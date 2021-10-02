import {useState, useEffect} from 'react'
import { Trash, XCircleFill } from 'react-bootstrap-icons';
import firebaseDb from '../firebase';
import './comp-css/ListMaterials-style.css'
import { store } from 'react-notifications-component'

const ListMaterials = ({ recruitID }) => {

    const values = {
        name: "",
        requester: recruitID,
    };

    const [matData, setData] = useState({});
    const [initialState, setState] = useState(values);
    const {name, requester} = initialState;

    useEffect(() => {
        firebaseDb.child("materials").on("value", (snapshot) => {
            if (snapshot.val() !== null) {
                setData({
                    ...snapshot.val(),
                });
            } else {
                snapshot({});
            }
        });
    }, []);

    const handleInputChange = (e) => {
        let {name, value} = e.target;
        setState({...initialState, [name]: value,});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        firebaseDb.child("materials").push(initialState, (err) => {
            if(err) {
                console.log(err);
            } else {
                store.addNotification({
                    title: "Alert!",
                    message: "Material was added successfully.",
                    type: "success",
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
    };
    const onDelete = (id) => {
        if(window.confirm("Are you sure you want to remove this material")) {
            firebaseDb.child(`materials/${id}`).remove((err) => {
                if (err) {
                    console.log(err);
                } else {
                    store.addNotification({
                        title: "Alert!",
                        message: "Material was removed successfully.",
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
            <h5 className="ms-3 mt-2">Requested materials</h5>
            <form onSubmit={handleSubmit}>
            <div class="row mt-3 me-3 ms-3">
                <div className="form-group col-sm">
                    <input 
                    className="form-control"
                    type="text"
                    value={name}
                    name="name"
                    onChange={handleInputChange} required></input>
                </div>
                <button type="submit" className="btn btn-dark btn-raised col-sm-3 me-3">Add</button>
                </div>
            </form>
            
            <div className="">
            <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th scope="col" className="fw-bold">Name</th>
                            <th scope="col" className="fw-bold">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(matData).map((id) => {
                            if(matData[id].requester == recruitID){
                                return (
                                    <tr scope="row" key={id}>
                                        <td>{matData[id].name}</td>
                                        <td><a  className="" onClick={() => onDelete(id)}><Trash  color="red" size={20} /></a></td>
                                    </tr>
                                    )
                            } 
                        })}
                    
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListMaterials
