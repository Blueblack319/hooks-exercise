import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const handleIngredientAdded = (ingredient) => {
    setIngredients(
      // (prevIngredients) => [
      //   ...prevIngredients,
      //   { id: Math.random.toString(), ...ingredient },
      // ]
      (prevIngredients) =>
        prevIngredients.concat({ id: Math.random().toString(), ...ingredient })
    );
  };

  const handleIngredientRemoved = (id) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ing) => ing.id !== id)
    );
  };

  return (
    <div className="App">
      <IngredientForm addIngredient={handleIngredientAdded} />

      <section>
        <Search />
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={handleIngredientRemoved}
        />
      </section>
    </div>
  );
}

export default Ingredients;
