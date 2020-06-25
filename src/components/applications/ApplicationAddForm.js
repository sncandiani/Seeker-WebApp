import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Grid,
} from "semantic-ui-react";
import ApiManager from "../../modules/ApiManager";
const ApplicationAddForm = (props) => {
    const [newApplication, setNewApplication] = useState({
        company: "",
        position: "",
        seeker_id: props.user.id
    })

   

  const handleFieldChange = (e) => {
    const stateToChange = { ...newApplication };
    stateToChange[e.target.id] = e.target.value;
    setNewApplication(stateToChange);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newApplicationCreds = {
      applicationDate: newApplication.applicationDate,
      company: newApplication.company, 
      position: newApplication.position,
      seeker_id: props.user.id
    };
   
       ApiManager.addApplication(newApplicationCreds, props.token)
       .then(() => props.history.push("/applications"))
  };
  
  return (
    <>
      <>
        <div classdate="addForm">
          <Grid textAlign="center" style={{ height: "100vh" }}>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Form size="large">
                Application Date:
              <Form.Input 
                id="applicationDate"
                type="date"
                
                onChange={handleFieldChange}
                required/>
            
                Company:
                <Form.Input
                  fluid
                  id="company"
                  onChange={handleFieldChange}
                  required
                />
                Position: 
                <Form.Input
                  fluid
                  id="position"
                  onChange={handleFieldChange}
                  required
                /> 
                <Button onClick={handleSubmit} fluid size="large">
                  Submit
                </Button>
              </Form>
            </Grid.Column>
          </Grid>
        </div>
      </>
    </>
  );
};

export default ApplicationAddForm;
