import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import moment from "moment";

const Dashboard = (props) => {
  const user = props.user.user;

  const [weekInterviews, setWeekInterviews] = useState();
  const [interviewCompanies, setInterviewCompanies] = useState();
  const [companyEmployees, setCompanyEmployees] = useState();
  const [contactedCompanies, setContactedCompanies] = useState()
//   General retrieves
  const [companies, setCompanies] = useState();
  const [employees, setEmployees] = useState();
// Empty arrays for setting
  const interviewArr = [];
  const interviewCompanyArr = [];
  const employeeArr = [];
  const companyArr = [];
  const week = [];
  const [currentWeek, setCurrentWeek] = useState()
  const getWeeksInterviews = () => {
    // Relative every time, the weeks interviews is the current day the upcoming entire week
    
    for (let i = 0; i < 7; i++) {
      week.push(moment().add(i, "days").format().split("T")[0]);
      
    }
    setCurrentWeek(week)
    // Get only the interviews which have a date that includes the date in the week
    ApiManager.getInterviews(props.token)
      .then((interviews) => {
        interviews.forEach((interview) => {
          const newDate = interview.interviewDate
          if (week.includes(newDate.split("T")[0])) {
            interviewArr.push(interview);
          }
        });
      })
      .then(() => {
        setWeekInterviews(interviewArr);
      });
  };
// Get all companies which have not been followed up
  const getCompanies = () => {
    ApiManager.getCompanies(props.token).then((companies) => {
      companies.forEach((company) => {
          if(company.isFollowedUp === false || company.isFollowedUp === null) {
              companyArr.push(company)
          }
      })
      setCompanies(companyArr)
    });
  };
//   Get all employees
  const getEmployees = () => {
    ApiManager.getEmployees(props.token).then((employees) => {
      setEmployees(employees);
    });
  };
// Given a list of companies which have not been followed up
// Check if they are associated with the interviews for that week
  const getWeeksCompanies = () => {
    if (companies && weekInterviews) {
      companies.forEach((company) => {
        weekInterviews.forEach((interview) => {
          if (interview.company_id === company.id) {
            interviewCompanyArr.push(company);
          }
        });
      });
      setInterviewCompanies(interviewCompanyArr);
    }
  };
// If the interviews for that week exist and all employees have been retrieved 
// Checks through each array for the employee id and whether the isContacted is false or null
  const getCompanyEmployees = () => {
    if (weekInterviews && employees) {
      weekInterviews.forEach((interview) => {
        employees.forEach((employee) => {
          if (
            (interview.employee_id === employee.id &&
              employee.isContacted == false) ||
            (interview.employee_id === employee.id &&
              employee.isContacted == null)
          ) {
            employeeArr.push(employee);
          }
        });
      });
    }
    setCompanyEmployees(employeeArr)
  };

  useEffect(() => {
    getWeeksInterviews();
    getCompanies();
    getEmployees();
  }, []);

  useEffect(() => {
    getWeeksCompanies();
    getCompanyEmployees();
    
  }, [companies, weekInterviews, employees]);

  return (
    <>
    <div className="dash">
      <p className="welcome">Welcome, {user.username}!</p>
      <div>
      {currentWeek ? <p className="dashboardBigTxtSum">{currentWeek[0].split("2020-")[1]} to {currentWeek[6].split("2020-")[1]} </p> : <p></p>}
      <p className="dashboardBigTxtSum2">Current Week Summary </p>
    
      </div>
      <p className="dashboardBigTxt">Your upcoming interviews:</p>
      {weekInterviews ? (
        <ul>
          {weekInterviews.map((interview) => (
            <li className="item">{interview.interviewDate.split("T")[0]} </li>
          ))}
        </ul>
      ) : (
        <h1>No Interviews</h1>
      )}
      <p className="dashboardBigTxt">Who to contact next:</p>
      {companyEmployees ? (
        <ul>
          {companyEmployees.map((employee) => (
            <li className="item">{employee.firstName} {employee.lastName} </li>
          ))}
        </ul>
      ) 
      : (
        <h1>No one to contact</h1>
      )}

<p className="dashboardBigTxt">Companies to follow up with:</p>
{companyEmployees && interviewCompanies ? (
        <ul>
          {interviewCompanies.map((company) => (
            <li className="item">{company.name} </li>
          ))}
        </ul>
      ) 
      : (
        <h1>No companies to follow up with</h1>
      )}
      </div>
    </>
  );
};

export default Dashboard;
