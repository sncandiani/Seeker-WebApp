import React from "react"

const InterviewCard = (props) => {
    return ( 
        <>
        <p>{props.interview.interviewDate}</p>
        <p>{props.interview.notes}</p>
        </>
    )
}

export default InterviewCard