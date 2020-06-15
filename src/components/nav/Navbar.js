import React, { useEffect } from "react";
import { Navbar, NavLink } from "react-bootstrap";
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
        {props.loggedIn ? (
        <>
          <NavLink>Network</NavLink>
          <NavLink>Interviews</NavLink>
          <NavLink>Applications</NavLink>
          <NavLink onClick ={handleLogout} href="/">Logout</NavLink>
        </>
        ) : (
          <NavLink href="/login" className="siteLink">
            Login
          </NavLink>
        )}
      </Navbar>
    </>
  );
};

export default SeekerNav;
