import { useSelector } from "react-redux";
import style from "./ingredient-details.module.css";
import { ingredientPropType } from "../../utils/prop-types";

export default function IngredientDetails() {
  const { details } = useSelector((state) => state.modalData);

  return (
    <div className={style.ingredientDetails}>
      <h2 className={`${style.title} text text_type_main-large pb-5`}>
        Детали ингредиента
      </h2>
      <img src={details.image_large} alt={details.name} />
      <span className="text text_type_main-medium pt-4">{details.name}</span>
      <ul className={style.list}>
        <li className={style.li}>
          <p className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {details.calories}
          </p>
        </li>
        <li className={style.li}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {details.proteins}
          </p>
        </li>
        <li className={style.li}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {details.fat}
          </p>
        </li>
        <li className={style.li}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {details.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}

IngredientDetails.propTypes = {
  details: ingredientPropType,
};
