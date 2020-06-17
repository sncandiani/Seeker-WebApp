import React, {useState} from "react"
import {
    Button,
    Form,
    Grid,
  } from "semantic-ui-react";
import ApiManager from "../../../modules/ApiManager"
const EmployeeAddForm = (props) => {
    const [newEmployee, setNewEmployee] = useState({
        firstName: "", 
        lastName: "",
        position: "",
        company_id: parseInt(props.match.params.companyId), 
        isContacted: false
    })
    const handleFieldChange = (e) => {
        const stateToChange  = {...newEmployee}
        stateToChange[e.target.id] = e.target.value 
        setNewEmployee(stateToChange)
    }
    const handleSubmit = (e) => {
       e.preventDefault()
       const newEmployeeCreds = {
           firstName: newEmployee.firstName,
           lastName: newEmployee.lastName, 
           position: newEmployee.position,
           company_id: parseInt(props.match.params.companyId), 
           isContacted: false
       }
       ApiManager.addEmployee(newEmployeeCreds, props.token)
       .then(() => props.history.push(`/network/companies/${props.match.params.companyId}`))
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
                First Name:
                <Form.Input
                  fluid
                  id="firstName"
                  onChange={handleFieldChange}
                  required
                />
                Last Name:
                <Form.Input
                  fluid   
                  id="lastName"         
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
    )
}

export default EmployeeAddForm