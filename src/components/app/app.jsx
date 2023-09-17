import styles from "./app.module.css";
import { useState } from "react";
import { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getDataIngredients } from "../../utils/api";

function App() {
  const [data, setData] = useState([]);
  const fetchIngredients = () => {
    getDataIngredients()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <div className={`custom-scroll ${styles.app}`}>
      <>
        <AppHeader />
        <main className={styles.main}>
          <BurgerIngredients data={data} />
          <BurgerConstructor data={data} />
        </main>
      </>
    </div>
  );
}

export default App;
