import React, { useCallback, useReducer, useEffect, useMemo } from "react";

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
    default:
      return new Error("Should not be reached!");
  }
};

const httpReducer = (currentHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: null };
    case "RESPONSE":
      return { ...currentHttpState, loading: false };
    case "ERROR":
      return { loading: false, error: action.errorMessage };
    default:
      return new Error("Should not be reached!");
  }
};

const Ingredients = () => {
  // const [ingredients, setIngredients] = useState([]);
  const [ingredientsState, ingredientsDispatch] = useReducer(
    ingredientsReducer,
    []
  );
  const [httpState, httpDispatch] = useReducer(httpReducer, {
    loading: false,
    error: null,
  });

  useEffect(() => {
    console.log("RENDERING INGREDIENTS", ingredientsState);
  }, [ingredientsState]);

  const handleIngredientAdded = useCallback((ingredient) => {
    httpDispatch({ type: "SEND" });
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
        httpDispatch({ type: "RESPONSE" });
      })
      .catch((err) => {
        httpDispatch({ type: "ERROR", errorMessage: err.message });
      });
  }, []);

  const handleIngredientsLoaded = useCallback((loadedIngredients) => {
    ingredientsDispatch({ type: "SET", ingredients: loadedIngredients });
  }, []);

  const handleIngredientRemoved = useCallback((id) => {
    httpDispatch({ type: "SEND" });
    fetch(`${BASE_URL}ingredients/${id}.json`, {
      method: "DELETE",
    })
      .then((res) => {
        ingredientsDispatch({ type: "REMOVE", id });
        httpDispatch({ type: "RESPONSE" });
      })
      .catch((err) => {
        console.log(err);
        httpDispatch({ type: "ERROR", errorMessage: err.message });
      });
  }, []);

  const handleErrorClosed = () => {
    httpDispatch({ type: "ERROR", error: null });
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
      {httpState.error && (
        <ErrorModal onClose={handleErrorClosed}>
          Something went wrong! <br />
          {httpState.error}
        </ErrorModal>
      )}
      <IngredientForm
        onIngredientAdded={handleIngredientAdded}
        isLoading={httpState.loading}
      />
      <section>
        <Search onIngredientsLoaded={handleIngredientsLoaded} />
        {ingredientList}
      </section>
    </div>
  );
};

export default Ingredients;
