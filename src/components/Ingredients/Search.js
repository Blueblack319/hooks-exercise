import React, { useEffect, useState } from "react";

import Card from "../UI/Card";
import "./Search.css";

const BASE_URL = "https://hooks-exercise.firebaseio.com/";

const Search = (props) => {
  const { onIngredientsLoaded } = props;
  const [enteredFilter, setEnteredFilter] = useState("");
  useEffect(() => {
    const query =
      enteredFilter.length === 0
        ? ""
        : `?orderBy="title"&equalTo="${enteredFilter}"`;
    fetch(`${BASE_URL}ingredients.json${query}`)
      .then((res) => res.json())
      .then((resData) => {
        const loadedIngredients = [];
        for (let key in resData) {
          loadedIngredients.push({
            id: key,
            title: resData[key].title,
            amount: resData[key].amount,
          });
        }
        onIngredientsLoaded(loadedIngredients);
      });
  }, [enteredFilter, onIngredientsLoaded]);
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
};

export default React.memo(Search);
