import React from "react";
import BillidngForm from "./BillidngForm";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import ShipBillidngForm from "./ShipBullingForm";
import FormContexProvider, { useFormContext } from "./FormContext";
import OptIn from "./OptIn";
function FormStep() {
  const { pageNumber, setPageNumber, title, handleFormValue } =
    useFormContext();

  const incrementPAgeNumber = function () {
    setPageNumber((prev) => prev + 1);
  };

  const decrementPAgeNumber = function () {
    setPageNumber((prev) => prev - 1);
  };

  return (
    <section className="form">
      <h2>Registration</h2>
      <form>
        {pageNumber === 0 && <BillidngForm />}

        {pageNumber === 1 && <ShipBillidngForm />}

        {pageNumber === 2 && <OptIn />}
      </form>
      <footer>
        <div className="button">
          {pageNumber > 0 && (
            <button
              type="button"
              onClick={() => handleFormValue("per", decrementPAgeNumber)}
            >
              <HiArrowNarrowLeft /> Prev
            </button>
          )}

          {pageNumber < title.length - 1 && pageNumber >= 0 && (
            <button
              onClick={() => handleFormValue("ship", incrementPAgeNumber)}
              type="button"
            >
              Next
              <HiArrowNarrowRight />
            </button>
          )}

          {pageNumber === title.length - 1 && (
            <button type="submit">Submit</button>
          )}
        </div>
      </footer>
    </section>
    // </FormContexProvider>
  );
}

export default FormStep;
