import { useState, useMemo } from "react";
import style from "./burger-constructor.module.css";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

export default function BurgerConstructor({ data }) {
  const [modalActive, setModalActive] = useState(false);

  const handleOpen = () => {
    setModalActive(true);
  };

  const handleClose = () => {
    setModalActive(false);
  };

  const bun = data.find((item) => item.type === "bun");
  const nonBunIngredients = data.filter((item) => item.type !== "bun");

  const price = useMemo(() => {
    return data.reduce((total, item) => total + item.price, 0);
  }, [data]);

  return (
    <section className={`${style.burgerConstructor} pt-5 pl-4 pr-4`}>
      {data.length > 0 && (
        <>
          <div className={`${style.buns} pb-5 pr-6`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
          <div className={`custom-scroll ${style.scroll}`}>
            {data.length > 0 ? (
              <ul className={style.list}>
                {nonBunIngredients.map((item) => (
                  <li className={style.li} key={item._id}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                      isLocked={false}
                      text={item.name}
                      price={item.price}
                      thumbnail={item.image}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p>Не выбраны ингредиенты.</p>
            )}
          </div>
          <div className={`${style.buns} pb-5 pr-7 pt-5`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        </>
      )}

      <div className={`pt-10 pr-8 ${style.order}`}>
        <div className={style.price}>
          <p className="text text_type_digits-medium">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOpen}
        >
          Оформить заказ
        </Button>
        {modalActive && (
          <Modal closePopup={handleClose}>
            <OrderDetails />
          </Modal>
        )}
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
