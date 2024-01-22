import React, { useState, useEffect, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-ingredients.module.css";
import IngredientItem from "../ingredient/ingredient";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";

export default function BurgerIngredients() {
  const { ingredients } = useSelector((state) => state.ingredientsData);
  const [current, setCurrent] = useState("buns");
  const [refBun, bunInView] = useInView({ threshold: 0 });
  const [refSauce, sauceInView] = useInView({ threshold: 0 });
  const [refMain, mainInView] = useInView({ threshold: 0 });

  useEffect(() => {
    if (bunInView) {
      setCurrent("buns");
    } else if (sauceInView) {
      setCurrent("sauces");
    } else if (mainInView) {
      setCurrent("mains");
    }
  }, [bunInView, sauceInView, mainInView]);

  const bunsArray = ingredients.filter((item) => item.type === "bun");
  const saucesArray = ingredients.filter((item) => item.type === "sauce");
  const mainsArray = ingredients.filter((item) => item.type === "main");

  function handleTabClick(value) {
    const category = document.querySelector(`#${value}`);
    setCurrent(value);
    category.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className={`${style.burgerIngredients}`}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={style.tab}>
        <Tab
          value="buns"
          active={current === "buns"}
          onClick={() => handleTabClick("buns", refBun)}
        >
          Булки
        </Tab>
        <Tab
          value="sauces"
          active={current === "sauces"}
          onClick={() => handleTabClick("sauces", refSauce)}
        >
          Соусы
        </Tab>
        <Tab
          value="mains"
          active={current === "mains"}
          onClick={() => handleTabClick("mains", refMain)}
        >
          Начинки
        </Tab>
      </div>
      <div className={`${style.scrollIngredients} custom-scroll`}>
        <h2 id="buns" className="text text_type_main-medium pt-5 pb-5">
          Булки
        </h2>
        <div className={`${style.list} pt-5 pb-5`} ref={refBun}>
          {bunsArray.map((item) => (
            <IngredientItem data={item} key={item._id} />
          ))}
        </div>
        <h2 id="sauces" className="text text_type_main-medium pt-5 pb-5">
          Соусы
        </h2>
        <div className={`${style.list} pt-5 pb-5`} ref={refSauce}>
          {saucesArray.map((item) => (
            <IngredientItem data={item} key={item._id} />
          ))}
        </div>
        <h2 id="mains" className="text text_type_main-medium pt-5 pb-5">
          Начинки
        </h2>
        <div className={`${style.list} pt-5 pb-5`} ref={refMain}>
          {mainsArray.map((item) => (
            <IngredientItem data={item} key={item._id} />
          ))}
        </div>
      </div>
    </section>
  );
}
