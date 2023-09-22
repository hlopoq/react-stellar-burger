import { useEffect } from "react";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import style from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

function Modal({ children, closePopup }) {
  useEffect(() => {
    function closePopupEsc(evt) {
      if (evt.key === "Escape") {
        closePopup();
      }
    }
    document.addEventListener("keydown", closePopupEsc);
    return () => {
      document.removeEventListener("keydown", closePopupEsc);
    };
  }, [closePopup]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay closePopup={closePopup} />
      <div className={style.modal}>
        <button onClick={closePopup} className={style.closeButton}>
          <CloseIcon />
        </button>
        {children}
      </div>
    </>,
    document.querySelector("#modals")
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  closePopup: PropTypes.func.isRequired,
};

export default Modal;
