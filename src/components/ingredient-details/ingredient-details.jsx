import React from "react";
import PropTypes from "prop-types";
import style from "./ingredient-details.module.css";

export default function IngredientDetails({ myIngredient }) {
  const { image_large, name, calories, proteins, fat, carbohydrates } =
    myIngredient;

  return (
    <div className={style.ingredientDetails}>
      <h2 className={`${style.title} text text_type_main-large pb-5`}>
        Детали ингредиента
      </h2>
      <img src={image_large} alt={name} />
      <span className="text text_type_main-medium pt-4">{name}</span>
      <ul className={style.list}>
        <li className={style.li}>
          <p className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {calories}
          </p>
        </li>
        <li className={style.li}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {proteins}
          </p>
        </li>
        <li className={style.li}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {fat}
          </p>
        </li>
        <li className={style.li}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}

IngredientDetails.propTypes = {
  myIngredient: PropTypes.shape({
    image_large: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
  }).isRequired,
};
