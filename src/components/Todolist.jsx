import PropTypes from "prop-types";
import { useState } from 'react';


const TodoList = ({ id, name, description, status, deletetodolist, loaddata }) => {

    const [btnstatus,setbtnstatus] = useState(false);

    return (
        <div className="card" key={id}>
            <h5 className="">{name}</h5>
            <p className="">{description}</p>
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