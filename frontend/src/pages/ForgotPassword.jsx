import { useState } from "react";
import { Link } from "react-router-dom";

import API from "../services/api";

import "./ForgotPassword.css";



function ForgotPassword(){


    const [email,setEmail] = useState("");

    const [loading,setLoading] = useState(false);

    const [token,setToken] = useState("");







    const forgotPassword = async()=>{


        if(!email){


            alert("Email required");

            return;

        }







        try{


            setLoading(true);




            const res = await API.post(

                "/auth/forgot-password",

                {

                    email

                }

            );






            setToken(

                res.data.resetToken

            );



            alert(
                "Reset token generated"
            );





        }


        catch(error){



            alert(

                error.response?.data?.message ||

                "Failed"

            );


        }


        finally{


            setLoading(false);


        }



    };








    return(



        <div className="forgot-container">





            <div className="forgot-card">





                <div className="forgot-logo">

                    🔐

                </div>





                <h1>

                    Forgot <span>Password</span>

                </h1>





                <p>

                    Enter your email to reset password

                </p>







                <input


                    type="email"


                    placeholder="Enter Email"


                    value={email}


                    onChange={
                        e=>setEmail(e.target.value)
                    }


                />






                <button

                    onClick={forgotPassword}

                    disabled={loading}

                >

                {

                    loading

                    ?

                    "Sending..."

                    :

                    "Generate Token"

                }


                </button>








                {
                    token &&


                    <div className="token-box">


                        <b>
                            Reset Token:
                        </b>


                        <br/>

                        {token}


                    </div>

                }









                <Link to="/login">

                    Back to Login

                </Link>





            </div>





        </div>



    );


}



export default ForgotPassword;