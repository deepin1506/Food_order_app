import classes from "./MealsSummary.module.css";
const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Mesmerising Food You Can Ever Crave For</h2>
      <p>
        The dish you crave is the dish you got in your cart. Just add it to your
        cart and get it delivered to your address in minutes.
      </p>
      <p>
        All the meals you get are highly recommended in the area and are made by
        the most skilled in the area
      </p>
    </section>
  );
};

export default MealsSummary;
