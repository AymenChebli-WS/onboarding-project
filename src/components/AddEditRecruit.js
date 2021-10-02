import {useState, useEffect} from 'react'
import firebaseDb, {app} from '../firebase';
import {useHistory, useParams} from 'react-router-dom'
import {isEmpty} from 'lodash';
import './comp-css/AddEditRecruit-style.css'
import { store } from 'react-notifications-component';

const AddEditRecruit = () => {
    const auth = app.auth();
    const user = auth.currentUser;

    const values = {
        name: "",
        gender: "",
        birthday: "",
        address: "",
        phone: "",
        email: "",
        department: "",
        supervisor: user.email
    };

    

    const [data, setData] = useState({});
    const [initialState, setState] = useState(values);
    const {name, gender, birthday, address, phone, email, department, supervisor} = initialState;

    const history = useHistory();

    const currentId = useParams();
    const { id } = currentId;

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
    }, [id]);

    useEffect(() => {
        if(isEmpty(id)) {
            setState({...values});
            
        } else {
            setState({...data[id]});
            
        }
    }, [id, data]);


    const handleInputChange = (e) => {
        let {name, value} = e.target;
        setState({...initialState, [name]: value,});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isEmpty(id)) {
            firebaseDb.child("recruits").push(initialState, (err) => {
                if(err) {
                    console.log(err);
                } else {
                    store.addNotification({
                        title: "Alert!",
                        message: "Recruit was added successfully.",
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
        } else {
            firebaseDb.child(`recruits/${id}`).set(initialState, (err) => {
                if(err) {
                    console.log(err);
                } else {
                    store.addNotification({
                        title: "Alert!",
                        message: "Recruit was updated successfully.",
                        type: "default",
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
        history.push("/list-recruit")
    };

    return (
        <div>
            <div className="title ml-3">
                <h1 className="display-4">Recruit Form</h1>
                <p>Add a new recruit or update an existing one.</p>
            </div>
            
            <div className="main-box">
            <form onSubmit={handleSubmit}>
            <div className="row mt-3">
                <div className="form-group col-md-1">
                    
                    <label>Gender</label>
                    <select className="form-control" id="gender" value={gender} name="gender" onChange={handleInputChange}>
                        <option></option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                </div>
                <div className="form-group col-md-6">
                    <label>Name</label>
                    <input 
                    className="form-control"
                    type="text"
                    value={name}
                    name="name"
                    onChange={handleInputChange} required></input>
                </div>
                <div className="form-group col-md-5">
                    <label>birthday</label>
                    <input 
                    className="form-control"
                    type="date"
                    value={birthday}
                    name="birthday"
                    onChange={handleInputChange} required></input>
                </div>
                </div>
                <div className="form-group mt-3">
                    <label>Address</label>
                    <input 
                    className="form-control"
                    type="text"
                    value={address}
                    name="address"
                    onChange={handleInputChange} required></input>
                </div>
                <div className="form-group mt-3">
                    <label>Phone</label>
                    <input 
                    className="form-control"
                    type="text"
                    value={phone}
                    name="phone"
                    onChange={handleInputChange} pattern="[0-9]{8}" required></input>
                </div>
                <div className="form-group mt-3">
                    <label>E-mail</label>
                    <input 
                    className="form-control"
                    type="email"
                    value={email}
                    name="email"
                    onChange={handleInputChange} required></input>
                </div>
                <div className="form-group mt-3">
                    <label>department</label>
                    <input 
                    className="form-control"
                    type="text"
                    value={department}
                    name="department"
                    onChange={handleInputChange} required></input>
                </div>
                <button type="submit" className="btn btn-dark btn-raised mt-3 mb-3">Submit</button>
            </form>
            </div>
        </div>
    )
}


export default AddEditRecruit
