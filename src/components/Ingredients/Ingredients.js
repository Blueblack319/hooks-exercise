import React, { useEffect, useState, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

const BASE_URL = "https://hooks-exercise.firebaseio.com/";

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    console.log("RENDERING INGREDIENTS", ingredients);
  }, [ingredients]);

  const handleIngredientAdded = (ingredient) => {
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
      });
  };

  const handleIngredientsLoaded = useCallback((loadedIngredients) => {
    setIngredients(loadedIngredients); // setIngredients is specialfuction created by useState. So you can ommit dependency.
  }, []);

  const handleIngredientRemoved = (id) => {
    fetch(`${BASE_URL}ingredients/${id}.json`, {
      method: "DELETE",
    }).then((res) => {
      setIngredients((prevIngredients) =>
        prevIngredients.filter((ing) => ing.id !== id)
      );
    });
  };

  return (
    <div className="App">
      <IngredientForm addIngredient={handleIngredientAdded} />

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
