import React, { useState, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";
import ErrorModal from "../UI/ErrorModal";

const BASE_URL = "https://hooks-exercise.firebaseio.com/";

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
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
        setIngredients((prevIngredients) =>
          prevIngredients.concat({ id: ing.name, ...ingredient })
        );
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(err);
        setIsLoading(false);
      });
  };

  const handleIngredientsLoaded = useCallback((loadedIngredients) => {
    setIngredients(loadedIngredients); // setIngredients is specialfuction created by useState. So you can ommit dependency.
  }, []);

  const handleIngredientRemoved = (id) => {
    setIsLoading(true);
    fetch(`${BASE_URL}ingredients/${id}.json`, {
      method: "DELETE",
    })
      .then((res) => {
        setIngredients((prevIngredients) =>
          prevIngredients.filter((ing) => ing.id !== id)
        );
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
