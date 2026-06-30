import { useState } from "react";
import { Link } from "react-router-dom";

import API from "../services/api";

import "./ResetPassword.css";



function ResetPassword(){


const [token,setToken]=useState("");

const [password,setPassword]=useState("");




const resetPassword=async()=>{


try{


await API.post(

"/auth/reset-password",

{

token,

password

}

);



alert(
"Password reset successful"
);


}

catch(error){


alert(

error.response?.data?.message ||

"Reset failed"

);


}


};





return(


<div className="reset-container">


<div className="reset-card">


<div className="reset-logo">

🔑

</div>



<h1>

Reset <span>Password</span>

</h1>




<input

placeholder="Reset Token"

value={token}

onChange={
e=>setToken(e.target.value)
}

/>




<input

type="password"

placeholder="New Password"

value={password}

onChange={
e=>setPassword(e.target.value)
}

/>




<button onClick={resetPassword}>

Reset Password

</button>




<Link to="/login">

Back Login

</Link>


</div>


</div>


);


}



export default ResetPassword;