import React from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = (props) => {
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" />
        </div>
      </Card>
    </section>
  );
};

export default React.memo(Search);
