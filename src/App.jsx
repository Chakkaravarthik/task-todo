import { useEffect } from 'react';
import './App.css'
import TodoList from './components/Todolist'
import { useState } from 'react';

function App() {
  const [tododata, settododata] = useState([]);
  const [formdata, setformdata] = useState({});
 

  const fetchData = async () => {
    try {
      const res = await fetch("https://65e4b9363070132b3b253272.mockapi.io/todolist");
      const data = await res.json();
      settododata(data);
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }


  const handlesubmit = (e) =>{
    e.preventDefault();
    if(formdata.id) {
      updateproduct();
    } else {
      createtodolist();
    }
    setformdata({});
  }


  //delete todo list 

  const deletetodolist = (prodid) =>{
    settododata(tododata.filter(({id})=> id!==prodid));
    console.log(tododata)
  }


  // below are to add new tdo 

  const handlechange =(e)=>{
    setformdata({
      ...formdata,
      [e.target.name]:e.target.value,
    })
    console.log(formdata)

  }
  const createtodolist= ()=>{
    const tempdata = {...formdata}
    tempdata.id = Date.now();
    tempdata.status =false;
    settododata([tempdata,...tododata])
  }


  //edit todo list by loading data to table
  const loaddata =(prodid)=>{
    setformdata(tododata.find((todo)=>todo.id==prodid))
    console.log(formdata)
  }

  const updateproduct= () =>{
    const index = tododata.findIndex((todo)=> todo.id==formdata.id)
    const tempdata = [...tododata]
    tempdata[index]=formdata;
    settododata(tempdata);
  }


  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      < Form handlesubmit={handlesubmit} handlechange={handlechange} formdata={formdata} />
      <div className='cardbox'>
        {tododata.map((todo) => {
          return (

            < TodoList {...todo} key={todo.id} deletetodolist={deletetodolist} loaddata={loaddata} />


          )

        })}

      </div>


    </>


  )
}

export default App

function Form({handlesubmit,handlechange,formdata}) {
  return (
    <>
      <div className="formbox">
        <div className="formhead">
          <h4>My Todo</h4>
        </div>
        <form className='forminput' onSubmit={handlesubmit}>
          <input className='input1' name="name"type='text' placeholder='Todo Name' onChange={handlechange} value={formdata.name || ""}/>
          <input className='input1' name="description" type='text' placeholder='Description' onChange={handlechange} value={formdata.description|| ""}/>
          <button className='btn' type='submit'>Add Todo</button>
        </form>
      </div>
    </>
  )
}


