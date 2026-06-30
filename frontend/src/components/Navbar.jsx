import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Navbar.css";


const Navbar = () => {


    const navigate = useNavigate();


    const [user] = useState(

        JSON.parse(
            localStorage.getItem("user")
        )

    );




    const logout = () => {


        localStorage.removeItem("token");

        localStorage.removeItem("user");


        navigate("/login");


    };





    return (

        <nav className="navbar">


            <div 
                className="logo"
                onClick={()=>navigate("/dashboard")}
            >

                Secure<span>Bank</span>

            </div>





            <ul className="nav-links">


                <li onClick={()=>navigate("/dashboard")}>

                    Dashboard

                </li>



                <li>

                    Accounts

                </li>



                <li>

                    Transactions

                </li>



                <li>

                    Loans

                </li>


            </ul>







            <div className="user-box">


                <div className="avatar">

                    {
                        user?.name
                        ?
                        user.name.charAt(0).toUpperCase()
                        :
                        "U"
                    }

                </div>




                <span>

                    Welcome,
                    {" "}
                    {
                        user?.name || "User"
                    }

                </span>





                <button
                    className="logout-btn"
                    onClick={logout}
                >

                    Logout

                </button>



            </div>





        </nav>

    );

};


export default Navbar;