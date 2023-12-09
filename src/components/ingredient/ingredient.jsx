import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../services/modalDataSlice";
import { useDrag } from "react-dnd";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./ingredient.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";

export default function IngredientItem({ data }) {
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(0);

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: data,
  });

  const { bun, ingredients } = useSelector((state) => state.burgerData);

  useEffect(() => {
    let count = 0;
    if (bun !== null || ingredients.length) {
      if (data.type === "bun") {
        count = bun?._id === data._id ? 1 : 0;
      } else {
        count = ingredients.filter((item) => item._id === data._id).length;
      }
    }
    setCounter(count);
  }, [bun, ingredients, data._id, data.type]);

  const handleItemClick = () => {
    dispatch(openModal({ type: "details", details: data }));
  };

  return (
    <div
      ref={dragRef}
      className={style.ingredientItem}
      onClick={handleItemClick}
      draggable
    >
      <Counter
        className={style.counter}
        count={counter}
        size="default"
        extraClass="m-1"
      />
      <img src={data.image} alt={`Изображение ${data.name}`} />
      <div className={`pb-2 pt-2 ${style.price}`}>
        <p className="text text_type_digits-default pr-2">{data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default ${style.title}`}>
        {data.name}
      </p>
    </div>
  );
}

IngredientItem.propTypes = {
  data: ingredientPropType.isRequired,
};
