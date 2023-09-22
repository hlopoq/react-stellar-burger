import PropTypes from "prop-types";
import style from "./modal-overlay.module.css";

export default function ModalOverlay({ closePopup }) {
  const handleClick = () => {
    if (typeof closePopup === "function") {
      closePopup();
    }
  };

  return <div onClick={handleClick} className={style.overlay}></div>;
}

ModalOverlay.propTypes = {
  closePopup: PropTypes.func.isRequired,
};
