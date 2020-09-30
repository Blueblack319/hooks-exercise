import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const handleAddIngredient = (ingredient) => {
    setIngredients((prevIngredients) =>
      prevIngredients.concat({ id: Math.random.toString(), ...ingredient })
    );
  };

  return (
    <div className="App">
      <IngredientForm addIngredient={handleAddIngredient} />

      <section>
        <Search />
        <IngredientList ingredients={ingredients} onRemoveItem={() => {}} />
      </section>
    </div>
  );
}

export default Ingredients;
