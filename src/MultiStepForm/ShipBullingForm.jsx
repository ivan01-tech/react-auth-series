import React from "react";
import { useFormContext } from "./FormContext";
import InputForm from "./InputForm";

function ShipBillidngForm() {
  const { data, handleChange, title, pageNumber } = useFormContext();

  const InputProps = [
    {
      label: "Same as ship form",
      id: 10,
      type: "checkbox",
      name: "checkShip",
      pattern: undefined,
    },
    {
      id: 5,
      label: "Name",
      name: "shipName",
      required: true,
      type: "text",
      placeholder: "Myname",
      pattern: `^[A-Za-z1-9]{4,16}$`,
      disabled: data.checkShip,
      error:
        "4 to 24 characters. Must begin with a letter,Letters , numbers, underscore allowed.",
    },
    {
      id: 6,
      label: "Email",
      name: "shipEmail",
      required: true,
      type: "email",
      placeholder: "myname@gmail.com",
      error: "enter a valid email !",
      disabled: data.checkShip,
    },
    {
      id: 7,
      label: "Password",
      name: "shipPassword",
      required: true,
      type: "password",
      placeholder: "your password",
      // pattern: `/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@$%#]).{8,24}$/`,
      pattern: `^[A-Za-z1-9]{4,16}$`,

      error:
        " 8 to 24 characters Must includes upshipcase and lowercase and special characters. Allowed special characters @ # ! $ %",
      disabled: data.checkShip,
    },
    {
      id: 8,
      pattern: data?.shipPassword,
      label: "Confirm Password",
      name: "shipConfirm",
      required: true,
      type: "password",
      placeholder: "your password",
      error: "Password does not match !",
      disabled: data.checkShip,
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

export default ShipBillidngForm;
