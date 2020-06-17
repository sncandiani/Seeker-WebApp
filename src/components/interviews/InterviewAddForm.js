import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Grid,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "semantic-ui-react";
import ApiManager from "../../modules/ApiManager";
const InterviewAddForm = (props) => {
  const [newInterview, setNewInterview] = useState({});
  const [interviewTypes, setInterviewTypes] = useState([]);
  const [selectedInterviewType, setSelectedInterviewType] = useState()
  const [selectedCompany, setSelectedCompany] = useState()
  const [companies, setCompanies] = useState([]);
  const usersCompanies = [];

  const getInterviewTypes = () => {
    ApiManager.getInterviewTypes(props.token).then((interviewTypes) => {
      setInterviewTypes(interviewTypes);
    });
  };
  // Once a company is selected, an employee can be selected

  const getCompanies = () => {
    ApiManager.getCompanies(props.token).then((companyList) => {
      companyList.forEach((company) => {
        if (company.seeker_id == props.user.id) {
          usersCompanies.push(company);
        }
      });
      setCompanies(usersCompanies);
    });
    
  };


  const handleInterviewType = (e) => {         
          setSelectedInterviewType(e.target.value)       
  }
  const handleCompany = (e) => {
      setSelectedCompany(e.target.value)   
  }

  
  const handleFieldChange = (e) => {
    console.log(e.target.value)
    const stateToChange = { ...newInterview };
    stateToChange[e.target.id] = e.target.value;
    setNewInterview(stateToChange);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newInterviewCreds = {
      interviewDate: newInterview.interviewDate,
      notes: newInterview.notes,
      company_id: parseInt(selectedCompany),
      interviewType_id: parseInt(selectedInterviewType),
      employee_id: newInterview.employee_id,
    };
    console.log(newInterviewCreds);
       ApiManager.addInterview(newInterviewCreds, props.token)
       .then(() => props.history.push("/interviews"))
  };
  
useEffect(() => {
    getCompanies();
    getInterviewTypes();
  }, []);


  return (
    <>
      <>
        <div classdate="addForm">
          <Grid textAlign="center" style={{ height: "100vh" }}>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Form size="large">
            
                <Form.Input 
                id="interviewDate"
                type="date"
                
                onChange={handleFieldChange}
                required/>
                Notes:
                <Form.Input
                  fluid
                  id="notes"
                  onChange={handleFieldChange}
                  required
                />
                <select
                className="select"
                id="interviewTypeList"
                onChange={handleInterviewType}
                >
                    <option value="">Interview Types</option>
                    {interviewTypes.map((interviewType) => {
                    return (
                        <option
                        key={interviewType.id}
                        value={interviewType.id}
                    >{interviewType.name}</option>
                    );
                })}
                </select>
                <select
                className="select"
                id="companyList"
                onChange={handleCompany}
                >
                    <option value="">Companies</option>
                    {companies.map((company) => {
                    return (
                        <option
                        key={company.id}
                        value={company.id}
                    >{company.name}</option>
                    );
                })}
                </select>
               
                
                <Button onClick={handleSubmit} fluid size="large">
                  Submit
                </Button>
              </Form>
            </Grid.Column>
          </Grid>
        </div>
      </>
    </>
  );
};

export default InterviewAddForm;
