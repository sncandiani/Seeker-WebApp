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
        {props.user ? (
        <>
          <NavLink className="siteLink" href="/network">Network</NavLink>
          <NavLink className="siteLink" href="/interviews">Interviews</NavLink>
          <NavLink className="siteLink">Applications</NavLink>
          <NavLink onClick ={handleLogout} href="/" className="siteLink">Logout</NavLink>
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
