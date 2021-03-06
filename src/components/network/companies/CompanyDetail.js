import React, { useState, useEffect } from "react";
import { Button, Icon, Form, Grid } from "semantic-ui-react";
import ApiManager from "../../../modules/ApiManager";
import EmployeeCard from "../employees/EmployeeCard"
const CompanyDetail = (props) => {
  const [company, setCompany] = useState({});
  const [employees, setEmployees] = useState([]);
  const [isContacted, setIsContacted] = useState(false)
  const companyEmployees = []
  //   Retrieves information on the specific company and sets the state
  const retrieveCompany = () => {
    ApiManager.retrieveCompany(props.companyId).then((specificCompany) => {
    
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
// Gets employees associated with the company
  const getEmployees = () => {
      ApiManager.getEmployees(props.token)
      .then((employees) => {
          employees.forEach(employee => {
              if(employee.company_id == props.match.params.companyId) {
                companyEmployees.push(employee)
              }
          })
          setEmployees(companyEmployees)
      })
  }

  const handleDelete = () => {
    const confirm = window.confirm(
      `Are you sure you would like to delete ${company.name} and all its employees?`
    );
    if (confirm) {
    //   When a company is deleted, all associated employees will be soft deleted as well
      ApiManager.deleteCompany(company.id)
      .then(() => {
          employees.forEach(employee => {
              ApiManager.deleteEmployee(employee.id, props.token)
          })
      })
      .then(() =>
        props.history.push("/network")
      );
    }
  };

  useEffect(() => {
    retrieveCompany();
    getEmployees()
  }, []);

  return (
    <>
    <div className="detail">
      <p className="name">{company.name}</p>
      <p className="industry">
        {company.city}, {company.state}
      </p>
      <p className="industry">{company.industry}</p>
      {company.notes ? <p className="notes">{company.notes}</p> : <p></p>}
      <div className="buttons">
      <Button
      
        icon
        onClick={() =>
          props.history.push(`/network/companies/${company.id}/edit`)
        }
      >
        <Icon name="edit" />
      </Button>
      <Button icon onClick={handleDelete}>
        <Icon name="delete" />
      </Button>
      </div>
      <div className="header">
      <p className="welcome3">Employees</p>
        <Button
          icon
          onClick={() => props.history.push(`/companies/${company.id}/employee/form`)}
        >
          <Icon name="plus" />
        </Button>
        </div>
      <div className="cards">
          
        
          {employees.map((employee) => (
              <EmployeeCard key={employee.id} token={props.token}employee={employee} isContacted={isContacted} companyId={company.id} setIsContacted={setIsContacted} getEmployees={getEmployees}{...props} />
          ))}
            
           
      </div>
      </div>
    </>
  );
};

export default CompanyDetail;
