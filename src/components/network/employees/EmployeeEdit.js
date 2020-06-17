import React, {useState, useEffect} from "react"
import { Button, Icon, Form, Grid } from "semantic-ui-react";
import ApiManager from "../../../modules/ApiManager"

const EmployeeEdit = (props) => {
    const [employee, setEmployee] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault()
        const editedEmployee = {
            id: props.match.params.employeeId,
            company_id: props.match.params.companyId, 
            firstName: employee.firstName, 
            lastName: employee.lastName, 
            position: employee.position, 
            notes: employee.notes 
        }
        ApiManager.updateEmployee(editedEmployee, props.token)
        .then(() => props.history.push(`/network/companies/${props.match.params.companyId}`))
    }
  
    const handleFieldChange = (e) => {
        e.preventDefault()
        const stateToChange = {...employee}
        stateToChange[e.target.id] = e.target.value
        setEmployee(stateToChange)
    }

    const retrieveEmployee = () => {
        ApiManager.retrieveEmployee(props.match.params.employeeId).then((specificEmployee) => {
          setEmployee({
            id: specificEmployee.id,
            company_id: props.match.params.companyId,
            firstName: specificEmployee.firstName,
            lastName: specificEmployee.lastName,
            position: specificEmployee.position,
            notes: specificEmployee.notes
          });
        });
      };

      useEffect(() => {
        retrieveEmployee();
      }, [])
    return ( 
        <>
         <div className="updateForm">
        <Grid
          textAlign="center"
        //   style={{ height: "100vh" }}
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size="large">
                First Name:
                <Form.Input
                  fluid
                  id="firstName"
                  value={employee.firstName}
                  onChange={handleFieldChange} 
                  required
                />
                Last Name:
                <Form.Input
                  fluid   
                  id="lastName" 
                  value={employee.lastName} 
                  onChange={handleFieldChange}        
                  required
                />
                Position:
                <Form.Input
                  fluid   
                  id="position" 
                  value={employee.position} 
                  onChange={handleFieldChange}        
                  required
                />
                Notes:
                <Form.Input
                  fluid   
                  id="notes" 
                  value={employee.notes}  
                  onChange={handleFieldChange}      
                  required
                />

                <Button onClick={handleSubmit}  fluid size="large">
                  Submit
                </Button>
            </Form>
          </Grid.Column>
        </Grid>
      </div>   
        
        </>
    )

}
export default EmployeeEdit