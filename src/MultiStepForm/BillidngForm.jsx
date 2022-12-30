import React, { useState } from "react";
import { useFormContext } from "./FormContext";
import InputForm from "./InputForm";

function BillidngForm() {
  const { data, handleChange, title, pageNumber } = useFormContext();

  const InputProps = [
    {
      id: 1,
      label: "Name",
      name: "perName",
      required: true,
      type: "text",
      placeholder: "Myname",
      pattern: `^[A-Za-z1-9]{4,16}$`,
      // pattern: `/^[A-Za-z][A-Za-z0-9-_]{3,24}$/`,
      error:
        "4 to 24 characters. Must begin with a letter,Letters , numbers, underscore allowed.",
    },
    {
      id: 2,
      label: "Email",
      name: "perEmail",
      required: true,
      type: "email",
      placeholder: "myname@gmail.com",
      error: "enter a valid email !",
    },
    {
      id: 3,
      label: "Password",
      name: "perPassword",
      required: true,
      type: "password",
      placeholder: "your password",
      // pattern: `/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@$%#]).{8,24}$/`,
      pattern: `^[A-Za-z1-9]{4,16}$`,
      error:
        " 8 to 24 characters Must includes uppercase and lowercase and special characters. Allowed special characters @ # ! $ %",
    },
    {
      id: 4,
      pattern: data?.perPassword,
      label: "Confirm Password",
      name: "perConfirm",
      required: true,
      type: "password",
      placeholder: "your password",
      error: "Password does not match !",
    },
  ];

  return (
    <>
      <h5>{title[pageNumber]}</h5>
      {InputProps.map((attr) => (
        <InputForm
          onChange={handleChange}
          key={attr.id.toString()}
          {...attr}
          value={data[attr.name]}
        />
      ))}
    </>
  );
}

export default BillidngForm;
