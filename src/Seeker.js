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
import CompanyList from "./components/network/companies/CompanyList";
import CompanyAddForm from "./components/network/companies/CompanyAddForm";
import CompanyDetail from "./components/network/companies/CompanyDetail";
import CompanyEdit from "./components/network/companies/CompanyEdit";
import EmployeeAddForm from "./components/network/employees/EmployeeAddForm"
import EmployeeEdit from "./components/network/employees/EmployeeEdit"

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
          user == "" ? (
            <Loading />
          ) : (
            <>
              <SeekerNav loggedIn={loggedIn} user={user} />{" "}
              <Dashboard user={user} />
            </>
          )
        }
      />
      <Route
        exact
        path="/network"
        render={(props) =>
          user == "" ? (
            <Loading />
          ) : (
            <>
              <SeekerNav loggedIn={loggedIn} user={user} />{" "}
              <CompanyList user={user} {...props} token={token} />
            </>
          )
        }
      />
      <Route
        exact
        path="/network/company/form"
        render={(props) =>
          user == "" ? (
            <Loading />
          ) : (
            <>
              <SeekerNav loggedIn={loggedIn} user={user} />{" "}
              <CompanyAddForm {...props} user={user} token={token} />
            </>
          )
        }
      />
      <Route
        exact
        path="/network/companies/:companyId(\d+)/"
        render={(props) =>
          user == "" ? (
            <Loading />
          ) : (
            <>
              <SeekerNav loggedIn={loggedIn} user={user} />{" "}
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
          user == "" ? (
            <Loading />
          ) : (
            <>
              <SeekerNav loggedIn={loggedIn} user={user} />{" "}
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
          user == "" ? (
            <Loading />
          ) : (
            <>
              <SeekerNav loggedIn={loggedIn} user={user} />{" "}
              <EmployeeAddForm {...props} user={user} token={token} companyId={parseInt(props.match.params.companyId)} />
            </>
          )
        }
      />

<Route
        exact
        path="/companies/:companyId(\d+)/employees/:employeeId(\d+)/edit/"
        render={(props) =>
          user == "" ? (
            <Loading />
          ) : (
            <>
              <SeekerNav loggedIn={loggedIn} user={user} />{" "}
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


    </>
  );
};

export default Seeker;
