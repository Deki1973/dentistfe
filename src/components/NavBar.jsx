import { Link } from "react-router-dom"

import { useTheme } from "../contexts/ThemeContext";
import { useJwt } from "../contexts/JwtContext";

import "../styles/NavBar.scss"
import { useState } from "react";





const NavBar = () => {

    const { theme, changeTheme, jwt1 } = useTheme();
    const { jwt2, changeJwt, logout } = useJwt();


    //const userName="foo1"
    //const passWord="foofoo1"

    const [userName, setUserName] = useState("foo1")
    const [passWord, setPassWord] = useState("foofoo1")


    const handleLoginClick = () => {
        changeJwt(userName, passWord)
    }

    return (
        <div className="navBar">
            <div className="login">
                <input type="text" placeholder="Username: " id="username" defaultValue="foo1" onChange={(e) => { setUserName(e.target.value) }} />
                <input type="password" placeholder="Password: " id="password" defaultValue="foofoo1" onChange={(e) => { setPassWord(e.target.value) }} />

                <button onClick={handleLoginClick}>Login</button>
                <button onClick={logout}>Logout</button>

                <h4>{jwt2 == null ? "You are not logged in" : "Logged in"}</h4>
            </div>
            <div className="links">
                <Link to="/" className="linkTo">Home</Link>
                <Link to="/client" className="linkTo">Client</Link>
                <Link to="/dentist" className="lintTo">Denitst</Link>
                <Link to="/appointment" className="linkTo">Appointment</Link>
            </div>

            <br />




        </div>
    );
}

export default NavBar;