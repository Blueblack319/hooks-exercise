import React, { useState, useCallback, useReducer } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";
import ErrorModal from "../UI/ErrorModal";

const BASE_URL = "https://hooks-exercise.firebaseio.com/";

const ingredientsReducer = (currentIngredients, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return currentIngredients.concat(action.ingredient);
    case "REMOVE":
      return currentIngredients.filter((ing) => ing.id !== action.id);
  }
};

function Ingredients() {
  // const [ingredients, setIngredients] = useState([]);
  const [ingredients, ingredientsDispatch] = useReducer(ingredientsReducer, []);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const handleIngredientAdded = (ingredient) => {
    setIsLoading(true);
    fetch(`${BASE_URL}ingredients.json`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ingredient),
    })
      .then((res) => res.json())
      .then((ing) => {
        ingredientsDispatch({
          type: "ADD",
          ingredient: { id: ing.name, ...ingredient },
        });
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(err);
        setIsLoading(false);
      });
  };

  const handleIngredientsLoaded = useCallback((loadedIngredients) => {
    ingredientsDispatch({ type: "SET", ingredients: loadedIngredients });
  }, []);

  const handleIngredientRemoved = (id) => {
    setIsLoading(true);
    fetch(`${BASE_URL}ingredients/${id}.json`, {
      method: "DELETE",
    })
      .then((res) => {
        ingredientsDispatch({ type: "REMOVE", id });
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(err);
        setIsLoading(false);
      });
  };

  const handleErrorClosed = () => {
    setIsError(null);
  };

  return (
    <div className="App">
      {isError && (
        <ErrorModal onClose={handleErrorClosed}>
          Something went wrong!
        </ErrorModal>
      )}
      <IngredientForm
        onIngredientAdded={handleIngredientAdded}
        isLoading={isLoading}
      />
      <section>
        <Search onIngredientsLoaded={handleIngredientsLoaded} />
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={handleIngredientRemoved}
        />
      </section>
    </div>
  );
}

export default Ingredients;
