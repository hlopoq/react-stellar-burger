import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useDrag, useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import {
  deleteIngredient,
  moveIngredients,
} from "../../services/burgerDataSlice";
import { ingredientPropType } from "../../utils/prop-types";
import styles from "./burger-ingredient.module.css";

const BurgerIngredient = ({ item, index }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [, dropRef] = useDrop({
    accept: "item",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(moveIngredients({ dragIndex, hoverIndex }));
      item.index = hoverIndex;
    },
  });

  const [{ opacity }, dragRef, dragPreviewRef] = useDrag({
    type: "item",
    item: () => {
      return { index };
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  });

  dragRef(dropRef(ref));
  return (
    <div
      className={styles.item}
      index={index}
      draggable
      style={{ opacity }}
      ref={dragPreviewRef}
    >
      <div ref={ref}>
        <DragIcon type="primary" />
      </div>

      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => {
          dispatch(deleteIngredient(item.key));
        }}
      />
    </div>
  );
};

BurgerIngredient.propTypes = {
  item: ingredientPropType.isRequired,
  index: PropTypes.number,
};

export default BurgerIngredient;
