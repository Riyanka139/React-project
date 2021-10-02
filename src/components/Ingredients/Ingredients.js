import React, { useCallback, useEffect, useState } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch("https://hook-e4571-default-rtdb.firebaseio.com/ingredient.json")
      .then((response) => response.json())
      .then((responseData) => {
        if (!responseData.error) {
          let loadedData = [];
          for (const key in responseData) {
            loadedData.push({
              id: key,
              title: responseData[key].title,
              amount: responseData[key].amount,
            });
          }
          setIngredients(loadedData);
        }
      });
  }, []);

  const addIngredientHandler = (ingredient) => {
    fetch("https://hook-e4571-default-rtdb.firebaseio.com/ingredient.json", {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setIngredients((prevState) => [
          ...prevState,
          { id: responseData.name, ...ingredient },
        ]);
      });
  };

  const filterHandler = useCallback((loadData) => {
    setIngredients(loadData);
  }, []);

  const removeIngredientHandler = (id) => {
    setIngredients((prevState) => prevState.filter((prev) => prev.id !== id));
  };

  return (
    <div className="App">
      <IngredientForm onAdd={addIngredientHandler} />

      <section>
        <Search onloadIngredients={filterHandler} />
        {console.log(ingredients.length, ingredients)}
        {/* Need to add list here! */}

        <IngredientList
          ingredients={ingredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
