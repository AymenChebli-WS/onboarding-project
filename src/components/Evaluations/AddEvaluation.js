import React from 'react'
import {useState, useEffect} from 'react'
import firebaseDb, {app} from '../../firebase';
import {useHistory, useParams} from 'react-router-dom'
import '../comp-css/AddEval-style.css'
import { store } from 'react-notifications-component'

const AddEvaluation = ({ recruitID, recruitName }) => {
    var currDate = new Date().toLocaleString();
    const auth = app.auth();
    const user = auth.currentUser;

    const values = {
        logicalThinking: "5",
        skills: "5",
        attitude: "5",
        comment: "",
        evalDate: currDate,
        recruitFullName: recruitName,
        recruitIdentifier: recruitID,
        evaluator: user.email
    };

    const [initialState, setState] = useState(values);
    const {logicalThinking, skills, attitude, comment, evalDate, recruitFullName, recruitIdentifier, evaluator} = initialState;

    const handleInputChange = (e) => {
        let {name, value} = e.target;
        setState({...initialState, [name]: value,});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        firebaseDb.child("evaluations").push(initialState, (err) => {
            if(err) {
                console.log(err);
            } else {
                store.addNotification({
                    title: "Alert!",
                    message: "Evaluation was made successfully.",
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
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group mt-3">
                <label for="customRange2" className="form-label">Logical Thinking</label>
                <input type="range" className="form-range" min="0" max="10" id="customRange2" value={logicalThinking} name="logicalThinking" onChange={handleInputChange} />
                </div>
                <div className="form-group mt-3">
                <label for="customRange2" className="form-label">Skills</label>
                <input type="range" className="form-range" min="0" max="10" id="customRange2" value={skills} name="skills" onChange={handleInputChange} />
                </div>
                <div className="form-group mt-3">
                <label for="customRange2" className="form-label">Attitude</label>
                <input type="range" className="form-range" min="0" max="10" id="customRange2" value={attitude} name="attitude" onChange={handleInputChange} />
                </div>
                <div className="form-group mt-3">
                    <label className="form-label">Comment</label>
                    <textarea 
                    className="form-control"
                    
                    value={comment}
                    name="comment"
                    onChange={handleInputChange} required></textarea>
                </div>
                <button type="submit" className="btn purpleBC btn-raised mt-3 mb-3">Submit</button>
            </form>
        </div>
    )
}

export default AddEvaluation
