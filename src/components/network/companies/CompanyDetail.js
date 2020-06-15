import React, { useState, useEffect } from "react";
import { Button, Icon } from "semantic-ui-react";
import ApiManager from "../../../modules/ApiManager";
const CompanyDetail = (props) => {
  const [company, setCompany] = useState({});
//   Retrieves information on the specific company and sets the state
  const retrieveCompany = () => {
    ApiManager.retrieveCompany(props.companyId).then((specificCompany) => {
      console.log(specificCompany);
      setCompany({ 
        id: specificCompany.id,
        name: specificCompany.name,
        city: specificCompany.city,
        industry: specificCompany.industry,
        state: specificCompany.state,
        notes: specificCompany.notes,
      });
    });
  };

  const handleDelete = () => {
      const confirm = window.confirm(
          `Are you sure you would like to delete ${company.name} and all its employees?`
      )
      if(confirm) {
        //   !!! TO UPDATE !!!
        // Delete all associated employees
       ApiManager.deleteCompany(company.id)
      .then(() => props.history.push("/network"))
      } 
      
  }
  useEffect(() => {
    retrieveCompany();
  }, []);

  return (
    <>
      <p>{company.name}</p>
      <p>
        {company.city}, {company.state}
      </p>
      <p>{company.industry}</p>
      {company.notes ? <p>{company.notes}</p> : <p></p>}
      <Button icon onClick={handleDelete}><Icon name="delete"/></Button>
    </>
  );
};

export default CompanyDetail;
