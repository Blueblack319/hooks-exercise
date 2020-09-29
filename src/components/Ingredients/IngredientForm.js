import React, { useState } from "react";

import Card from "../UI/Card";
import "./IngredientForm.css";

const IngredientForm = (props) => {
  const [inputState, setInputState] = useState({ name: "", amount: "" });
  const submitHandler = (event) => {
    event.preventDefault();
    // ...
  };
  console.log(inputState);

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={inputState.name}
              onChange={(event) => {
                const name = event.target.value;
                setInputState((prevInputState) => ({
                  name,
                  amount: prevInputState.amount,
                }));
              }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={inputState.amount}
              onChange={(event) => {
                const amount = event.target.value;
                setInputState((prevInputState) => ({
                  name: prevInputState.name,
                  amout: amount,
                }));
              }}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default React.memo(IngredientForm);
