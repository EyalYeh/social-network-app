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

    useEffect(() => {
        const savedEmail = localStorage.getItem("email");
        const savedUsername = localStorage.getItem("username");
        setForm((f) => ({
        ...f,
        email: savedEmail || "",
        username: savedUsername || "",
        password: "", // keep empty
        }));
    }, []);

    
    return(
        <>
            <div >
                <NavBar />
            </div>
                <div className="profile-container">
                    <h2 className="gradient-text">Edit your profile</h2>
                    <form className="profile-form">
                        
                        <input type="email" name="email" placeholder="Email" value={form.email} onChange={onChange}/>
                        
                        <input type="username" name="username" placeholder="Username" value={form.username} onChange={onChange}/>
                        
                        <input type="password" name="password" placeholder="Password" value={form.password} onChange={onChange} />

                        <Button type="submit">Save</Button>
                    </form> 
                </div>

        </>
    );
}

export default Profile;