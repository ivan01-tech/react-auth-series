import React, { createContext, useContext, useEffect, useState } from "react";

const FormContext = createContext();

export const useFormContext = function () {
  return useContext(FormContext);
};

function FormContexProvider({ children }) {
  const [pageNumber, setPageNumber] = useState(0)
  const title = ["Personal Informations", "Ship Personal information", "Opt In"]
  const [data, setData] = useState({
    shipName: "",
    shipEmail: "",
    shipPassword: "",
    shipConfirm: "",
    perName: "",
    perEmail: "",
    perPassword: "",
    perConfirm: "",
    checkShip: false,
    checkOpt: false,
  });

  useEffect(function () {
    if (data.checkShip) {
      setData(prev => ({
        ...prev,
        shipName: prev.perName,
        shipEmail: prev.perEmail,
        shipPassword: prev.perPassword,
        shipConfirm: prev.perConfirm,
      }))
    } else {
      setData(prev => ({
        ...prev,
        shipName: "",
        shipEmail: "",
        shipPassword: "",
        shipConfirm: "",
      }))
    }
  }, [data.checkShip])

  const handleFormValue = function (prefixe, setPage) {
    const { checkOpt, checkShip, ...requiredInput } = data
    const canSave = Object.keys(requiredInput)
      .filter(a => a.startsWith(prefixe))
      .map(function (a) {
        return data[a]
      })
      .every(Boolean)

    if (!canSave) {
      console.log("can save the form", canSave)
      return
    }

    setPage()
  }


  const handleChange = function (e) {

    const typeVal =
      e.target.type === "checkbox" ? !e.target.checked : e.target.value;
    setData((prev) => ({ ...prev, [e.target.name]: typeVal }));
    console.log(data[e.target.name])
  };

  const values = { data, setData, handleFormValue, pageNumber, setPageNumber, handleChange, title };
  return <FormContext.Provider value={values}>{children}</FormContext.Provider>;
}

export default FormContexProvider;
