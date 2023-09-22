import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-ingredients.module.css";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import IngredientItem from "../ingredient/ingredient";
import { ingredientPropType } from "../../utils/prop-types";

export default function BurgerIngredients({ data }) {
  const [modalActive, setModalActive] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("bun");
  const [selectedIngredient, setSelectedIngredient] = useState(null);

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

  const scrollToCategory = (category) => {
    const element = document.querySelector(`#${category}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={style.burgerIngredients}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={style.tab}>
        {categories.map((category) => (
          <Tab
            key={category.key}
            value={category.key}
            active={currentCategory === category.key}
            onClick={() => {
              setCurrentCategory(category.key);
              scrollToCategory(category.key);
            }}
          >
            {category.label}
          </Tab>
        ))}
      </div>
      <div className={`custom-scroll ${style.scrollIngredients}`}>
        {categories.map((category) => (
          <div key={category.key}>
            <h2
              id={category.key}
              className="text text_type_main-medium pt-5 pb-5"
            >
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
