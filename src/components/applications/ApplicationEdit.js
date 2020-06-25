import React, {useState, useEffect} from "react"
import { Button, Icon, Form, Grid } from "semantic-ui-react";
import ApiManager from "../../modules/ApiManager"

const ApplicationEdit = (props) => {
    const [application, setApplication] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault()
        const editedApplication = {
            id: props.match.params.applicationId,
            seeker_id: props.user.id, 
            applicationDate: application.applicationDate,
            company: application.company,
            position: application.position
        }
        ApiManager.updateApplication(editedApplication, props.token)
        .then(() => props.history.push(`/applications`))
    }
  
    const handleFieldChange = (e) => {
        e.preventDefault()
        const stateToChange = {...application}
        stateToChange[e.target.id] = e.target.value
        setApplication(stateToChange)
    }

    const retrieveApplication = () => {
        ApiManager.retrieveApplication(props.match.params.applicationId).then((specificApplication) => {
          setApplication({
            id: specificApplication.id,
            seeker_id: props.user.id, 
            applicationDate: specificApplication.applicationDate,
            company: specificApplication.company,
            position: specificApplication.position
          });
        });
      };

      useEffect(() => {
        retrieveApplication();
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
            Application Date:
              <Form.Input
                fluid
                id="applicationDate"
                type="date"
                value={application.applicationDate}
                onChange={handleFieldChange}
                required
              />
                Company:
                <Form.Input
                  fluid
                  id="company"
                  value={application.company}
                  onChange={handleFieldChange} 
                  required
                />
                Position:
                <Form.Input
                  fluid   
                  id="position" 
                  value={application.position} 
                  onChange={handleFieldChange}        
                  required
                />

                <Button type="button" onClick={handleSubmit}  fluid size="large">
                  Submit
                </Button>
            </Form>
          </Grid.Column>
        </Grid>
      </div>   
        
        </>
    )

}
export default ApplicationEdit