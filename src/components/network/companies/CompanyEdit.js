import React, {useState, useEffect} from "react"
import { Button, Icon, Form, Grid } from "semantic-ui-react";
import ApiManager from "../../../modules/ApiManager"

const CompanyEdit = (props) => {
    const [company, setCompany] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault()
        const editedCompany = {
            id: props.match.params.companyId,
            seeker_id: props.user.id, 
            name: company.name, 
            city: company.city, 
            state: company.state, 
            industry: company.industry, 
            notes: company.notes 
        }
        ApiManager.updateCompany(editedCompany, props.token)
        .then(() => props.history.push(`/network/companies/${props.match.params.companyId}`))
    }
  
    const handleFieldChange = (e) => {
        e.preventDefault()
        const stateToChange = {...company}
        stateToChange[e.target.id] = e.target.value
        setCompany(stateToChange)
    }

    const retrieveCompany = () => {
        ApiManager.retrieveCompany(props.match.params.companyId).then((specificCompany) => {
          console.log(specificCompany);
          setCompany({
            id: specificCompany.id,
            name: specificCompany.name,
            city: specificCompany.city,
            industry: specificCompany.industry,
            state: specificCompany.state,
            notes: specificCompany.notes,
          });
        });
      };

      useEffect(() => {
        retrieveCompany();
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
                Name:
                <Form.Input
                  fluid
                  id="name"
                  value={company.name}
                  onChange={handleFieldChange} 
                  required
                />
                City:
                <Form.Input
                  fluid   
                  id="city" 
                  value={company.city} 
                  onChange={handleFieldChange}        
                  required
                />
                State:
                <Form.Input
                  fluid   
                  id="state" 
                  value={company.state} 
                  onChange={handleFieldChange}        
                  required
                />
                Industry:
                <Form.Input
                  fluid   
                  id="industry" 
                  value={company.industry}   
                  onChange={handleFieldChange}      
                  required
                />
                Notes:
                <Form.Input
                  fluid   
                  id="notes" 
                  value={company.notes}  
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
export default CompanyEdit