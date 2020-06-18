import React, { useState, useEffect } from "react"
import {Button, Icon} from "semantic-ui-react"
import ApiManager from "../../modules/ApiManager"

const InterviewCard = (props) => {
    // The employee associated with the interview will appear 
    // Only if they exist 
    const [associatedEmployee, setAssociatedEmployee] = useState()
    const handleDelete = () => {
        ApiManager.deleteInterview(props.interview.id)
        .then(() => {
            props.getInterviews()
        })
    }
    const retrieveEmployee = () => {
        ApiManager.retrieveEmployee(props.interview.employee_id, props.token)
        .then((employee) => {
            setAssociatedEmployee(employee)
        })
    }
    // Retrieves the associated employee on first render
    useEffect(() => {
        retrieveEmployee()
    }, [])
    
    return ( 
        <>
        <p>{props.interview.interviewDate}</p>
        <p>{props.interview.notes}</p>
    {associatedEmployee ? <p>{associatedEmployee.firstName} {associatedEmployee.lastName}</p> : <p>No employees</p>}
        <Button icon onClick={() => props.history.push(`/interviews/${props.interview.id}/edit`)}><Icon name="edit" /></Button>
        <Button icon onClick={handleDelete}>
        <Icon name="delete" />
      </Button>
      
        </>
    )
}

export default InterviewCard