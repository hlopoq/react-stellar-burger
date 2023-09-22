import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={`${styles.li} pb-4 pt-4 pl-5 pr-5`}>
            <a href="#" className={styles.link}>
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default">Конструктор</p>
            </a>
          </li>
          <li className={`${styles.li} pb-4 pt-4 pl-5 pr-5`}>
            <a href="#" className={styles.link}>
              <ListIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive">
                Лента заказов
              </p>
            </a>
          </li>
          <li className={`${styles.li} pb-4 pt-4 pl-5 pr-5`}>
            <a href="#" className={styles.link}>
              <ProfileIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive">
                Личный кабинет
              </p>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
