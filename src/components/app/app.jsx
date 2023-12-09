import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useSelector, useDispatch } from "react-redux";
import { getIngredients } from "../../services/ingredientsDataSlice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const { ingredients } = useSelector((state) => state.ingredientsData);
  const modal = useSelector((state) => state.modalData);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return (
    <div className={`custom-scroll ${styles.app}`}>
      <AppHeader />
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          {ingredients.length !== 0 && (
            <>
              <BurgerIngredients />
              <BurgerConstructor />
            </>
          )}
        </DndProvider>
      </main>
      {modal.active && (
        <Modal>
          {modal.type === "order" && <OrderDetails />}
          {modal.type === "details" && <IngredientDetails />}
        </Modal>
      )}
    </div>
  );
}

export default App;
