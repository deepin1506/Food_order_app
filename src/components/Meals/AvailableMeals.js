import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [isloading, setisloading] = useState(true);
  const [meals, setmeals] = useState([]);
  const [httperror, sethttperror] = useState();
  useEffect(() => {
    const fetchmeals = async () => {
      const response = await fetch(
        "https://food-order-app-e9704-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong with the applicaition");
      }
      const responseData = await response.json();

      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setmeals(loadedMeals);
      setisloading(false);
    };

    fetchmeals().catch((error) => {
      setisloading(false);
      sethttperror(error.message);
    });
  }, []);
  if (isloading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading.....</p>
      </section>
    );
  }
  if (httperror) {
    return (
      <section className={classes.MealsError}>
        <p> {httperror} </p>
      </section>
    );
  }
  const MealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{MealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
