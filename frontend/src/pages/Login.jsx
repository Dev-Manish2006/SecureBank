import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import API from "../services/api";

import { AuthContext } from "../context/AuthContext";

import "./Login.css";



function Login(){


    const navigate = useNavigate();



    const { login } = useContext(AuthContext);




    const [email,setEmail] = useState("");

    const [password,setPassword] = useState("");

    const [loading,setLoading] = useState(false);







    const loginUser = async()=>{


        if(!email || !password){


            alert("Email and password required");

            return;


        }






        try{


            setLoading(true);





            const res = await API.post(

                "/auth/login",

                {

                    email,

                    password

                }

            );








            localStorage.setItem(

                "token",

                res.data.token

            );






            localStorage.setItem(

                "user",

                JSON.stringify(res.data.user)

            );






            login(res.data.user);








            alert("Login Successful");







            if(res.data.user.role === "admin"){


                navigate("/admin");


            }

            else{


                navigate("/dashboard");


            }







        }


        catch(error){



            alert(

                error.response?.data?.message ||

                "Login failed"

            );


        }


        finally{


            setLoading(false);


        }



    };









    return(


        <div className="login-container">





            <div className="login-card">





                <div className="login-logo">

                    🏦

                </div>





                <h1>

                    Secure<span>Bank</span>

                </h1>





                <p className="subtitle">

                    Login to your secure banking account

                </p>








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


                    placeholder="Enter Password"


                    value={password}


                    onChange={
                        e=>setPassword(e.target.value)
                    }


                />










                <button


                    onClick={loginUser}


                    disabled={loading}


                >


                    {

                    loading

                    ?

                    "Logging in..."

                    :

                    "Login"

                    }



                </button>









                <Link to="/forgot-password">


                    Forgot Password?


                </Link>








                <Link to="/register">


                    Create New Account


                </Link>







            </div>





        </div>


    );


}



export default Login;