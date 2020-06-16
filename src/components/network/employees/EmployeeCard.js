import React from "react";
import {
    Button,
    Icon
  } from "semantic-ui-react";
const EmployeeCard = (props) => {
  return (
    <>
      <p>
        {props.employee.firstName} {props.employee.lastName}
      </p>
      <p>{props.employee.position}</p>
      <Button
        icon
        onClick={() =>
          props.history.push(`/companies/employee/${props.employee.id}/edit`)
        }
      >
        <Icon name="edit" />
      </Button>
      <Button icon >
        <Icon name="delete" />
      </Button>
    </>
  );
};

export default EmployeeCard;
