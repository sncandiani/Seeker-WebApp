import React from "react"
import { Button, Icon } from "semantic-ui-react";
const CompanyCard = (props) => {
    
// Each company card lists basic information about the company
// When the user clicks on the view details button, they can navigate
// to a page with more information which allows them to 
// update and delete the company
    return (
        <>
        <div className="card">
            <p className="name">{props.company.name}</p>
            <p className="industry">{props.company.industry}</p>
            <div className="btn">
            <Button onClick={() => props.history.push(`/network/companies/${props.company.id}`)}>View details</Button>
            </div>
        </div>
        </>
    )
}
export default CompanyCard