const URL = "https://task-todo-be-789q.onrender.com"

const usersignup = async (userdata) =>{
    try{
        const res = await fetch(`${URL}/register`,{
            method:"post",
            body: JSON.stringify(userdata),
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            }
        })
        return await res.json();
    }catch(e){
        console.log(e.message)
    }
}

const userlogin = async (userdata)=>{
    try{
        const res = await fetch(`${URL}/login`, {
            method: "post",
            body: JSON.stringify(userdata),
            headers:{
                "Content-Type": "application/json;charset=utf-8",
            }
        })
        return await res.json();
    }catch(e){
        console.log(e.message)
    }
}


export {usersignup, userlogin};