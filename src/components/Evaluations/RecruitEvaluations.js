import {useState, useEffect} from 'react'
import { Trash } from 'react-bootstrap-icons';
import firebaseDb, {app} from '../../firebase';

const RecruitEvaluations = ({recruitID}) => {

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
        if(window.confirm("Are you sure you want to delete this evaluation?")) {
            firebaseDb.child(`evaluations/${id}`).remove((err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
    }

    return (
        <div>
            <table class="table">
  <thead>
    <tr>
      
      <th scope="col" className="fw-bold">Logical Thinking</th>
      <th scope="col" className="fw-bold">Skills</th>
      <th scope="col" className="fw-bold">Attitude</th>
      <th scope="col" className="fw-bold">Comment</th>
      <th scope="col" className="fw-bold">Evaluator</th>
      <th scope="col" className="fw-bold">Date</th>
      <th scope="col" className="fw-bold">Remove</th>
    </tr>
  </thead>
  <tbody>
    {Object.keys(data).map((id) => {
        if(data[id].recruitIdentifier == recruitID){
            return (
                <tr>
                    
                    <td>{data[id].logicalThinking}</td>
                    <td>{data[id].skills}</td>
                    <td>{data[id].attitude}</td>
                    <td>{data[id].comment}</td>
                    <td>{data[id].evaluator}</td>
                    <td>{data[id].evalDate}</td>
                    <td><a  className="" onClick={() => onDelete(id)}><Trash  color="red" size={20} /></a></td>
                </tr>
            )
        }
    })}
    </tbody>
</table>
        </div>
    )
}

export default RecruitEvaluations
