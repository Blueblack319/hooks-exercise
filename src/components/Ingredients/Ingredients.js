import React, { useCallback, useReducer, useEffect, useMemo } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";
import ErrorModal from "../UI/ErrorModal";
import useHttp from "../../hooks/http";

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
    default:
      return new Error("Should not be reached!");
  }
};

const Ingredients = () => {
  const { isLoading, error, resData, sendRequest } = useHttp();
  const [ingredientsState, ingredientsDispatch] = useReducer(
    ingredientsReducer,
    []
  );

  useEffect(() => {
    console.log("RENDERING INGREDIENTS", ingredientsState);
  }, [ingredientsState]);

  const handleIngredientAdded = useCallback((ingredient) => {
    //   httpDispatch({ type: "SEND" });
    //   fetch(`${BASE_URL}ingredients.json`, {
    //     method: "post",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(ingredient),
    //   })
    //     .then((res) => res.json())
    //     .then((ing) => {
    //       ingredientsDispatch({
    //         type: "ADD",
    //         ingredient: { id: ing.name, ...ingredient },
    //       });
    //       httpDispatch({ type: "RESPONSE" });
    //     })
    //     .catch((err) => {
    //       httpDispatch({ type: "ERROR", errorMessage: err.message });
    //     });
    // }, []);
    // const handleIngredientsLoaded = useCallback((loadedIngredients) => {
    //   ingredientsDispatch({ type: "SET", ingredients: loadedIngredients });
  }, []);

  const handleIngredientRemoved = useCallback(
    (id) => {
      sendRequest(`${BASE_URL}ingredients/${id}.json`, "DELETE");
    },
    [sendRequest]
  );

  const handleErrorClosed = () => {
    // httpDispatch({ type: "ERROR", error: null });
  };

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={ingredientsState}
        onRemoveItem={handleIngredientRemoved}
      />
    );
  }, [ingredientsState, handleIngredientRemoved]);

  return (
    <div className="App">
      {error && (
        <ErrorModal onClose={handleErrorClosed}>
          Something went wrong! <br />
          {error}
        </ErrorModal>
      )}
      <IngredientForm
        onIngredientAdded={handleIngredientAdded}
        isLoading={isLoading}
      />
      <section>
        <Search onIngredientsLoaded={handleIngredientsLoaded} />
        {ingredientList}
      </section>
    </div>
  );
};

export default Ingredients;
