import React, {useState} from 'react'
import '../comp-css/Tabs-style.css'
import RecruitEvaluations from './RecruitEvaluations'
import AddEvaluation from './AddEvaluation'

const ListEvaluations = ({ recruitID, recruitName }) => {
    
    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {
        setToggleState(index);
    };

    return (
        <div>
            <div className="bloc-tabs">
                <button className={toggleState === 1 ? "btn btn-dark tabs tab-clicker" : "btn tabs  tab-clicker"} onClick={() => toggleTab(1)}>
                    Evaluation List
                </button>
                <button className={toggleState === 2 ? "btn btn-dark tabs tab-clicker" : "btn tabs  tab-clicker"} onClick={() => toggleTab(2)}>
                    Add Evaluation
                </button>
            </div>

            <div className="content-tabs">
                <div className={toggleState === 1 ? "content  active-content" : "content"}>
                    <RecruitEvaluations recruitID={recruitID}/>
                </div>
                <div className={toggleState === 2 ? "content  active-content" : "content"}>
                    <AddEvaluation recruitID={recruitID} recruitName={recruitName}/>
                </div>
            </div>
        </div>
    )
}

export default ListEvaluations
