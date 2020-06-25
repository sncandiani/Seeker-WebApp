import React from "react";
import { Button, Icon } from "semantic-ui-react";

const Home = (props) => {
  return (
    <div className="homeSeparation">
      <section className="home">
        <div className="motto">
          <p>Your job hunt,</p>
          <p className="motto-2">on your terms.</p>
        </div>
      </section>
      <section className="mainHome">

       
          <div className="sect1">
            <p className="smallSeeker1">Hello, my name is...</p>
            <p className="bigSeeker">Seeker</p>
            <p className="smallSeeker2">Helping you keep track of your network, interviews, and applications with ease. </p>
            </div>

          <div className="sect2">
          <div className="shapes">
            <div class="circle"></div>
            <div class="square"></div>
          </div>
            <div className="sect3">
            <Button onClick={() => props.history.push("/login")}>Log In</Button>
          </div>
          </div>

    
      </section>
    </div>
  );
};
export default Home;
