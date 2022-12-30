import React, { useState } from "react";

function InputForm(props) {
  const [focus, setFocus] = useState(false);
  const { label, error, ...attrs } = props;

  attrs.checked && console.log(attrs.checked);

  return (
    <div className="inputForm">
      {attrs.type !== "checkbox" && <label htmlFor={attrs.id}>{label}:</label>}
      <input
        {...attrs}
        onFocus={() => setFocus(false)}
        focused={focus.toString()}
        onBlur={() => setFocus(true)}
      />
      {attrs.type === "checkbox" && <label htmlFor={attrs.id}>{label}</label>}
      {<span className="err">{error}</span>}
    </div>
  );
}

export default InputForm;
