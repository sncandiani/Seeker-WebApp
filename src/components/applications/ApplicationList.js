import React, {useState, useEffect}from "react"
import {Button, Icon} from "semantic-ui-react"
import ApiManager from "../../modules/ApiManager"
import ApplicationCard from "../applications/ApplicationCard"
const ApplicationList = (props) => {
    const [applications, setApplications] = useState([])
    
    const getApplications = () => {
        ApiManager.getApplications(props.token)
        .then((applications) => {
            setApplications(applications)
        })
    }
    useEffect(() => {
        getApplications()
    }, [])
    return (
        <>
        <div className="header">
        <p className="welcome2">Applications</p>
        <Button className="add" icon onClick={() => props.history.push("/applications/form")}><Icon name="plus"/></Button>
        </div>
        <div className="applicationCards">
        {applications ? 
        <>
        {applications.map((application) => (
        <ApplicationCard key={application.id} application={application} getApplications={getApplications} token={props.token} {...props} />
      ))}
        </>
         : 
         <p>No applications</p>}
      
      </div>
        </>
    )

}

export default ApplicationList