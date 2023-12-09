import React, { useMemo } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { reset, addBun, addIngredient } from "../../services/burgerDataSlice";
import { openModal } from "../../services/modalDataSlice";
import { getOrderData } from "../../services/orderDataSlice";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import styles from "./burger-constructor.module.css";

const BurgerConstructor = () => {
  const { bun, ingredients } = useSelector((state) => state.burgerData);
  const dispatch = useDispatch();

  const total = useMemo(
    () =>
      ingredients.reduce((acc, p) => acc + p.price, 0) +
      (bun ? bun.price * 2 : 0),
    [bun, ingredients]
  );

  const submitOrder = () => {
    const orderDataArray = [bun._id].concat(ingredients.map((i) => i._id));

    dispatch(getOrderData(orderDataArray));
    dispatch(openModal({ type: "order" }));
    dispatch(reset());
  };

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      item.type === "bun"
        ? dispatch(addBun(item))
        : dispatch(addIngredient(item));
    },
  });

  return (
    <section
      className={`${styles.burgerConstructor} pt-5 pl-4 pr-4`}
      ref={dropTarget}
    >
      {bun && (
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={`${styles.buns} ml-10 mb-4`}
        />
      )}
      <div
        className={`${styles.list} ${
          ingredients.length > 2 ? styles.scroll : ""
        } custom-scroll`}
      >
        {ingredients.map((item, index) => (
          <BurgerIngredient key={item.key} item={item} index={index} />
        ))}
      </div>
      {bun && (
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={`${styles.buns} ml-10 mt-4`}
        />
      )}
      <div className={`${styles.order} pt-10 pr-8`}>
        <div className={`${styles.price} pr-10`}>
          <p className="text text_type_digits-medium pr-2">{total}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={submitOrder}
          disabled={!bun}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
