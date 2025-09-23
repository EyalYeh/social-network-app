import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Chat from "../components/Chat";
import Button from "@mui/material/Button";


function Chats() {
    


    return(
        <>
         
                <NavBar />
            <div className="page-container">
                <Chat />
            </div>
        </>
    );
}

export default Chats;