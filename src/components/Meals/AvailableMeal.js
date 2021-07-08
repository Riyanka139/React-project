import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeal.module.css';
import MealItem from './MealItem/MealItem';

const AvailableMeal = () => {
  const [meals, setMeals] = useState([]);
  const [isLodding, setIslodding] = useState(false);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      setIslodding(true);

      const response = await fetch('https://react-http-4a6b5-default-rtdb.firebaseio.com/meals.json');

      if(!response.ok){
        throw new Error('something went to wrong.')
      }

      const data = await response.json();

      const loadedMeals = [];

      for(const key in data){
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        });
      }

      setMeals(loadedMeals);
      setIslodding(false);
    }

    fetchMeals().catch(error => {
      setIslodding(false);
      setHttpError(error.message);
    });
  }, []);

  if(isLodding){
    return(
      <section className={classes['meals_lodding']}>
        <p>Lodding ....</p>
    </section>
    );
  }

  if(httpError){
    return(
      <section className={classes['meals_error']}>
        <p>{httpError}</p>
    </section>
    );
  }

  const MealList = meals.map((meal) => (
    <MealItem 
        key={meal.id}
        id={meal.id}
        name = {meal.name}
        description = {meal.description}
        price = {meal.price}
    />
  ));
  return(
    <section className={classes.meals}>
      <Card>
          <ul>
              {MealList}
          </ul>
      </Card>
    </section>
  );
}
export default AvailableMeal;