import React from "react"
import {Button, Icon} from "semantic-ui-react"
import ApiManager from "../../modules/ApiManager"

const InterviewCard = (props) => {
    const handleDelete = () => {
        ApiManager.deleteInterview(props.interview.id)
        .then(() => {
            props.getInterviews()
        })
    }
    
    return ( 
        <>
        <p>{props.interview.interviewDate}</p>
        <p>{props.interview.notes}</p>
        <Button icon onClick={() => props.history.push(`/interviews/${props.interview.id}/edit`)}><Icon name="edit" /></Button>
        <Button icon onClick={handleDelete}>
        <Icon name="delete" />
      </Button>
      
        </>
    )
}

export default InterviewCard