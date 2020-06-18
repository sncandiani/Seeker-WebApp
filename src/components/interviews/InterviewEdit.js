import React, { useState, useEffect } from "react";
import { Button, Icon, Form, Grid } from "semantic-ui-react";
import ApiManager from "../../modules/ApiManager";

const InterviewEdit = (props) => {
  const [interview, setInterview] = useState({});
  const [interviewTypes, setInterviewTypes] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState([])
  const [employees, setEmployees] = useState([]);
  const [companyEmployees, setCompanyEmployees] = useState([])

    const getEmployees = () => {
        ApiManager.getEmployees(props.token)
        .then((employees) => {
          setEmployees(employees)
        })
    }


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
  const handleSubmit = (e) => {
    e.preventDefault();

    const editedInterview = {
      id: parseInt(props.match.params.interviewId),
      interviewDate: interview.interviewDate,
      notes: interview.notes,
      company_id: parseInt(interview.company),
      interviewType_id: parseInt(interview.interviewType),
      employee_id: parseInt(interview.employee)
    };
    
    ApiManager.updateInterview(editedInterview, props.token).then(() =>
      props.history.push(`/interviews`)
    );
  };

  const handleFieldChange = (e) => {
    e.preventDefault();
    const stateToChange = { ...interview };
    stateToChange[e.target.id] = e.target.value;
    setInterview(stateToChange);
  };
  
  const retrieveinterview = () => {
    ApiManager.retrieveInterview(props.match.params.interviewId).then(
      (specificInterview) => {
        setInterview({
          id: specificInterview.id,
          interviewDate: specificInterview.interviewDate,
          notes: specificInterview.notes,
          company: specificInterview.company_id,
          interviewType: specificInterview.interviewType_id,
          employee: specificInterview.employee,
        });
      }
    );
  };

  useEffect(() => {
    retrieveinterview();
    getInterviewTypes();
    getCompanies();
    getEmployees();
  }, []);

  useEffect(() => {
    const filteredEmployees = employees.filter((employee) => employee.company_id == parseInt(interview.company))
    setCompanyEmployees(filteredEmployees)
  }, [interview.company])


 
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
              <select
                className="select"
                id="interviewType"
                value={interview.interviewType_id}
                onChange={handleFieldChange}
              >
                {interviewTypes.map((interviewType) => (
                  <option key={interviewType.id} value={interviewType.id}>
                    {interviewType.name}
                  </option>
                ))}
              </select>
              <select
                className="select"
                id="company"
                value={interview.company_id}
                onChange={handleFieldChange}
              >
                {companies.map((company) => (  
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option> 
                ))}
              </select>
              <select
                className="select"
                id="company"
                // value={interview.company_id}
                onChange={handleFieldChange}
              >
                {companyEmployees.map((employee) => (  
                    <option key={employee.id} value={employee.id}>
                      {employee.name}
                    </option> 
                ))}
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
