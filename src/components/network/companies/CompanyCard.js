import React from "react"
const CompanyCard = (props) => {
    return (
        <>
        <h1>{props.company.name}</h1>
        <h4>{props.company.industry}</h4>
        </>
    )
}
export default CompanyCard