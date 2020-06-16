import React, { useState, useEffect } from "react";
import { Button, Icon, Form, Grid } from "semantic-ui-react";
import ApiManager from "../../../modules/ApiManager";
import EmployeeCard from "../employees/EmployeeCard"
const CompanyDetail = (props) => {
  const [company, setCompany] = useState({});
  const [employees, setEmployees] = useState([]);
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
      //   !!! TO UPDATE !!!
      // Delete all associated employees
      ApiManager.deleteCompany(company.id).then(() =>
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
      <p>{company.name}</p>
      <p>
        {company.city}, {company.state}
      </p>
      <p>{company.industry}</p>
      {company.notes ? <p>{company.notes}</p> : <p></p>}
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
      <h1>Employees</h1>
        <Button
          icon
          onClick={() => props.history.push(`/companies/${company.id}/employee/form`)}
        >
          <Icon name="plus" />
        </Button>
      <div className="employeeCards">
        {employees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} {...props} />
        ))}
      </div>
    </>
  );
};

export default CompanyDetail;
