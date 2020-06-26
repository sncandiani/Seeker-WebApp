import React, { useState, useEffect } from "react"
import {Button, Icon, Checkbox} from "semantic-ui-react"
import ApiManager from "../../modules/ApiManager"

const InterviewCard = (props) => {
    // The employee associated with the interview will appear 
    // Only if they exist 
    const[isFollowedUp, setIsFollowedUp] = useState(false)
    const[associatedEmployee, setAssociatedEmployee] = useState()
    const[associatedCompany, setAssociatedCompany] = useState()

    const handleDelete = () => {
        ApiManager.deleteInterview(props.interview.id)
        .then(() => {
            props.getInterviews()
        })
    }

    const retrieveAssociatedCompany = () => {
        ApiManager.retrieveCompany(props.interview.company_id, props.token)
        .then((company) => {
            setAssociatedCompany(company)
        })
    }
    const retrieveEmployee = () => {
        ApiManager.retrieveEmployee(props.interview.employee_id, props.token)
        .then((employee) => {
            setAssociatedEmployee(employee)
        })
    }
    const toggleChecked = () => {
        setIsFollowedUp(!isFollowedUp);
        associatedCompany.isFollowedUp = !isFollowedUp;
        ApiManager.updateCompanyFollowedUp(associatedCompany, props.token);
      };
    
    // Retrieves the associated employee on first render
    useEffect(() => {
        retrieveEmployee()
        retrieveAssociatedCompany()
    }, [])
    
    return ( 
        
        <div className="card3">
        <p>{props.interview.interviewDate.split("T")[0]}</p>
        <p className="notes">{props.interview.notes}</p>
    {associatedEmployee ? <p>{associatedEmployee.firstName} {associatedEmployee.lastName}</p> : <p>No employees</p>}
    {associatedCompany ? 
    <>
    <p>Followed up:</p> <Checkbox
    onChange={toggleChecked}
    checked={associatedCompany.isFollowedUp}
  /> </>
    : <p>No follow up</p>}
        <Button icon onClick={() => props.history.push(`/interviews/${props.interview.id}/edit`)}><Icon name="edit" /></Button>
        <Button icon onClick={handleDelete}>
        <Icon name="delete" />
      </Button>
      </div>
        
    )
}

export default InterviewCard