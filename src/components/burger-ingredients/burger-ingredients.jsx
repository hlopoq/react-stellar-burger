import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-ingredients.module.css";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import IngredientItem from "../ingredient/ingredient";
import { ingredientPropType } from "../../utils/prop-types";

export default function BurgerIngredients({ data }) {
  const [modalActive, setModalActive] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [activeCategory, setActiveCategory] = useState("bun");
  const scrollContainerRef = useRef(null);
  const tabsRef = {
    bun: useRef(null),
    sauce: useRef(null),
    main: useRef(null),
  };

  const handleOpen = (ingredient) => {
    setSelectedIngredient(ingredient);
    setModalActive(true);
  };

  const handleClose = () => {
    setSelectedIngredient(null);
    setModalActive(false);
  };

  const categories = [
    { key: "bun", label: "Булки" },
    { key: "sauce", label: "Соусы" },
    { key: "main", label: "Начинки" },
  ];

  const filterIngredientsByCategory = (category) => {
    return data.filter((ingredient) => ingredient.type === category);
  };

  const handleTabClick = (category) => {
    setActiveCategory(category);
    tabsRef[category].current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollY = scrollContainerRef.current.scrollTop;
      const containerTop =
        scrollContainerRef.current.getBoundingClientRect().top;

      for (const category of categories) {
        if (tabsRef[category.key].current) {
          const tabTop =
            tabsRef[category.key].current.getBoundingClientRect().top -
            containerTop;

          if (scrollY >= tabTop) {
            setActiveCategory(category.key);
          }
        }
      }
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <section className={style.burgerIngredients}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={style.tab}>
        {categories.map((category) => (
          <Tab
            key={category.key}
            value={category.key}
            active={activeCategory === category.key}
            onClick={() => handleTabClick(category.key)}
          >
            {category.label}
          </Tab>
        ))}
      </div>
      <div
        ref={scrollContainerRef}
        className={`custom-scroll ${style.scrollIngredients}`}
      >
        {categories.map((category) => (
          <div key={category.key} ref={tabsRef[category.key]}>
            <h2 className="text text_type_main-medium pt-5 pb-5">
              {category.label}
            </h2>
            <ul className={`${style.list} pt-5 pb-5`}>
              {filterIngredientsByCategory(category.key).map((ingredient) => (
                <IngredientItem
                  key={ingredient._id}
                  ingredients={ingredient}
                  current={() => handleOpen(ingredient)}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
      {modalActive && selectedIngredient && (
        <Modal closePopup={handleClose}>
          <IngredientDetails myIngredient={selectedIngredient} />
        </Modal>
      )}
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
};
