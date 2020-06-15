import React, {useState} from "react"
import {
    Button,
    Form,
    Grid,
  } from "semantic-ui-react";
import ApiManager from "../../../modules/ApiManager"
const CompanyAddForm = (props) => {
    const [newCompany, setNewCompany] = useState({
        name: "", 
        city: "", 
        state: "", 
        industry: "",
        seeker_id: props.user.user_id
    })
    const handleFieldChange = (e) => {
        const stateToChange  = {...newCompany}
        stateToChange[e.target.id] = e.target.value 
        setNewCompany(stateToChange)
    }
    const handleSubmit = (e) => {
       e.preventDefault()
       const newCompanyCreds = {
           name: newCompany.name,
           industry: newCompany.industry,
           city: newCompany.city,
           state: newCompany.state, 
           seeker_id: props.user.user_id
       }
       ApiManager.addCompany(newCompanyCreds, props.token)
       .then(() => props.history.push("/network"))
    }

    return (
        <>
         <>
      <div className="addForm">
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size="large">
                Company name:
                <Form.Input
                  fluid
                  id="name"
                  onChange={handleFieldChange}
                  required
                />
                Industry:
                <Form.Input
                  fluid   
                  id="industry"         
                  onChange={handleFieldChange}
                  required
                />
                City:
                <Form.Input
                  fluid   
                  id="city"         
                  onChange={handleFieldChange}
                  required
                />
                State:
                <Form.Input
                  fluid   
                  id="state"         
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
    )
}

export default CompanyAddForm