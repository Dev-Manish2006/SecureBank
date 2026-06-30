import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

import "./Register.css";



function Register(){


    const navigate = useNavigate();



    const [name,setName] = useState("");

    const [email,setEmail] = useState("");

    const [password,setPassword] = useState("");

    const [loading,setLoading] = useState(false);







    const registerUser = async()=>{


        if(!name || !email || !password){


            alert("All fields are required");

            return;


        }







        try{


            setLoading(true);





            await API.post(

                "/auth/register",

                {

                    name,

                    email,

                    password

                }

            );





            alert(
                "Registration Successful"
            );



            navigate("/login");





        }


        catch(error){



            alert(

                error.response?.data?.message ||

                "Registration failed"

            );


        }


        finally{


            setLoading(false);


        }



    };








    return(



        <div className="register-container">





            <div className="register-card">





                <div className="register-logo">

                    🏦

                </div>





                <h1>

                    Create <span>Account</span>

                </h1>





                <p className="subtitle">

                    Join SecureBank today

                </p>







                <input


                    type="text"


                    placeholder="Enter Name"


                    value={name}


                    onChange={
                        e=>setName(e.target.value)
                    }


                />






                <input


                    type="email"


                    placeholder="Enter Email"


                    value={email}


                    onChange={
                        e=>setEmail(e.target.value)
                    }


                />








                <input


                    type="password"


                    placeholder="Create Password"


                    value={password}


                    onChange={
                        e=>setPassword(e.target.value)
                    }


                />








                <button

                    onClick={registerUser}

                    disabled={loading}

                >


                {

                    loading

                    ?

                    "Creating..."

                    :

                    "Register"

                }


                </button>









                <Link to="/login">

                    Already have account? Login

                </Link>






            </div>




        </div>



    );


}



export default Register;