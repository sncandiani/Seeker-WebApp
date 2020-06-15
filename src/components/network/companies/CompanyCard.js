import React from "react"
import { Button, Icon } from "semantic-ui-react";
const CompanyCard = (props) => {
    
// Each company card lists basic information about the company
// When the user clicks on the view details button, they can navigate
// to a page with more information which allows them to 
// update and delete the company
    return (
        <>
        <h1>{props.company.name}</h1>
        <h4>{props.company.industry}</h4>
        <Button onClick={() => props.history.push(`/network/companies/${props.company.id}`)}>View details</Button>
        </>
    )
}
export default CompanyCard