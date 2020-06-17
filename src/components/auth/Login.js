import React, {useState} from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import AuthApiManager from "../../modules/auth/AuthApiManager"
const Login = (props) => {
    // Credentials is an object that holds the users information
    const [credentials, setCredentials] = useState({
        username: "", 
        password: ""
    })
    // Handle change in login fields
    const handleFieldChange = (e) => {
        const stateToChange = {...credentials};
        stateToChange[e.target.id] = e.target.value;
        setCredentials(stateToChange)
    }

    const handleLogin = (e) => {
        
        e.preventDefault();
        const seekerCreds = {
            username: credentials.username,
            password: credentials.password,
          };
          AuthApiManager
            .loginUser(seekerCreds)
            .then((parsedResponse) => {
              console.log(parsedResponse)
              if (
                "valid" in parsedResponse &&
                parsedResponse.valid &&
                "token" in parsedResponse
              ) {
                sessionStorage.setItem("token", parsedResponse.token);
                sessionStorage.setItem("seekerId", parsedResponse.seeker_id)
                // Finds the user on log in and sends it back up to Seeker.js 
                AuthApiManager.getUser(parsedResponse.seeker_id)
                .then((user) => {
                    props.setUser(user)
                })
              }
            })
            .then(() => props.history.push("/dashboard"));
    }

    
  return (
    <>
      <div className="loginForm">
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" textAlign="center">
              Log-in to your account
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  id="username"
                  onChange={handleFieldChange}
                  iconPosition="left"
                  placeholder="Username"
                  required
                />
                <Form.Input
                  fluid
                  icon="lock"     
                  id="password"         
                  onChange={handleFieldChange}
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  required
                />

                <Button onClick={handleLogin} fluid size="large">
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to Seeker? <a href="/register">Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    </>
  );
};

export default Login;
