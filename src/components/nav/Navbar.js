import React, { useEffect } from "react";
import { Navbar, NavLink } from "react-bootstrap";
import {Icon} from "semantic-ui-react"
import "/Users/sofiac/seeker-web-app/seeker-app/src/css/nav/Navbar.css";

const SeekerNav = (props) => {
    

    const handleLogout = () => {
    sessionStorage.clear();
  }
  
  return (
    <>
    
      <Navbar>
        <NavLink href="/dashboard " className="siteName">
          Seeker
        </NavLink>
       <div className="secondaryLinks">
          <NavLink className="siteLink" href="/network">Network</NavLink>
          <NavLink className="siteLink" href="/interviews">Interviews</NavLink>
          <NavLink className="siteLink" href="/applications">Applications</NavLink>
          <NavLink onClick ={handleLogout} href="/" className="siteLink">Logout</NavLink>
          </div>
       
      </Navbar>
    </>
  );
};

export default SeekerNav;
