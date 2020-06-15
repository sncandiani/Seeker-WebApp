import React, {useState, useEffect} from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  FormInput,
} from "semantic-ui-react";
import AuthApiManager from "../../modules/auth/AuthApiManager"
const Register = (props) => {
  const [regCredentials, setRegCredentials] = useState({
    firstName: "",
    lastName: "",
    city: "",
    state: "",
    username: "",
    password: "",
  });
//   Handles field change for register form 
  const handleFieldChange = (e) => {
    const stateToChange = { ...regCredentials };
    stateToChange[e.target.id] = e.target.value;
    setRegCredentials(stateToChange);
  };

//   On register creates an object equal to all the details of the users credentials
  const handleRegister = (e) => {
      e.preventDefault();
    const seekerRegCreds = {
        firstName: regCredentials.firstName,
        lastName: regCredentials.lastName, 
        city: regCredentials.city, 
        state: regCredentials.state,
        username: regCredentials.username,
        password: regCredentials.password,
    }
    AuthApiManager.registerUser(seekerRegCreds)
    .then((parsedResponse) => {
        console.log(parsedResponse)
        if (
            "valid" in parsedResponse &&
            parsedResponse.valid &&
            "token" in parsedResponse
          ) {
            sessionStorage.setItem("token", parsedResponse.token);
            sessionStorage.setItem("seekerId", parsedResponse.seeker_id)
            AuthApiManager.getUser(parsedResponse.seeker_id)
            .then((user) => {
                props.setUser(user)
            })
          }
        })
    .then(() => props.history.push("/dashboard"))
  }

  return (
    <>
      <div className="registerForm">
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" textAlign="center">
              Register your account
            </Header>
            <Form size="large">
              <Segment>
                First Name:
                <FormInput
                  id="firstName"
                  onChange={handleFieldChange}
                  required
                ></FormInput>
                Last Name:
                <FormInput
                id="lastName"
                onChange={handleFieldChange}
                required
                ></FormInput>
                City:
                <FormInput
                id="city"
                onChange={handleFieldChange}
                required
                ></FormInput>
                State:
                <FormInput
                id="state"
                onChange={handleFieldChange}
                required
                ></FormInput>
                Username:
                <FormInput
                id="username"
                onChange={handleFieldChange}
                required
                ></FormInput>
                Password:
                <FormInput
                id="password"
                onChange={handleFieldChange}
                type="password"
                required
                ></FormInput>
                <Button onClick={handleRegister} fluid size="large">
                  Register
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    </>
  );
};

export default Register;
