import {useState, useEffect} from 'react';
import { EnvelopeFill } from 'react-bootstrap-icons';
import {useParams, Link} from 'react-router-dom';
import firebaseDb from '../firebase';
import './comp-css/ViewRecruit-style.css';
import './comp-css/Tabs-style.css';
import ListMaterials from './ListMaterials';
import ListEvaluations from './Evaluations/ListEvaluations';

const ViewRecruit = () => {

    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {
        setToggleState(index);
    };

    const [data, setData] = useState({});
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

    return (
        <div>
            <div className="title ml-3">
                <h1 className="display-4">Recruit Profile</h1>
                <p>A more detailed view on the recruit's info.</p>
            </div>

            {Object.keys(data).map((userId) => {
                if(userId === id) {
                    return (
                        <div>
                            <div className="main-body"> 
                                <div className="row gutters-sm">
                                    <div className="col-md-4 mb-3">
                                    <div className="card">
                                        <div className="card-body">
                                        <div className="d-flex flex-column align-items-center text-center">
                                            <img src="/assets/person.svg" alt="Recruit" className="rounded-circle" width="150" />
                                            <div className="mt-3">
                                            <h4>{data[id].name}</h4>
                                            <p className="purpleC mb-1 fw-bold">Recruit</p>
                                            <p className="text-muted font-size-sm">{data[id].department}</p>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="card mt-3">
                                        <ListMaterials recruitID={id} />
                                    </div>
                                    </div>
                                    <div className="col-md-8">
                                    <div className="card mb-3">
                                    
                                        <div className="bloc-tabs">
                                            <button className={toggleState === 1 ? "tabs active-tabs tab-clicker" : "tabs  tab-clicker"} onClick={() => toggleTab(1)}>
                                                Information
                                            </button>
                                            <button className={toggleState === 2 ? "tabs active-tabs tab-clicker" : "tabs  tab-clicker"} onClick={() => toggleTab(2)}>
                                                Evaluations
                                            </button>
                                        </div>
                                        <div className="card-body">
                                        <div className="content-tabs">
                                            <div className={toggleState === 1 ? "content  active-content" : "content"}>
                                                <h2></h2>
                                                
                                                <div className="row">
                                            <div className="col-sm-3">
                                            <h6 className="mb-0">Full Name</h6>
                                            </div>
                                            <div className="col-sm-9 text-muted">
                                            {data[id].name}
                                            </div>
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className="col-sm-3">
                                            <h6 className="mb-0">Email</h6>
                                            </div>
                                            <div className="col-sm-9 text-muted">
                                            {data[id].email}
                                            </div>
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className="col-sm-3">
                                            <h6 className="mb-0">Phone</h6>
                                            </div>
                                            <div className="col-sm-9 text-muted">
                                                +216 {data[id].phone}
                                            </div>
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className="col-sm-3">
                                            <h6 className="mb-0">Birthday</h6>
                                            </div>
                                            <div className="col-sm-9 text-muted">
                                            {data[id].birthday}
                                            </div>
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className="col-sm-3">
                                            <h6 className="mb-0">Address</h6>
                                            </div>
                                            <div className="col-sm-9 text-muted">
                                            {data[id].address}
                                            </div>
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className="col-sm-3">
                                            <h6 className="mb-0">Department</h6>
                                            </div>
                                            <div className="col-sm-9 text-muted">
                                            {data[id].department}
                                            </div>
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className="col-sm-3">
                                            <h6 className="mb-0">Supervisor</h6>
                                            </div>
                                            <div className="col-sm-9 text-muted">
                                            {data[id].supervisor}
                                            </div>
                                        </div>
                                            </div>
                                            <div className={toggleState === 2 ? "content  active-content" : "content"}>
                                                <ListEvaluations recruitID={id} recruitName={data[id].name}/>
                                            </div>
                                            </div>
                                        </div>
                                        
                                        
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default ViewRecruit
