import React, { useState, useEffect } from "react";
import { Button, Icon } from "semantic-ui-react";
import CompanyCard from "./CompanyCard";
import ApiManager from "../../../modules/ApiManager";
const CompanyList = (props) => {
  const [companies, setCompanies] = useState([]);
  const usersCompanies = [];
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

  useEffect(() => {
    getCompanies();
  }, []);
  return (
    <>
      <div className="header">
        <p className="welcome2">Companies</p>
        <Button
        className="add"
          icon
          onClick={() => props.history.push("/network/company/form")}
        >
          <Icon name="plus" />
        </Button>
      </div>
      
      <div className="cards">
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} {...props} />
      ))}
      </div>
    </>
  );
};
export default CompanyList;
