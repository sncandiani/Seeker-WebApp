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

  const handleFieldChange = (e) => {
    const stateToChange = { ...regCredentials };
    stateToChange[e.target.id] = e.target.value;
    setRegCredentials(stateToChange);
  };

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
        if (
          "token" in parsedResponse
        ) {
          sessionStorage.setItem("token", parsedResponse.token);
          sessionStorage.setItem("seekerId", parsedResponse.seeker_id);
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
                ></FormInput>
                Last Name:
                <FormInput
                id="lastName"
                onChange={handleFieldChange}
                ></FormInput>
                City:
                <FormInput
                id="city"
                onChange={handleFieldChange}
                ></FormInput>
                State:
                <FormInput
                id="state"
                onChange={handleFieldChange}
                ></FormInput>
                Username:
                <FormInput
                id="username"
                onChange={handleFieldChange}
                ></FormInput>
                Password:
                <FormInput
                id="password"
                onChange={handleFieldChange}
                type="password"
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
