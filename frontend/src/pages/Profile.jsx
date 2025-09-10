import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Button from "@mui/material/Button";
import './Profile.css'


function Profile() {

    const [form, setForm] =useState({
        email: "",
        username: "",
        password: "",
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Would save:", form);
    };

    
    return(
        <>
            <div >
                <NavBar />
            </div>
                <div className="profile-container">
                    <h2 className="gradient-text">Edit your profile</h2>
                    <form className="profile-form">
                        
                        <input type="text" placeholder="Email"/>
                        
                        <input type="text" placeholder="Username"/>
                        
                        <input type="text" placeholder="Password"/>

                        <Button type="submit">Save</Button>
                    </form> 
                </div>

        </>
    );
}

export default Profile;