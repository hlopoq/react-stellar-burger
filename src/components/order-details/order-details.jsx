import style from "./order-details.module.css";
import checkmarkIcon from "../../images/img.png";
import { useSelector } from "react-redux";

export default function OrderDetails() {
  const { order, loading } = useSelector((state) => state.orderData);

  return (
    <ul className={style.orderDetails}>
      <li className={style.detail}>
        <p className={`${style.number} text text_type_digits-large pb-5`}>
          {loading ? "..." : order.order.number}
        </p>
        <p className="text text_type_main-medium pt-2">Идентификатор заказа</p>
      </li>
      <li className={style.detail}>
        <img
          className={style.checkmarkIcon}
          src={checkmarkIcon}
          alt="Иконка с галочкой"
        />
      </li>
      <li className={style.detail}>
        <p className="text text_type_main-default">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive pt-2">
          Дождитесь готовности на орбитальной станции
        </p>
      </li>
    </ul>
  );
}
