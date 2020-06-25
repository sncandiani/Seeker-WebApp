import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import Home from "../src/components/home/Home";
import Login from "../src/components/auth/Login";
import Loading from "../src/components/Loading";
import SeekerNav from "../src/components/nav/Navbar";
import Register from "../src/components/auth/Register";
import Dashboard from "../src/components/home/Dashboard";
import "./css/Seeker.css";
import "semantic-ui-css/semantic.min.css";
import AuthApiManager from "../src/modules/auth/AuthApiManager";
// Companies
import CompanyList from "./components/network/companies/CompanyList";
import CompanyAddForm from "./components/network/companies/CompanyAddForm";
import CompanyDetail from "./components/network/companies/CompanyDetail";
import CompanyEdit from "./components/network/companies/CompanyEdit";
// Employees
import EmployeeAddForm from "./components/network/employees/EmployeeAddForm"
import EmployeeEdit from "./components/network/employees/EmployeeEdit"
// Interviews
import InterviewList from "./components/interviews/InterviewList"
import InterviewAddForm from "./components/interviews/InterviewAddForm"
import InterviewEdit from "./components/interviews/InterviewEdit"
// Applications
import ApplicationList from "./components/applications/ApplicationList"
import ApplicationAddForm from "./components/applications/ApplicationAddForm"
import ApplicationEdit from "./components/applications/ApplicationEdit"

// Seeker holds all routing
const Seeker = (props) => {
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const token = sessionStorage.getItem("token");
  const seekerId = sessionStorage.getItem("seekerId");



  const findUser = () => {
    AuthApiManager.getUser(seekerId).then((response) => {
      setUser(response);
    });
  };

  const tokenCheck = () => {
    if (token) {
      setIsLoggedIn(true);
    }
  };
  useEffect(() => {
    tokenCheck();
    findUser();
  }, []);
  // Routing with multiple ternary operators 
  // In order to avoid users routing to pages without logging in

  return (
    <>
      <Route
        exact
        path="/"
        render={(props) => (
          <>
            <SeekerNav loggedIn={loggedIn} /> <Home />
          </>
        )}
      />

      <Route
        exact
        path="/login"
        render={(props) => <Login {...props} setUser={setUser} />}
      />

      <Route
        exact
        path="/register"
        render={(props) => <Register {...props} setUser={setUser} />}
      />
      <Route
        exact
        path="/dashboard"
        render={(props) =>
          user == ""   ? (
            <Loading />
          ) 
          : (
            <>
              <SeekerNav loggedIn={loggedIn} user={user} />
              <Dashboard user={user} token={token} />
            </>
          )
        }
      />
      <Route
        exact
        path="/network"
        render={(props) =>
          user == "" && !token ? (
            props.history.push("/login")
          ) 
          : user == "" ? <Loading />
          : (
            <>
              <SeekerNav loggedIn={loggedIn} user={user} />
              <CompanyList user={user} {...props} token={token} />
            </>
          )
        }
      />
      <Route
        exact
        path="/network/company/form"
        render={(props) =>
          user == ""  && !token ? (
            props.history.push("/login")
          ) 
          : user == "" ? <Loading />
          : (
            <>
              <SeekerNav loggedIn={loggedIn} user={user} />
              <CompanyAddForm {...props} user={user} token={token} />
            </>
          )
        }
      />
      <Route
        exact
        path="/network/companies/:companyId(\d+)/"
        render={(props) =>
          user == "" && !token ? (
            props.history.push("/login")
          ) 
          : user == "" ? <Loading />
          : (
            <>
              <SeekerNav loggedIn={loggedIn} user={user} />
              <CompanyDetail
                {...props}
                user={user}
                token={token}
                companyId={parseInt(props.match.params.companyId)}
              />
            </>
          )
        }
      />

<Route
        exact
        path="/network/companies/:companyId(\d+)/edit"
        render={(props) =>
          user == "" && !token ? (
            props.history.push("/login")
          )
          : user == "" ? <Loading /> 
          : (
            <>
              <SeekerNav loggedIn={loggedIn} user={user} />
              <CompanyEdit
                {...props}
                user={user}
                token={token}
                companyId={parseInt(props.match.params.companyId)}
              />
            </>
          )
        }
      />
      <Route
        exact
        path="/companies/:companyId(\d+)/employee/form"
        render={(props) =>
          user == ""  && !token? (
            props.history.push("/login")
          ) 
          : user == "" ? <Loading /> 
          : (
            <>
              <SeekerNav loggedIn={loggedIn} user={user} />
              <EmployeeAddForm {...props} user={user} token={token} companyId={parseInt(props.match.params.companyId)} />
            </>
          )
        }
      />

<Route
        exact
        path="/companies/:companyId(\d+)/employees/:employeeId(\d+)/edit/"
        render={(props) =>
          user == "" && !token ? (
            props.history.push("/login")
          ) 
          : user == "" ? <Loading /> 
          : (
            <>
              <SeekerNav loggedIn={loggedIn} user={user} />
              <EmployeeEdit
                {...props}
                user={user}
                token={token}
                companyId={parseInt(props.match.params.companyId)}
                employeeId={parseInt(props.match.params.employeeId)}
              />
            </>
          )
        }
      />
<Route
        exact
        path="/interviews"
        render={(props) =>
          user == ""  && !token ? (
            props.history.push("/login")
          ) 
          : user == "" ? <Loading /> 
          : (
            <>
              <SeekerNav loggedIn={loggedIn} user={user} />
              <InterviewList user={user} token={token} {...props} />
            </>
          )
        }
      />
      <Route
        exact
        path="/interviews/form"
        render={(props) =>
          user == ""  && !token ? (
            props.history.push("/login")
          ) 
          : user == "" ? <Loading /> 
          : (
            <>
              <SeekerNav loggedIn={loggedIn} user={user} />
              <InterviewAddForm user={user} token={token} {...props} />
            </>
          )
        }
      />
      <Route
        exact
        path="/interviews/:interviewId(\d+)/edit"
        render={(props) =>
          user == "" && !token ? (
            props.history.push("/login")
          )
          : user == "" ? <Loading /> 
          : (
            <>
              <SeekerNav loggedIn={loggedIn} user={user} />
              <InterviewEdit
                {...props}
                user={user}
                token={token}
                interviewId={parseInt(props.match.params.interviewId)}
              />
            </>
          )
        }
      />
      <Route
        exact
        path="/applications"
        render={(props) =>
          user == "" && !token ? (
            props.history.push("/login")
          ) 
          : user == "" ? <Loading />
          : (
            <>
              <SeekerNav loggedIn={loggedIn} user={user} />
              <ApplicationList user={user} {...props} token={token} />
            </>
          )
        }
      />
      <Route
        exact
        path="/applications/form"
        render={(props) =>
          user == ""  && !token ? (
            props.history.push("/login")
          ) 
          : user == "" ? <Loading />
          : (
            <>
              <SeekerNav loggedIn={loggedIn} user={user} />
              <ApplicationAddForm {...props} user={user} token={token} />
            </>
          )
        }
      />
      <Route
        exact
        path="/applications/:applicationId(\d+)/edit"
        render={(props) =>
          user == "" && !token ? (
            props.history.push("/login")
          )
          : user == "" ? <Loading /> 
          : (
            <>
              <SeekerNav loggedIn={loggedIn} user={user} />
              <ApplicationEdit
                {...props}
                user={user}
                token={token}
                applicationId={parseInt(props.match.params.applicationId)}
              />
            </>
          )
        }
      />

    </>
  );
};

export default Seeker;
