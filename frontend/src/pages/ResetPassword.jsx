import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";


function ResetPassword(){


    const navigate = useNavigate();


    const [token,setToken] = useState("");

    const [password,setPassword] = useState("");

    const [loading,setLoading] = useState(false);






    const resetPassword = async()=>{


        if(!token || !password){


            alert("Token and password required");

            return;


        }






        try{


            setLoading(true);





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






            navigate("/login");





        }

        catch(error){


            alert(

                error.response?.data?.message ||

                "Reset failed"

            );


        }

        finally{


            setLoading(false);


        }


    };









    return(


        <div>


            <h1>
                Reset Password
            </h1>







            <input


                placeholder="Enter Reset Token"


                value={token}


                onChange={

                    e=>setToken(e.target.value)

                }


            />







            <br/><br/>







            <input


                type="password"


                placeholder="Enter New Password"


                value={password}


                onChange={

                    e=>setPassword(e.target.value)

                }


            />







            <br/><br/>







            <button

                onClick={resetPassword}

                disabled={loading}

            >


                {

                    loading

                    ?

                    "Resetting..."

                    :

                    "Reset Password"

                }



            </button>






        </div>


    );


}



export default ResetPassword;