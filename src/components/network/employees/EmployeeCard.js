import React, { useState, useEffect } from "react";
import { Button, Icon, Checkbox } from "semantic-ui-react";
import ApiManager from "../../../modules/ApiManager";
const EmployeeCard = (props) => {
  // Employee detailed information

  const handleDelete = () => {
    ApiManager.deleteEmployee(props.employee.id).then(() => {
      props.getEmployees();
    });
  };
  const toggleChecked = () => {
    // Toggles isContacted state
    props.setIsContacted(!props.isContacted);
    //    When isContacted toggles, the value of employee.isContacted changes
    props.employee.isContacted = !props.isContacted;
    //    Update API with state of Employee
    ApiManager.updateEmployeeContacted(props.employee, props.token);
  };

  // Checkbox checked value is dependent on the state of
  // The employee's isContacted value
  return (
    <>
      <p>
        {props.employee.firstName} {props.employee.lastName}
      </p>
      <p>{props.employee.position}</p>
      {props.employee.notes ? (
        <>
          <p>{props.employee.notes}</p>
        </>
      ) : (
        <p>No notes</p>
      )}

      <Checkbox
        onChange={toggleChecked}
        checked={props.employee.isContacted}
        id="checkbox"
      />

      <Button
        icon
        onClick={() =>
          props.history.push(
            `/companies/${props.companyId}/employees/${props.employee.id}/edit`
          )
        }
      >
        <Icon name="edit" />
      </Button>
      <Button icon onClick={handleDelete}>
        <Icon name="delete" />
      </Button>
    </>
  );
};

export default EmployeeCard;
