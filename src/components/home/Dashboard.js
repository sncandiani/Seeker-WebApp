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

  const getWeeksInterviews = () => {
    // Relative every time, the weeks interviews is the current day the upcoming entire week
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(moment().add(i, "days").format().split("T")[0]);
    }
    // Get only the interviews which have a date that includes the date in the week
    ApiManager.getInterviews(props.token)
      .then((interviews) => {
        interviews.forEach((interview) => {
          const newDate = interview.interviewDate.split("T")[0];
          if (week.includes(newDate)) {
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
      <p className="dashboardtxt">Welcome, {user.username}!</p>
      <p className="dashboardtxt">This upcoming weeks summary </p>
      <p className="dashboardtxt">Your upcoming interviews:</p>
      {weekInterviews ? (
        <ul>
          {weekInterviews.map((interview) => (
            <li>{interview.interviewDate.split("T")[0]} </li>
          ))}
        </ul>
      ) : (
        <h1>No Interviews</h1>
      )}
      <p className="dashboardtxt">Who to contact next:</p>
      {companyEmployees ? (
        <ul>
          {companyEmployees.map((employee) => (
            <li>{employee.firstName} {employee.lastName} </li>
          ))}
        </ul>
      ) 
      : (
        <h1>No one to contact</h1>
      )}

<p className="dashboardtxt">Companies to follow up with:</p>
{companyEmployees && interviewCompanies ? (
        <ul>
          {interviewCompanies.map((company) => (
            <li>{company.name} </li>
          ))}
        </ul>
      ) 
      : (
        <h1>No companies to follow up with</h1>
      )}
    </>
  );
};

export default Dashboard;
