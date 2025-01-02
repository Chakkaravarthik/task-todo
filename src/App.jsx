import { useEffect, useState } from 'react';
import './App.css';
import TodoList from './components/Todolist';

function App( {handleLogout} ) {
  const [tododata, settododata] = useState([]);
  const [formdata, setformdata] = useState({});

  // Fetch Todo Data
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:7000/todolist");
      const data = await res.json();
      settododata(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Handle Form Submit
  const handlesubmit = (e) => {
    e.preventDefault();
    if (formdata.id) {
      updateproduct();
    } else {
      createtodolist();
    }
    setformdata({});
  };

  // Delete Todo List
  const deletetodolist = async (prodid) => {
    try {
      await fetch(`http://localhost:7000/todolist/${prodid}`, {
        method: "DELETE",
      });
      settododata(tododata.filter(({ id }) => id !== prodid));
    } catch (err) {
      console.log(err);
    }
  };

  // Handle Form Input Change
  const handlechange = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  // Create New Todo
  const createtodolist = async () => {
    const tempdata = {
      ...formdata,
      id: Date.now(),
      status: false,
    };
    try {
      const res = await fetch(`http://localhost:7000/todolist`, {
        method: "POST",
        body: JSON.stringify(tempdata),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      const newTodo = await res.json();
      settododata([newTodo, ...tododata]);
    } catch (e) {
      console.log(e.message);
    }
  };

  // Edit Todo
  const loaddata = (prodid) => {
    setformdata(tododata.find((todo) => todo.id === prodid));
  };

  // Update Todo
  const updateproduct = async () => {
    try {
      await fetch(`http://localhost:7000/todolist/${formdata.id}`, {
        method: "PUT",
        body: JSON.stringify(formdata),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      const index = tododata.findIndex((todo) => todo.id === formdata.id);
      const tempdata = [...tododata];
      tempdata[index] = formdata;
      settododata(tempdata);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Form
        handlesubmit={handlesubmit}
        handlechange={handlechange}
        formdata={formdata}
        handleLogout={handleLogout}
      />
      <div className="cardbox">
        {tododata.map((todo) => {
          return (
            <TodoList
              {...todo}
              key={todo.id}
              deletetodolist={deletetodolist}
              loaddata={loaddata}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;

// Form Component
function Form({ handlesubmit, handlechange, formdata , handleLogout }) {
  return (
    <>
      <div className="formbox">
        <div className="formhead">
          <h4>My Todo</h4>
        </div>
        <form className="forminput" onSubmit={handlesubmit}>
          <input
            className="input1"
            name="taskname"
            type="text"
            placeholder="Todo Name"
            onChange={handlechange}
            value={formdata.taskname || ""}
          />
          <input
            className="input1"
            name="taskdescription"
            type="text"
            placeholder="Description"
            onChange={handlechange}
            value={formdata.taskdescription || ""}
          />
          <button className="btn" type="submit">
            {formdata.id ? "Update Todo" : "Add Todo"}
          </button>
          <a className="btn" onClick={handleLogout}>
            Logout
          </a>
        </form>
      </div>
    </>
  );
}
