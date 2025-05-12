import {Link} from "react-router-dom"

import { useTheme } from "../contexts/ThemeContext";
import { useJwt } from "../contexts/JwtContext";





const NavBar = () => {

    const {theme,changeTheme,jwt1}=useTheme();
    const {jwt2,changeJwt}=useJwt();


    return ( 
        <div className="nav-bar">
            <Link to="/">Home</Link>
            <Link to="/client">Client</Link>
            <Link to="/dentist">Denitst</Link>
            <Link to="/appointment">Appointment</Link>
            <input type="text" placeholder="Username: " id="username" defaultValue="foo1"/>
            <input type="password" placeholder="Password: " id="password" defaultValue="foofoo1"/>
            <button onClick={changeTheme}>Change Theme</button>
            <button onClick={changeJwt}>GetJwt</button>
            <br/>
            <p>{jwt2}</p>
            <p>{jwt2==null ? "You are not logged in":"Logged in"}</p>
            
           

        </div>
     );
}
 
export default NavBar;