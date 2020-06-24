import React from "react"
const ApplicationCard = (props) => {
    return ( 
        <>
        <p>Application Card!</p>
        {props.application.position}
        </>
    )
}

export default ApplicationCard