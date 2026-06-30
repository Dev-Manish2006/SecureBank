import { Routes, Route, useLocation } from "react-router-dom";


import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";


import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Navbar from "./components/Navbar";





function App(){


    const location = useLocation();




    // Pages where navbar should not appear

    const hideNavbar =

        location.pathname === "/" ||

        location.pathname === "/login" ||

        location.pathname === "/register" ||

        location.pathname === "/forgot-password" ||

        location.pathname === "/reset-password";







    return(


        <>


            {
                !hideNavbar && <Navbar />
            }






            <Routes>



                {/* Login */}

                <Route

                    path="/"

                    element={<Login />}

                />





                <Route

                    path="/login"

                    element={<Login />}

                />








                {/* Register */}

                <Route

                    path="/register"

                    element={<Register />}

                />








                {/* Password */}

                <Route

                    path="/forgot-password"

                    element={<ForgotPassword />}

                />





                <Route

                    path="/reset-password"

                    element={<ResetPassword />}

                />









                {/* User Dashboard */}

                <Route

                    path="/dashboard"

                    element={


                        <ProtectedRoute>


                            <Dashboard />


                        </ProtectedRoute>


                    }

                />









                {/* Admin Dashboard */}

                <Route

                    path="/admin"

                    element={


                        <AdminRoute>


                            <Admin />


                        </AdminRoute>


                    }

                />





            </Routes>


        </>


    );


}



export default App;