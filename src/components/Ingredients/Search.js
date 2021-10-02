import React, { useEffect, useState } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const { onloadIngredients } = props;
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const query =
      filter.length === 0 ? "" : `?orderBy="title"&equalTo="${filter}"`;
    fetch(
      "https://hook-e4571-default-rtdb.firebaseio.com/ingredient.json" + query
    )
      .then((response) => response.json())
      .then((responseData) => {
        if(responseData.error) return;
        let loadedData = [];
        for (const key in responseData) {
          loadedData.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount,
          });
        }
        onloadIngredients(loadedData);
      });
  }, [filter, onloadIngredients]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
