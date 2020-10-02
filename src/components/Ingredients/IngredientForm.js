import React, { useState } from "react";

import Card from "../UI/Card";
import "./IngredientForm.css";
import LoadingIndicator from "../UI/LoadingIndicator";

const IngredientForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const handleFormSubmitted = (event) => {
    event.preventDefault();
    props.onIngredientAdded({ title: enteredTitle, amount: enteredAmount });
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={handleFormSubmitted}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={enteredTitle}
              onChange={(event) => setEnteredTitle(event.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={enteredAmount}
              onChange={(event) => setEnteredAmount(event.target.value)}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.isLoading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
};

export default React.memo(IngredientForm);
