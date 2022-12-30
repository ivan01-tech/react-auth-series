import React from "react";
import { useFormContext } from "./FormContext";
import InputForm from "./InputForm";

function OptIn() {
  const { data, handleChange, title, pageNumber } = useFormContext();

  return (
    <div>
      <h4>{title[pageNumber]}</h4>
      <InputForm
        type="checkbox"
        label={
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere facilis animi sed. Eos omnis, molestiae, consequatu "
        }
        id={10}
        name="checkOpt"
        onChange={handleChange}
      />
    </div>
  );
}

export default OptIn;
