import { Fragment } from "react";

import MealTitle from './MealTitle';
import AvailableMeal from "./AvailableMeal";

const Meal = () => {
    return(
        <Fragment>
            <MealTitle/>
            <AvailableMeal/>
        </Fragment>
    );
}

export default Meal;