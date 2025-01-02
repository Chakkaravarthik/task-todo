import PropTypes from "prop-types";
import { useState } from 'react';


const TodoList = ({ id, taskname, taskdescription, status, deletetodolist, loaddata }) => {

    const [btnstatus,setbtnstatus] = useState(status);

    return (
        <div className="card1" key={id}>
            <h5 className="">{taskname}</h5>
            <p className="">{taskdescription}</p>
            <p onClick={() => setbtnstatus(!btnstatus)} className={`btttn-${btnstatus}`}>{btnstatus ? `Completed ` : `Not completed`}</p>
            <div className="bttn">
                <a href="#" className="btn " onClick={() => loaddata(id)}>edit</a>
                <a href="#" className="btn " onClick={() => deletetodolist(id)}>Delete</a>
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