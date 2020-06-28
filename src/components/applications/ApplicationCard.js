import React, { useState, useEffect } from "react"
import {Button, Icon} from "semantic-ui-react"
import moment from "moment";
import ApiManager from "../../modules/ApiManager"
const ApplicationCard = (props) => {
    const handleDelete = () => {
        ApiManager.deleteApplication(props.application.id)
        .then(() => {
            props.getApplications()
        })
    }

    // const [daysSince, setDaysSince] = useState()
    // const getDaysApplied = () => {
    //   const today = moment().format("MM/D/YYYY")
    //   const appDate = props.application.applicationDate.split("T")[0]
    //   const splitDate = appDate.split("-") 
    //   const newDate = `${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`

    //   const diffTime = Math.abs(today - newDate);
    //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    //   console.log(diffTime)
      
    // }
    // useEffect(() => {
    //     getDaysApplied()
    // }, [])
    return ( 
       
        <>
        <div className="card3"> 
        <p>{props.application.company}</p>
        <p>{props.application.position}</p>
         <Button icon onClick={() => props.history.push(`/applications/${props.application.id}/edit`)}><Icon name="edit" /></Button>
        <Button icon onClick={handleDelete}>
        <Icon name="delete" />
      </Button>
      </div>
        </>
    )
}

export default ApplicationCard