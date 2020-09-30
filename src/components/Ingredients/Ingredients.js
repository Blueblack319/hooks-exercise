import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const handleIngredientAdded = (ingredient) => {
    fetch("https://hooks-exercise.firebaseio.com/ingredients.json", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ingredient),
    })
      .then((res) => res.json())
      .then((ing) =>
        setIngredients((prevIngredients) =>
          prevIngredients.concat({ id: ing.name, ...ingredient })
        )
      );
    // try {
    //   const ingsRes = await fetch(
    //     "https://hooks-exercise.firebaseio.com/ingredients.json",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(ingredient),
    //     }
    //   );
    //   const ings = await ingsRes.json();
    //   setIngredients(
    //     // (prevIngredients) => [
    //     //   ...prevIngredients,
    //     //   { id: Math.random.toString(), ...ingredient },
    //     // ]
    //     (prevIngredients) =>
    //       prevIngredients.concat({
    //         id: ings.name,
    //         ...ingredient,
    //       })
    //   );
    // } catch (err) {
    //   console.log(err);
    // }
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
