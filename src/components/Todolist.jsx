import PropTypes from "prop-types";
import { useState } from 'react';


const TodoList = ({ id, taskname, taskdescription, status, deletetodolist, loaddata }) => {

    const [btnstatus,setbtnstatus] = useState(status);

    return (
        <div className="card1 shadow-lg" key={id}>
            <h5 className="">{taskname}</h5>
            <p className="">{taskdescription}</p>
            <p onClick={() => setbtnstatus(!btnstatus)} className={`btn btn-primary`}>{btnstatus ? `Completed ` : `Not completed`}</p>
            <div className="bttn">
                <a href="#" className="btn btn-outline-primary" onClick={() => loaddata(id)}>Edit</a>
                <a href="#" className="btn btn-outline-primary " onClick={() => deletetodolist(id)}>Delete</a>
            </div>
        </div>
    )
}

export default TodoList;

TodoList.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.bool
}