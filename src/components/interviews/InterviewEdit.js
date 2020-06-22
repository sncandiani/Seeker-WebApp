import React, { useState, useEffect } from "react";
import { Button, Icon, Form, Grid } from "semantic-ui-react";
import ApiManager from "../../modules/ApiManager";

const InterviewEdit = (props) => {
  const [interview, setInterview] = useState({});
  const [interviewTypes, setInterviewTypes] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [companyEmployees, setCompanyEmployees] = useState([]);

  const getEmployees = () => {
    ApiManager.getEmployees(props.token).then((employees) => {
      setAllEmployees(employees);
    });
  };

  const getInterviewTypes = () => {
    ApiManager.getInterviewTypes(props.token).then((interviewTypes) => {
      setInterviewTypes(interviewTypes);
    });
  };
  const getCompanies = () => {
    ApiManager.getCompanies(props.token).then((companies) => {
      setCompanies(companies);
    });
  };

  // On initial render, the information from the interview retrieved
  // Will filter throught the list of all employees
  // Then, only the employees whose company id is associated with the interview
  // Will display on first render
  const retrieveInterview = () => {
    ApiManager.retrieveInterview(props.match.params.interviewId).then(
      (specificInterview) => {
        setInterview({
          id: specificInterview.id,
          interviewDate: specificInterview.interviewDate,
          notes: specificInterview.notes,
          company: specificInterview.company_id,
          interviewType: specificInterview.interviewType_id,
          employee: specificInterview.employee_id,
        });
        ApiManager.getEmployees(props.token).then((employees) => {
          const firstFilterEmployees = employees.filter(
            (employee) => employee.company_id == specificInterview.company_id
          );
          setCompanyEmployees(firstFilterEmployees);
        });
      }
    );
  };

  // All renders thereafter will be filtered based on the chosen interview
  const filterEmployees = () => {
    const filteredEmployees = allEmployees.filter(
      (employee) => employee.company_id == parseInt(interview.company)
    );
    setCompanyEmployees(filteredEmployees);
  };
  // Each time the length of the filtered list changes, the selected employee does as well
  const selectEmployeeConditional = () => {
    if (companyEmployees.length == 0) {
      setSelectedEmployee(0);
    } else if (companyEmployees.length == 1) {
      setSelectedEmployee(companyEmployees[0].id);
    } else { 
      setSelectedEmployee(companyEmployees[0].id);
    }
  };
  
  const handleSubmit = (e) => {
    // debugger
    e.preventDefault();
    if(parseInt(selectedEmployee) === 0) {
      const editedInterview = {
        id: parseInt(props.match.params.interviewId),
        interviewDate: interview.interviewDate,
        notes: interview.notes,
        company_id: parseInt(interview.company),
        interviewType_id: parseInt(interview.interviewType)
      };
      console.log("EDITED INTERVIEW HERE")
      console.log(editedInterview)
      ApiManager.updateInterview(editedInterview, props.token)
      .then(() =>
        props.history.push(`/interviews`)
      );
    } else {

      const editedInterview = {
        id: parseInt(props.match.params.interviewId),
        interviewDate: interview.interviewDate,
        notes: interview.notes,
        company_id: parseInt(interview.company),
        interviewType_id: parseInt(interview.interviewType),
        employee_id: parseInt(selectedEmployee),
      };
      console.log("EDITED INTERVIEW HERE!!!!!!")
      console.log(editedInterview)
      ApiManager.updateInterview(editedInterview, props.token)
      .then(() =>
        props.history.push(`/interviews`)
      );
    }
    
   
  };

  const handleFieldChange = (e) => {
    e.preventDefault();

    const stateToChange = { ...interview };
    stateToChange[e.target.id] = e.target.value;
    setInterview(stateToChange); 

    setSelectedEmployee(e.target.value)
  };

  useEffect(() => {
    retrieveInterview();
    getInterviewTypes();
    getCompanies();
    getEmployees();
    setSelectedEmployee(interview.employee);
  }, []);

  useEffect(() => {
    filterEmployees();
    
  }, [interview.company]);

  useEffect(() => {
    selectEmployeeConditional();
  }, [companyEmployees]);
  return (
    <>
      <div className="updateForm">
        <Grid
          textAlign="center"
          //   style={{ height: "100vh" }}
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size="large">
              Interview Date:
              <Form.Input
                fluid
                id="interviewDate"
                type="date"
                value={interview.interviewDate}
                onChange={handleFieldChange}
                required
              />
              Notes:
              <Form.Input
                fluid
                id="notes"
                value={interview.notes}
                onChange={handleFieldChange}
                required
              />
              Interview Types:
              <select
                className="select"
                id="interviewType"
                value={interview.interviewType}
                onChange={handleFieldChange}
              >
                {interviewTypes.map((interviewType) => (
                  <option key={interviewType.id} value={interviewType.id}>
                    {interviewType.name}
                  </option>
                ))}
              </select>
              Companies:
              <select
                className="select"
                id="company"
                value={interview.company}
                onChange={handleFieldChange}
              >
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
              Employees:
              <select
                className="select"
                id="selectedEmployee"
                value={selectedEmployee}
                onChange={handleFieldChange}
              >
                {companyEmployees.length == 0 ? (
                  <option value="0" >
                    No Employees
                  </option>
                ) : (
                  <>
                  <option value="0">Employee Unknown</option>
                 { companyEmployees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.firstName} {employee.lastName}
                    </option>
                  ))}
                  </>
                )}
              </select>
              <Button onClick={handleSubmit} fluid size="large">
                Submit
              </Button>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    </>
  );
};
export default InterviewEdit;
